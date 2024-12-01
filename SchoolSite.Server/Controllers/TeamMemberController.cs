using Microsoft.AspNetCore.Mvc;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;
using SchoolSite.Server.Repositories.Interfaces;
using System.ComponentModel;

namespace SchoolSite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamMemberController : ControllerBase
    {
        private readonly ITeamMemberRepository _teamMemberRepository;
        private readonly IWebHostEnvironment _env;

        public TeamMemberController(ITeamMemberRepository teamMemberRepository, IWebHostEnvironment env)
        {
            _teamMemberRepository = teamMemberRepository;
            _env = env;
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
            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            await _teamMemberRepository.AddTeamMemberAsync(teamMemberDto);
            return CreatedAtAction(nameof(GetTeamMemberById), new { id = teamMemberDto.Id }, teamMemberDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTeamMemberById(int id)
        {
            var teamMember = await _teamMemberRepository.GetByIdAsync(id);
            if ( teamMember == null )
            {
                return NotFound("Team member not found.");
            }

            var imagePath = teamMember.ImagePath;
            if (!string.IsNullOrEmpty(imagePath))
            {
                var imageFullPath = Path.Combine(_env.ContentRootPath, imagePath);

                imageFullPath = imageFullPath.Replace("\\", "/");

                try
                {
                    if (System.IO.File.Exists(imageFullPath))
                    {
                        using (var stream = System.IO.File.Open(imageFullPath, FileMode.Open, FileAccess.Read, FileShare.None))
                        {
                            stream.Close();
                        }
                            
                        System.IO.File.Delete(imageFullPath);
                    }
                }
                catch (IOException ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Could not delete the image: {ex.Message}");
                }
            }

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

            if (ModelState.IsValid == false)
            {
                return BadRequest();
            }

            await _teamMemberRepository.UpdateTeamMemberAsync(teamMemberDto);

            return CreatedAtAction(nameof(GetTeamMemberById), new { id = teamMemberDto.Id }, teamMemberDto);

        }

        [HttpGet("departments")]
        public IActionResult GetDepartments()
        {
            var departments = Enum.GetValues(typeof(Department))
                .Cast<Department>()
                .Select(d => new
                {
                    Value = d.ToString(),
                    Description = d.GetType()
                        .GetField(d.ToString())
                        .GetCustomAttributes(typeof(DescriptionAttribute), false)
                        .Cast<DescriptionAttribute>()
                        .FirstOrDefault()?.Description ?? d.ToString()

                });

            return Ok(departments);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("File is not selected");
            }

            // Define a dynamic path for the uploads folder
            var projectRoot = Directory.GetCurrentDirectory();
            var uploadsFolder = Path.Combine(projectRoot, "Uploads", "images", "team-members");
            Directory.CreateDirectory(uploadsFolder);

            // Generate a unique filename
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            // Save the file to the server
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Generate the relative path to store in the database
            var relativePath = Path.Combine("Uploads", "images", "team-members", fileName).Replace("\\", "/");

            return Ok(new { path = relativePath });
        }

        [HttpGet("get-image/{imagePath}")]
        public IActionResult GetImage(string imagePath)
        {
            // Path to the folder where images are stored
            var imagesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", "images", "team-members");

            // Combine the base directory with the image path
            var filePath = Path.Combine(imagesDirectory, imagePath);

            // Check if the file exists
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(); 
            }

            // Open the image file and return it as a file response
            var imageFile = System.IO.File.OpenRead(filePath);
            var extension = Path.GetExtension(filePath)?.ToLowerInvariant();
            string mimeType = extension switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                ".bmp" => "image/bmp",
                ".svg" => "image/svg",
                ".tiff" => "image/tiff",
                ".webp" => "image/webp",
                _ => "application/octet-stream" // Default for unknown types
            };

            if (mimeType == "application/octet-stream")
            {
                return BadRequest("Unsupported file type.");
            }
            return File(imageFile, mimeType); 
        }

        [HttpDelete("delete-image/{imagePath}")]
        public IActionResult DeleteImage(string imagePath)
        {
            var imagesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", "images", "team-members");
            var filePath = Path.Combine(imagesDirectory, imagePath);

            if(System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
                return Ok(new { message = "Image deleted successfully" });
            }

            return NotFound("Image not found.");
        }

    }
}
