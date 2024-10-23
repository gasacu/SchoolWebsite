using Microsoft.AspNetCore.Mvc;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Repositories.Implementation;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryImageController : ControllerBase
    {
        private readonly IGalleryImageRepository _galleryImageRepository;

        public GalleryImageController(IGalleryImageRepository galleryImageRepository)
        {
            _galleryImageRepository = galleryImageRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GalleryImageDto>>> GetAllGalleryImagesAsync()
        {
            var allGalleryImages = await _galleryImageRepository.GetAllAsync();
            return Ok(allGalleryImages);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GalleryImageDto>> GetGalleryImageById(int id)
        {
            var galleryImage = await _galleryImageRepository.GetByIdAsync(id);

            if (galleryImage == null)
            {
                return NotFound();
            }

            return Ok(galleryImage);
        }

        [HttpPost]
        public async Task<ActionResult<GalleryImageDto>> CreateGalleryImage(GalleryImageDto galleryImageDto)
        {
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

            await _galleryImageRepository.UpdateGalleryImageAsync(galleryImageDto);

            return CreatedAtAction(nameof(GetGalleryImageById), new { id = galleryImageDto.Id }, galleryImageDto);
        }
    }
}
