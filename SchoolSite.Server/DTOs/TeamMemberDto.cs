using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.DTOs
{
    public class TeamMemberDto
    {
        public int Id { get; set; }

        [StringLength(64, ErrorMessage = "Name cannot be longer than 64 characters.")]
        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }

        [StringLength(128, ErrorMessage = "Role cannot be longer than 128 characters.")]
        [Required(ErrorMessage = "Role is required.")]
        public string Role { get; set; }

        [StringLength(128, ErrorMessage = "Department cannot be longer than 128 characters.")]
        [Required(ErrorMessage = "Department is required.")]
        public string Department { get; set; }

        public string Bio { get; set; }
        public string ImagePath { get; set; }
    }
}
