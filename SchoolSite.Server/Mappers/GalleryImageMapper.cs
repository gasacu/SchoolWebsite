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
                UploadedAt = galleryImageDto.UploadedAt,
                GalleryId = galleryImageDto.GalleryId,
                Gallery = galleryImageDto.Gallery
            };
        }

        public static GalleryImageDto ToGalleryImageDto(GalleryImage galleryImage)
        {
            return new GalleryImageDto
            {
                Id= galleryImage.Id,
                ImagePath = galleryImage.ImagePath,
                UploadedAt= galleryImage.UploadedAt,
                GalleryId = galleryImage.GalleryId,
                Gallery = galleryImage.Gallery
            };
        }
    }
}
