using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolSite.Server.DTOs
{
    public class TeamMemberDto
    {
        public int Id { get; set; }

        [StringLength(64, ErrorMessage = "Name cannot be longer than 64 characters.")]
        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }

        [StringLength(64, ErrorMessage = "Role cannot be longer than 64 characters.")]
        [Required(ErrorMessage = "Role is required.")]
        public string Role { get; set; }

        [Column(TypeName = "nvarchar(64)")]
        [Required(ErrorMessage = "Department is required.")]
        public string Department { get; set; }

        public string Faculty { get; set; }
        public string Specialty { get; set; }

        public string ImagePath { get; set; }
    }
}
