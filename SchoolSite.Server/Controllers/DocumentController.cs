using Microsoft.AspNetCore.Mvc;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Repositories.Implementation;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentRepository _documentRepository;

        public DocumentController(IDocumentRepository documentRepository)
        {
            _documentRepository = documentRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DocumentDto>>> GetAllDocumentsAsync()
        {
            var allDocuments = await _documentRepository.GetAllAsync();
            return Ok(allDocuments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentDto>> GetDocumentById(int id)
        {
            var document = await _documentRepository.GetByIdAsync(id);

            if (document == null)
            {
                return NotFound();
            }

            return Ok(document);
        }

        [HttpPost]
        public async Task<ActionResult<DocumentDto>> CreateDocument(DocumentDto documentDto)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            await _documentRepository.AddDocumentAsync(documentDto);
            return CreatedAtAction(nameof(GetDocumentById), new { id = documentDto.Id }, documentDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDocumentById(int id)
        {
            await _documentRepository.DeleteDocumentAsync(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<DocumentDto>> UpdateDocumentAsync(int id, DocumentDto documentDto)
        {
            if (id != documentDto.Id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            await _documentRepository.UpdateDocumentAsync(documentDto);

            return CreatedAtAction(nameof(GetDocumentById), new { id = documentDto.Id }, documentDto);
        }
    }
}
