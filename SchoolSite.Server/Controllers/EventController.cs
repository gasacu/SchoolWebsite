using Microsoft.AspNetCore.Mvc;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Repositories.Implementation;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetAllEventsAsync()
        {
            var allEvents = await _eventRepository.GetAllAsync();
            return Ok(allEvents);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventDto>> GetEventById(int id)
        {
            var events = await _eventRepository.GetByIdAsync(id);

            if (events == null)
            {
                return NotFound();
            }

            return Ok(events);
        }

        [HttpPost]
        public async Task<ActionResult<EventDto>> CreateEvent(EventDto eventDto)
        {
            await _eventRepository.AddEventAsync(eventDto);
            return CreatedAtAction(nameof(GetEventById), new { id = eventDto.Id }, eventDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEventById(int id)
        {
            await _eventRepository.DeleteEventAsync(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<EventDto>> UpdateEventAsync(int id, EventDto eventDto)
        {
            if (id != eventDto.Id)
            {
                return BadRequest();
            }

            await _eventRepository.UpdateEventAsync(eventDto);

            return CreatedAtAction(nameof(GetEventById), new { id = eventDto.Id }, eventDto);
        }
    }
}
