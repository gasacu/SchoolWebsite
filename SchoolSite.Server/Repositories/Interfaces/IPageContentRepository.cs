using SchoolSite.Server.DTOs;

namespace SchoolSite.Server.Repositories.Interfaces
{
    public interface IPageContentRepository
    {
        Task<IEnumerable<PageContentDto>> GetAllAsync();
        Task<PageContentDto> GetByIdAsync(int id);
        Task AddPageContentAsync(PageContentDto pageContentDto);
        Task UpdatePageContentAsync(PageContentDto pageContentDto);
        Task DeletePageContentAsync(int id);
    }
}
