using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;

namespace SchoolSite.Server.Repositories.Interfaces
{
    public interface IGalleryImageRepository
    {
        Task<IList<GalleryImageDto>> GetImagesByGalleryIdAsync(int galleryId);
        Task<GalleryImageDto> GetGalleryImageByIdAsync(int id);
        Task AddGalleryImageAsync(GalleryImageDto galleryImageDto);
        Task UpdateGalleryImageAsync(GalleryImageDto galleryImageDto);
        Task DeleteGalleryImageAsync(int id);
        Task AddRangeAsync(IEnumerable<GalleryImageDto> galleryImages);
    }
}
