using SchoolSite.Server.DTOs;

namespace SchoolSite.Server.Repositories.Interfaces
{
    public interface IGalleryRepository
    {
        Task<IList<GalleryDto>> GetAllGalleriesAsync();
        Task<GalleryDto?> GetGalleryByIdAsync(int id);
        Task<IList<GalleryImageDto>> GetImagesByGalleryIdAsync(int galleryId);
        Task AddGalleryAsync(GalleryDto galleryDto);
        Task UpdateGalleryAsync(GalleryDto galleryDto);
        Task DeleteGalleryAsync(int id);
    }
}
