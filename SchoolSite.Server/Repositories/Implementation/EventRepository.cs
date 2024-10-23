using Microsoft.EntityFrameworkCore;
using SchoolSite.Server.Context;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Mappers;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Repositories.Implementation
{
    public class EventRepository : IEventRepository
    {
        private readonly SchoolDbContext _context;
        public EventRepository(SchoolDbContext context)
        {
            _context = context;
        }

        public async Task AddEventAsync(EventDto eventDto)
        {
            var eventDb = EventMapper.ToEvent(eventDto);

            await _context.AddAsync(eventDb);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEventAsync(int id)
        {
            var eventDb = await _context.Events.FindAsync(id);

            if (eventDb == null)
            {
                throw new KeyNotFoundException($"Event with id {id} was not found.");
            }

            _context.Events.Remove(eventDb);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<EventDto>> GetAllAsync()
        {
            var events = new List<EventDto>();
            var eventsDb = await _context.Events.ToListAsync();

            if (eventsDb?.Any() == true)
            {
                foreach (var eventDb in eventsDb)
                {
                    var eventDto = EventMapper.ToEventDto(eventDb);
                    events.Add(eventDto);
                }
            }

            return events;
        }

        public async Task<EventDto?> GetByIdAsync(int id)
        {
            var eventDb = await _context.Events.FindAsync(id);

            var eventDto = EventMapper.ToEventDto(eventDb);

            return eventDto;
        }

        public async Task UpdateEventAsync(EventDto eventDto)
        {
            var eventDb = await _context.Events.FirstOrDefaultAsync(x => x.Id == eventDto.Id);

            if (eventDb != null)
            {
                eventDb.Id = eventDto.Id;
                eventDb.Title = eventDto.Title;

                _context.Events.Update(eventDb);
                await _context.SaveChangesAsync();
            }
        }
    }
}
