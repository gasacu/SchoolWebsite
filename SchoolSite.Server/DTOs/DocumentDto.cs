using SchoolSite.Server.Entities;
using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.DTOs
{
    public class DocumentDto
    {
        public int Id { get; set; }

        [StringLength(256, ErrorMessage = "Title cannot be longer than 256 characters.")]
        [Required(ErrorMessage = "Title is required.")]
        public string Title { get; set; }


        [StringLength(256, ErrorMessage = "DocumentUrl cannot be longer than 256 characters.")]
        [Required(ErrorMessage = "DocumentUrl is required.")]
        public string DocumentUrl { get; set; }


        public bool IsEvent { get; set; }
        public int AdminId { get; set; }
        public Admin Admin { get; set; }
        public ICollection<Event> Events { get; set; }
    }
}
