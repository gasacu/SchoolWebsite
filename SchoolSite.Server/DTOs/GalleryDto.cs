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

        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public ICollection<GalleryImage> GalleryImages { get; set; }
    }
}
