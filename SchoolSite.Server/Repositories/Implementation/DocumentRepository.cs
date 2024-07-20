using Microsoft.EntityFrameworkCore;
using SchoolSite.Server.Context;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Mappers;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Repositories.Implementation
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly SchoolDbContext _context;
        public DocumentRepository(SchoolDbContext context)
        {
            _context = context;
        }

        public async Task AddDocumentAsync(DocumentDto documentDto)
        {
            var document = DocumentMapper.ToDocument(documentDto);

            await _context.AddAsync(document);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDocumentAsync(int id)
        {
            var documentDb = await _context.Documents.FindAsync(id);

            if (documentDb == null)
            {
                throw new KeyNotFoundException($"Document with id {id} was not found.");
            }

            _context.Documents.Remove(documentDb);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DocumentDto>> GetAllAsync()
        {
            var documents = new List<DocumentDto>();
            var documentsDb = await _context.Documents.ToListAsync();

            if (documentsDb?.Any() == true)
            {
                foreach (var document in documentsDb)
                {
                    var documentDto = DocumentMapper.ToDocumentDto(document);
                    documents.Add(documentDto);
                }
            }

            return documents;
        }

        public async Task<DocumentDto?> GetByIdAsync(int id)
        {
            var document = await _context.Documents.FindAsync(id);

            var documentDto = DocumentMapper.ToDocumentDto(document);

            return documentDto;
        }

        public async Task UpdateDocumentAsync(DocumentDto documentDto)
        {
            var documentDb = await _context.Documents.FirstOrDefaultAsync(x => x.Id == documentDto.Id);

            if (documentDb != null)
            {
                documentDb = DocumentMapper.ToDocument(documentDto);

                _context.Documents.Update(documentDb);
                await _context.SaveChangesAsync();
            }
        }
    }
}
