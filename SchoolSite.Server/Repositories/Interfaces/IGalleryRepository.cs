using SchoolSite.Server.DTOs;

namespace SchoolSite.Server.Repositories.Interfaces
{
    public interface IGalleryRepository
    {
        Task<IEnumerable<GalleryDto>> GetAllAsync();
        Task<GalleryDto?> GetByIdAsync(int id);
        Task AddGalleryAsync(GalleryDto galleryDto);
        Task UpdateGalleryAsync(GalleryDto galleryDto);
        Task DeleteGalleryAsync(int id);
    }
}
