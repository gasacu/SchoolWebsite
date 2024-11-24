using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;
using System.Linq;

namespace SchoolSite.Server.Mappers
{
    public static class GalleryMapper
    {
        public static Gallery ToGallery(GalleryDto galleryDto)
        {
            return new Gallery
            {
                Id = galleryDto.Id,
                Year = galleryDto.Year,
                Title = galleryDto.Title,
                Description = galleryDto.Description,
                CreatedDate = galleryDto.CreatedDate,
                UpdatedDate = galleryDto.UpdatedDate,
                GalleryImages = galleryDto.GalleryImages
            };
        }

        public static GalleryDto ToGalleryDto(Gallery gallery)
        {
            return new GalleryDto
            {
                Id = gallery.Id,
                Year = gallery.Year,
                Title = gallery.Title,
                Description = gallery.Description,
                CreatedDate = gallery.CreatedDate,
                UpdatedDate = gallery.UpdatedDate,
                GalleryImages = gallery.GalleryImages
            };
        }
    }
}
