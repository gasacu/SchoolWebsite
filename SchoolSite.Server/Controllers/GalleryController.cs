using Microsoft.AspNetCore.Mvc;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Repositories.Implementation;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : ControllerBase
    {
        private readonly IGalleryRepository _galleryRepository;
        private readonly IGalleryImageRepository _galleryImageRepository;
        private readonly IWebHostEnvironment _env;

        public GalleryController(IGalleryRepository galleryRepository, IGalleryImageRepository galleryImageRepository, IWebHostEnvironment env)
        {
            _galleryRepository = galleryRepository;
            _galleryImageRepository = galleryImageRepository;
            _env = env;
        }

        [HttpGet]
        public async Task<ActionResult<IList<GalleryDto>>> GetAllGalleriesAsync()
        {
            var allGalleries = await _galleryRepository.GetAllGalleriesAsync();
            return Ok(allGalleries);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GalleryDto>> GetGalleryById(int id)
        {
            var gallery = await _galleryRepository.GetGalleryByIdAsync(id);

            if (gallery == null)
            {
                return NotFound();
            }

            return Ok(gallery);
        }

        [HttpGet("{galleryId}/images")]
        public async Task<ActionResult<IEnumerable<GalleryImageDto>>> GetImagesByGalleryIdAsync(int galleryId)
        {
            var allGalleryImages = await _galleryRepository.GetImagesByGalleryIdAsync(galleryId);
            return Ok(allGalleryImages);
        }

        [HttpPost]
        public async Task<ActionResult<GalleryDto>> CreateGallery(GalleryDto galleryDto)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            await _galleryRepository.AddGalleryAsync(galleryDto);
            return CreatedAtAction(nameof(GetGalleryById), new { id = galleryDto.Id }, galleryDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGalleryById(int id)
        {
            var gallery = await _galleryRepository.GetGalleryByIdAsync(id);

            if(gallery == null)
            {
                return NotFound("Gallery not found.");
            }

            foreach (var image in gallery.GalleryImages)
            {
                if (!string.IsNullOrEmpty(image.ImagePath))
                {
                    var imageFullPath = Path.Combine(_env.ContentRootPath, image.ImagePath).Replace("\\", "/");

                    System.Threading.Thread.Sleep(100);
                    if (System.IO.File.Exists(imageFullPath))
                    {
                        System.IO.File.Delete(imageFullPath);
                    }
                }
            }

            await _galleryRepository.DeleteGalleryAsync(id);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GalleryDto>> UpdateGalleryAsync(int id, GalleryDto galleryDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { errors });
            }

            if (id != galleryDto.Id)
            {
                return BadRequest();
            }

            await _galleryRepository.UpdateGalleryAsync(galleryDto);
            return CreatedAtAction(nameof(GetGalleryById), new { id = galleryDto.Id }, galleryDto);
        }
    }
}
