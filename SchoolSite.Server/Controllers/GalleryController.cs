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

        public GalleryController(IGalleryRepository galleryRepository)
        {
            _galleryRepository = galleryRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GalleryDto>>> GetAllGalleriesAsync()
        {
            var allGalleries = await _galleryRepository.GetAllAsync();
            return Ok(allGalleries);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GalleryDto>> GetGalleryById(int id)
        {
            var gallery = await _galleryRepository.GetByIdAsync(id);

            if (gallery == null)
            {
                return NotFound();
            }

            return Ok(gallery);
        }

        [HttpPost]
        public async Task<ActionResult<GalleryDto>> CreateGallery(GalleryDto galleryDto)
        {
            await _galleryRepository.AddGalleryAsync(galleryDto);
            return CreatedAtAction(nameof(GetGalleryById), new { id = galleryDto.Id }, galleryDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGalleryById(int id)
        {
            await _galleryRepository.DeleteGalleryAsync(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GalleryDto>> UpdateGalleryAsync(int id, GalleryDto galleryDto)
        {
            if (id != galleryDto.Id)
            {
                return BadRequest();
            }

            await _galleryRepository.UpdateGalleryAsync(galleryDto);

            return CreatedAtAction(nameof(GetGalleryById), new { id = galleryDto.Id }, galleryDto);
        }
    }
}
