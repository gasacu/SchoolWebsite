using SchoolSite.Server.DTOs;

namespace SchoolSite.Server.Repositories.Interfaces
{
    public interface IAdminRepository
    {
        Task<IEnumerable<AdminDto>> GetAllAsync();
        Task<AdminDto?> GetByIdAsync(int id);
        Task AddAdminAsync(AdminDto adminDto);
        Task UpdateAdminAsync(AdminDto adminDto);
        Task DeleteAdminAsync(int id);
    }
}
