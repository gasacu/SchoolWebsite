using Microsoft.AspNetCore.Mvc;
using SchoolSite.Server.DTOs;
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

        public GalleryImageController(IGalleryImageRepository galleryImageRepository, IGalleryRepository galleryRepository)
        {
            _galleryImageRepository = galleryImageRepository;
            _galleryRepository = galleryRepository;
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
        public async Task<ActionResult> DeleteGalleryImageById(int id)
        {
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
    }
}
