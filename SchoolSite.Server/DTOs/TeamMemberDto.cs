using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.DTOs
{
    public class TeamMemberDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(64)]
        public string Name { get; set; }

        [Required]
        [StringLength(128)]
        public string Role { get; set; }

        [Required]
        [StringLength(128)]
        public string Department { get; set; }

        [Required]
        [StringLength(256)]
        public string Bio { get; set; }

        [Required]
        [StringLength(256)]
        public string ImagePath { get; set; }
    }
}
