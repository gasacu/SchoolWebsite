using SchoolSite.Server.Entities;
using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.DTOs
{
    public class GalleryImageDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string ImagePath { get; set; }

        [Required]
        public DateTime UploadedAt { get; set; }

        [Required]
        public int GalleryId { get; set; }
        public Gallery Gallery { get; set; }

    }
}
