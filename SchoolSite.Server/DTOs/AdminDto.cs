using SchoolSite.Server.Entities;
using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.DTOs
{
    public class AdminDto
    {
        public int Id { get; set; }

        [StringLength(64, ErrorMessage = "Full Name cannot be longer than 64 characters.")]
        [Required(ErrorMessage = "Full Name is required.")]
        public string FullName { get; set; }


        [StringLength(32, ErrorMessage = "Username cannot be longer than 32 characters.")]
        [Required(ErrorMessage = "Username is required.")]
        [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Username can only contain letters, numbers, and underscores.")]
        public string Username { get; set; }


        [StringLength(128, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 128 characters.")]
        [Required(ErrorMessage = "Password is required.")]
        public string PasswordHash { get; set; }

    }
}
