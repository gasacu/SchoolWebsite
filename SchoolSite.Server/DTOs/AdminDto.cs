using SchoolSite.Server.Entities;
using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.DTOs
{
    public class AdminDto
    {
        public int Id { get; set; }


        [StringLength(64, ErrorMessage = "Full name cannot be longer than 64 characters.")]
        [Required(ErrorMessage = "Full name is required.")]
        public string FullName { get; set; }


        [StringLength(32, ErrorMessage = "Username cannot be longer than 32 characters.")]
        [Required(ErrorMessage = "Username is required.")]
        [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Username can only contain letters, numbers, and underscores.")]
        public string Username { get; set; }


        [StringLength(128, ErrorMessage = "Password cannot be longer than 128 characters.")]
        [Required(ErrorMessage = "Password is required.")]
        public string PasswordHash { get; set; }


        public ICollection<Document> Documents { get; set; }
        public ICollection<Gallery> Galleries { get; set; }
    }
}
