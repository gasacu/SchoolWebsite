using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.Entities
{
    public class Admin
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Full Name is required")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string PasswordHash { get; set; }
    }
}
