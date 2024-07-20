using SchoolSite.Server.DTOs;

namespace SchoolSite.Server.Repositories.Interfaces
{
    public interface IGalleryImageRepository
    {
        Task<IEnumerable<GalleryImageDto>> GetAllAsync();
        Task<GalleryImageDto> GetByIdAsync(int id);
        Task AddGalleryImageAsync(GalleryImageDto galleryImageDto);
        Task UpdateGalleryImageAsync(GalleryImageDto galleryImageDto);
        Task DeleteGalleryImageAsync(int id);
    }
}
