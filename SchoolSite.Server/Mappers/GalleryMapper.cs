using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;

namespace SchoolSite.Server.Mappers
{
    public static class GalleryMapper
    {
        public static Gallery ToGallery(GalleryDto galleryDto)
        {
            return new Gallery
            {
                Id = galleryDto.Id,
                Title = galleryDto.Title,
                Description = galleryDto.Description,
                CreatedDate = galleryDto.CreatedDate,
                UpdatedDate = galleryDto.UpdatedDate,
                AdminId = galleryDto.AdminId,
                Admin = galleryDto.Admin,
                GalleryImages = galleryDto.GalleryImages
            };
        }

        public static GalleryDto ToGalleryDto(Gallery gallery)
        {
            return new GalleryDto
            {
                Id = gallery.Id,
                Title = gallery.Title,
                Description = gallery.Description,
                CreatedDate = gallery.CreatedDate,
                UpdatedDate = gallery.UpdatedDate,
                AdminId = gallery.AdminId,
                Admin = gallery.Admin,
                GalleryImages = gallery.GalleryImages
            };
        }
    }
}
