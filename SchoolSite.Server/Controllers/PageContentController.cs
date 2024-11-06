using Microsoft.AspNetCore.Mvc;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Repositories.Implementation;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageContentController : ControllerBase
    {
        private readonly IPageContentRepository _pageContentRepository;

        public PageContentController(IPageContentRepository pageContentRepository)
        {
            _pageContentRepository = pageContentRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PageContentDto>>> GetAllPageContentAsync()
        {
            var allPages = await _pageContentRepository.GetAllAsync();
            return Ok(allPages);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PageContentDto>> GetPageContentById(int id)
        {
            var page = await _pageContentRepository.GetByIdAsync(id);

            if (page == null)
            {
                return NotFound();
            }

            return Ok(page);
        }

        [HttpPost]
        public async Task<ActionResult<PageContentDto>> CreatePageContent(PageContentDto pageContentDto)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            await _pageContentRepository.AddPageContentAsync(pageContentDto);
            return CreatedAtAction(nameof(GetPageContentById), new { id = pageContentDto.Id }, pageContentDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePageContentById(int id)
        {
            await _pageContentRepository.DeletePageContentAsync(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<PageContentDto>> UpdatePageContentAsync(int id, PageContentDto pageContentDto)
        {
            if (id != pageContentDto.Id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            await _pageContentRepository.UpdatePageContentAsync(pageContentDto);

            return CreatedAtAction(nameof(GetPageContentById), new { id = pageContentDto.Id }, pageContentDto);
        }
    }
}
