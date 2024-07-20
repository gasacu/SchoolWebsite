using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;

namespace SchoolSite.Server.Mappers
{
    public static class AdminMapper
    {
        public static Admin ToAdmin(AdminDto adminDto)
        {
            return new Admin
            {
                Id = adminDto.Id,
                FullName = adminDto.FullName,
                Username = adminDto.Username,
                PasswordHash = adminDto.PasswordHash,
                Documents = adminDto.Documents,
                Galleries = adminDto.Galleries
            };
        }

        public static AdminDto ToAdminDto(Admin admin)
        {
            return new AdminDto
            {
                Id = admin.Id,
                FullName = admin.FullName,
                Username = admin.Username,
                PasswordHash = admin.PasswordHash,
                Documents = admin.Documents,
                Galleries = admin.Galleries
            };
        }
    }
}
