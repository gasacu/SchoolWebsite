using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;

namespace SchoolSite.Server.Mappers
{
    public static class EventMapper
    {
        public static Event ToEvent(EventDto eventDto)
        {
            return new Event
            {
                Id = eventDto.Id,
                Title = eventDto.Title,
                DocumentId = eventDto.DocumentId,
                Document = eventDto.Document
            };
        }

        public static EventDto ToEventDto(Event evt) 
        {
            return new EventDto
            {
                Id= evt.Id,
                Title = evt.Title,
                DocumentId = evt.DocumentId,
                Document = evt.Document
            };
        }
    }
}
