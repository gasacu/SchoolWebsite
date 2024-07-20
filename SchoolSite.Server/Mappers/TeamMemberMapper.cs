using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;

namespace SchoolSite.Server.Mappers
{
    public static class TeamMemberMapper
    {
        public static TeamMember ToTeamMember(TeamMemberDto teamMemberDto)
        {
            return new TeamMember
            {
                Id = teamMemberDto.Id,
                Name = teamMemberDto.Name,
                Role = teamMemberDto.Role,
                Department = teamMemberDto.Department,
                Bio = teamMemberDto.Bio,
                ImagePath = teamMemberDto.ImagePath
            };
        }

        public static TeamMemberDto ToTeamMemberDto(TeamMember teamMember)
        {
            return new TeamMemberDto
            {
                Id = teamMember.Id,
                Name = teamMember.Name,
                Role = teamMember.Role,
                Department = teamMember.Department,
                Bio = teamMember.Bio,
                ImagePath = teamMember.ImagePath
            };
        }
    }
}
