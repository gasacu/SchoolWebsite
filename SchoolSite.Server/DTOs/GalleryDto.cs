using SchoolSite.Server.Entities;
using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.DTOs
{
    public class GalleryDto
    {
        public int Id { get; set; }

        [StringLength(256, ErrorMessage = "Title cannot be longer than 256 characters.")]
        [Required(ErrorMessage = "Title is required.")]
        public string Title { get; set; }

        [StringLength(512, ErrorMessage = "Description cannot be longer than 512 characters.")]
        [Required(ErrorMessage = "Description is required.")]
        public string Description { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

        public ICollection<GalleryImage> GalleryImages { get; set; }
    }
}
