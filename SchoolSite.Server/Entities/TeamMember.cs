using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.Entities
{
    public class TeamMember
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Role is required")]
        public string Role { get; set; }

        [Required(ErrorMessage = "Department is required")]
        public string Department { get; set; }

        public string Faculty { get; set; }
        public string Specialty { get; set; }

        public string ImagePath { get; set; }

    }
}
