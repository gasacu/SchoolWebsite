using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;
using SchoolSite.Server.Mappers;
using SchoolSite.Server.Repositories.Interfaces;
using System.Reflection.Metadata.Ecma335;

namespace SchoolSite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;

        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminDto>>> GetAllAdminsAsync() 
        {
            var allAdmins = await _adminRepository.GetAllAsync();
            return Ok(allAdmins);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdminDto>> GetAdminById(int id)
        {
            var admin = await _adminRepository.GetByIdAsync(id);

            if(admin == null)
            {
                return NotFound();
            }

            return Ok(admin);
        }

        [HttpPost]
        public async Task<ActionResult<AdminDto>> CreateAdmin(AdminDto adminDto)
        {
            if(ModelState.IsValid == false)
            {
                return BadRequest();
            }

            await _adminRepository.AddAdminAsync(adminDto);
            return CreatedAtAction(nameof(GetAdminById), new {id = adminDto.Id}, adminDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAdminById(int id)
        {
            await _adminRepository.DeleteAdminAsync(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AdminDto>> UpdateAdminAsync(int id, AdminDto adminDto)
        {
            if(id != adminDto.Id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            await _adminRepository.UpdateAdminAsync(adminDto);

            return CreatedAtAction(nameof(GetAdminById), new { id =  adminDto.Id}, adminDto);
        }
    }
}
