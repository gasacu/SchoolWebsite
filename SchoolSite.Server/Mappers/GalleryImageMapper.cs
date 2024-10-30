using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;

namespace SchoolSite.Server.Mappers
{
    public static class GalleryImageMapper
    {
        public static GalleryImage ToGalleryImage(GalleryImageDto galleryImageDto)
        {
            return new GalleryImage
            {
                Id = galleryImageDto.Id,
                ImagePath = galleryImageDto.ImagePath,
                CreatedDate = galleryImageDto.CreatedDate,
                GalleryId = galleryImageDto.GalleryId
            };
        }

        public static GalleryImageDto ToGalleryImageDto(GalleryImage galleryImage)
        {
            return new GalleryImageDto
            {
                Id = galleryImage.Id,
                ImagePath = galleryImage.ImagePath,
                CreatedDate = galleryImage.CreatedDate,
                GalleryId = galleryImage.GalleryId
            };
        }
    }
}
