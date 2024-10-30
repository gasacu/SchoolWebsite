using SchoolSite.Server.Entities;
using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.DTOs
{
    public class GalleryImageDto
    {
        public int Id { get; set; }

        [StringLength(256, ErrorMessage = "ImagePath cannot be longer than 256 characters.")]
        [Required(ErrorMessage = "ImagePath is required.")]
        public string ImagePath { get; set; }

        public DateTime CreatedDate { get; set; }

        [Required]
        public int GalleryId { get; set; }

    }
}
