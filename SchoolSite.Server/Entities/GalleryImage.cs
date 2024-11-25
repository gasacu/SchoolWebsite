using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SchoolSite.Server.Entities
{
    public class GalleryImage
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Image Path is required")]
        public string ImagePath { get; set; }

        public DateTime CreatedDate { get; set; }

        [Required(ErrorMessage = "Gallery Id is required")]
        public int GalleryId { get; set; }

        public Gallery Gallery { get; set; }

    }
}
