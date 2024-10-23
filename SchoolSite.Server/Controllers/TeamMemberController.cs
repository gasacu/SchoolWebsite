using Microsoft.AspNetCore.Mvc;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamMemberController : ControllerBase
    {
        private readonly ITeamMemberRepository _teamMemberRepository;

        public TeamMemberController(ITeamMemberRepository teamMemberRepository)
        {
            _teamMemberRepository = teamMemberRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeamMemberDto>>> GetAllTeamMembersAsync()
        {
            var allTeamMembers = await _teamMemberRepository.GetAllAsync();
            return Ok(allTeamMembers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeamMemberDto>> GetTeamMemberById(int id)
        {
            var teamMember = await _teamMemberRepository.GetByIdAsync(id);

            if (teamMember == null)
            {
                return NotFound();
            }

            return Ok(teamMember);
        }

        [HttpPost]
        public async Task<ActionResult<TeamMemberDto>> CreateTeamMember(TeamMemberDto teamMemberDto)
        {
            await _teamMemberRepository.AddTeamMemberAsync(teamMemberDto);
            return CreatedAtAction(nameof(GetTeamMemberById), new { id = teamMemberDto.Id }, teamMemberDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTeamMemberById(int id)
        {
            await _teamMemberRepository.DeleteTeamMemberAsync(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TeamMemberDto>> UpdateTeamMemberAsync(int id, TeamMemberDto teamMemberDto)
        {
            if (id != teamMemberDto.Id)
            {
                return BadRequest();
            }

            await _teamMemberRepository.UpdateTeamMemberAsync(teamMemberDto);

            return CreatedAtAction(nameof(GetTeamMemberById), new { id = teamMemberDto.Id }, teamMemberDto);

        }
    }
}
