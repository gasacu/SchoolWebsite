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
                
                if (System.IO.File.Exists(imageFullPath))
                {
                    System.IO.File.Delete(imageFullPath);
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
                return NotFound(); // Return 404 if image not found
            }

            // Open the image file and return it as a file response
            var imageFile = System.IO.File.OpenRead(filePath);
            return File(imageFile, "image/jpg"); // Adjust MIME type based on your image type (e.g., image/png)
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
