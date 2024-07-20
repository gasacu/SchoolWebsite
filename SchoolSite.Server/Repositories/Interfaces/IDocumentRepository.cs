using SchoolSite.Server.DTOs;

namespace SchoolSite.Server.Repositories.Interfaces
{
    public interface IDocumentRepository
    {
        Task<IEnumerable<DocumentDto>> GetAllAsync();
        Task<DocumentDto?> GetByIdAsync(int id);
        Task AddDocumentAsync(DocumentDto documentDto);
        Task UpdateDocumentAsync(DocumentDto documentDto);
        Task DeleteDocumentAsync(int id);
    }
}
