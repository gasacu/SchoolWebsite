using Microsoft.EntityFrameworkCore;
using SchoolSite.Server.Context;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Mappers;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Repositories.Implementation
{
    public class TeamMemberRepository : ITeamMemberRepository
    {
        private readonly SchoolDbContext _context;
        public TeamMemberRepository(SchoolDbContext context)
        {
            _context = context;
        }

        public async Task AddTeamMemberAsync(TeamMemberDto teamMemberDto)
        {
            var teamMember = TeamMemberMapper.ToTeamMember(teamMemberDto);

            await _context.AddAsync(teamMember);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTeamMemberAsync(int id)
        {
            var teamMemberDb = await _context.TeamMembers.FindAsync(id);

            if (teamMemberDb == null)
            {
                throw new KeyNotFoundException($"Team Member with id {id} was not found.");
            }

            _context.TeamMembers.Remove(teamMemberDb);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TeamMemberDto>> GetAllAsync()
        {
            var teamMembers = new List<TeamMemberDto>();
            var teamMembersDb = await _context.TeamMembers.ToListAsync();

            if (teamMembersDb?.Any() == true)
            {
                foreach (var teamMember in teamMembersDb)
                {
                    var teamMemberDto = TeamMemberMapper.ToTeamMemberDto(teamMember);
                    teamMembers.Add(teamMemberDto);
                }
            }

            return teamMembers;
        }

        public async Task<TeamMemberDto?> GetByIdAsync(int id)
        {
            var teamMember = await _context.TeamMembers.FindAsync(id);

            var teamMemberDto = TeamMemberMapper.ToTeamMemberDto(teamMember);

            return teamMemberDto;
        }

        public async Task UpdateTeamMemberAsync(TeamMemberDto teamMemberDto)
        {
            var teamMemberDb = await _context.TeamMembers.FirstOrDefaultAsync(x => x.Id == teamMemberDto.Id);

            if (teamMemberDb != null)
            {
                teamMemberDb.Id = teamMemberDto.Id;
                teamMemberDb.Name = teamMemberDto.Name;
                teamMemberDb.Role = teamMemberDto.Role;
                teamMemberDb.Department = teamMemberDto.Department;
                teamMemberDb.Bio = teamMemberDto.Bio;
                teamMemberDb.ImagePath = teamMemberDto.ImagePath;

                _context.TeamMembers.Update(teamMemberDb);
                await _context.SaveChangesAsync();

            }

            
        }
    }
}
