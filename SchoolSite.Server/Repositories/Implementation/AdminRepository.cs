using Microsoft.EntityFrameworkCore;
using SchoolSite.Server.Context;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Mappers;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Repositories.Implementation
{
    public class AdminRepository : IAdminRepository
    {
        private readonly SchoolDbContext _context;
        public AdminRepository(SchoolDbContext context) 
        {
            _context = context;
        }

        public async Task AddAdminAsync(AdminDto adminDto)
        {
            var admin = AdminMapper.ToAdmin(adminDto);

            await _context.Admins.AddAsync(admin);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAdminAsync(int id)
        {
            var adminDb = await _context.Admins.FindAsync(id);

            if(adminDb == null)
            {
                throw new KeyNotFoundException($"Admin with id {id} was not found.");
            }

            _context.Admins.Remove(adminDb);
            await _context.SaveChangesAsync();

        }

        public async Task<IEnumerable<AdminDto>> GetAllAsync()
        {
            var admins = new List<AdminDto>();
            var adminsDb = await _context.Admins.ToListAsync();

            if(adminsDb?.Any() == true)
            {
                foreach(var admin in adminsDb)
                {
                    var adminDto = AdminMapper.ToAdminDto(admin);
                    admins.Add(adminDto);
                }
            }

            return admins;
        }

        public async Task<AdminDto?> GetByIdAsync(int id)
        {
            var admin = await _context.Admins.FindAsync(id);

            var adminDto = AdminMapper.ToAdminDto(admin);

            return adminDto;
            
        }

        public async Task UpdateAdminAsync(AdminDto adminDto)
        {
            var adminDb = await _context.Admins.FirstOrDefaultAsync(x => x.Id == adminDto.Id);
        
            if(adminDb != null)
            {
                adminDb = AdminMapper.ToAdmin(adminDto);

                _context.Admins.Update(adminDb);
                await _context.SaveChangesAsync();
            }
        }
    }
}
