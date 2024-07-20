using SchoolSite.Server.DTOs;

namespace SchoolSite.Server.Repositories.Interfaces
{
    public interface ITeamMemberRepository
    {
        Task<IEnumerable<TeamMemberDto>> GetAllAsync();
        Task<TeamMemberDto?> GetByIdAsync(int id);
        Task AddTeamMemberAsync(TeamMemberDto teamMemberDto);
        Task UpdateTeamMemberAsync(TeamMemberDto teamMemberDto);
        Task DeleteTeamMemberAsync(int id);
    }
}
