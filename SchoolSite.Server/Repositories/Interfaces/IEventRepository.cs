using SchoolSite.Server.DTOs;

namespace SchoolSite.Server.Repositories.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<EventDto>> GetAllAsync();
        Task<EventDto> GetByIdAsync(int id);
        Task AddEventAsync(EventDto eventDto);
        Task UpdateEventAsync(EventDto eventDto);
        Task DeleteEventAsync(int id);
    }
}
