using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;
using SchoolSite.Server.Mappers;
using SchoolSite.Server.Repositories.Implementation;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryImageController : ControllerBase
    {
        private readonly IGalleryImageRepository _galleryImageRepository;
        private readonly IGalleryRepository _galleryRepository;
        private readonly IWebHostEnvironment _env;

        public GalleryImageController(IGalleryImageRepository galleryImageRepository, IGalleryRepository galleryRepository, IWebHostEnvironment env)
        {
            _galleryImageRepository = galleryImageRepository;
            _galleryRepository = galleryRepository;
            _env = env;
        }

        [HttpGet("{galleryId}/images")]
        public async Task<ActionResult<IEnumerable<GalleryImageDto>>> GetImagesByGalleryIdAsync(int galleryId)
        {
            var allGalleryImages = await _galleryImageRepository.GetImagesByGalleryIdAsync(galleryId);
            return Ok(allGalleryImages);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<GalleryImageDto>> GetGalleryImageById(int id)
        {
            var galleryImage = await _galleryImageRepository.GetGalleryImageByIdAsync(id);

            if (galleryImage == null)
            {
                return NotFound();
            }

            return Ok(galleryImage);
        }


        [HttpPost]
        public async Task<ActionResult<GalleryImageDto>> CreateGalleryImage(GalleryImageDto galleryImageDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the Gallery exists
            var galleryExists = await _galleryRepository.GetGalleryByIdAsync(galleryImageDto.GalleryId);

            if(galleryExists == null)
            {
                return NotFound($"Gallery with ID {galleryImageDto.GalleryId} not found.");
            }

            await _galleryImageRepository.AddGalleryImageAsync(galleryImageDto);
           
            return CreatedAtAction(nameof(GetGalleryImageById), new { id = galleryImageDto.Id }, galleryImageDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGalleryImageById(int id)
        {
            var galleryImage = await _galleryImageRepository.GetGalleryImageByIdAsync(id);
            if(galleryImage == null)
            {
                return NotFound("Gallery Image not found.");
            }

            var imagePath = galleryImage.ImagePath;
            if(!string.IsNullOrEmpty(imagePath))
            {
                var imageFullPath = Path.Combine(_env.ContentRootPath, imagePath);
                imageFullPath = imageFullPath.Replace("\\", "/");

                try
                {
                    System.Threading.Thread.Sleep(100);
                    if (System.IO.File.Exists(imageFullPath))
                    {
                        System.IO.File.Delete(imageFullPath);
                    }
                }
                catch (IOException ex)
                {
                    Console.WriteLine($"Error deleting file: {ex.Message}");
                }
                
            }

            await _galleryImageRepository.DeleteGalleryImageAsync(id);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GalleryImageDto>> UpdateGalleryImageAsync(int id, GalleryImageDto galleryImageDto)
        {
            if (id != galleryImageDto.Id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            await _galleryImageRepository.UpdateGalleryImageAsync(galleryImageDto);

            return CreatedAtAction(nameof(GetGalleryImageById), new { id = galleryImageDto.Id }, galleryImageDto);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadMultipleImages(IFormFileCollection files, [FromForm] int galleryId)
        {
            // Check if the Gallery exists
            var galleryExists = await _galleryRepository.GetGalleryByIdAsync(galleryId);

            if (galleryExists == null)
            {
                return NotFound($"Gallery with ID {galleryId} not found.");
            }

            if (files == null || files.Count == 0)
            {
                return BadRequest(new { message = "No files provided for upload." });
            }

            var uploadedImages = new List<GalleryImageDto>();

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    // Define a dynamic path for the uploads folder
                    var projectRoot = Directory.GetCurrentDirectory();
                    var uploadsFolder = Path.Combine(projectRoot, "Uploads", "images", "galleries");

                    // Generate a unique filename
                    var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    // Save the file to the server
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    // Generate the relative path to store in the database
                    var relativePath = Path.Combine("Uploads", "images", "galleries", fileName).Replace("\\", "/");

                    // Create a DTO to return the saved details
                    var galleryImageDto = new GalleryImageDto
                    {
                        ImagePath = relativePath,
                        CreatedDate = DateTime.UtcNow,
                        GalleryId = galleryId
                    };

                    uploadedImages.Add(galleryImageDto);
                }
            }

            // Save the gallery image to the database
            await _galleryImageRepository.AddRangeAsync(uploadedImages);

            return Ok(uploadedImages);

        }

        [HttpGet("get-image/{imagePath}")]
        public IActionResult GetImage(string imagePath)
        {
            // Path to the folder where images are stored
            var imagesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", "images", "galleries");

            // Combine the base directory with the image path
            var filePath = Path.Combine(imagesDirectory, imagePath);

            // Check if the file exists
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(); // Return 404 if image not found
            }

            // Open the image file and return it as a file response
            var imageFile = System.IO.File.OpenRead(filePath);
            return File(imageFile, "image/jpg"); // Adjust MIME type based on your image type (e.g., image/png)
        }

    }
}
