using Microsoft.EntityFrameworkCore;
using SchoolSite.Server.Context;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Mappers;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Repositories.Implementation
{
    public class GalleryImageRepository : IGalleryImageRepository
    {
        private readonly SchoolDbContext _context;
        public GalleryImageRepository(SchoolDbContext context)
        {
            _context = context;
        }

        public async Task AddGalleryImageAsync(GalleryImageDto galleryImageDto)
        {
            var galleryImage = GalleryImageMapper.ToGalleryImage(galleryImageDto);

            await _context.AddAsync(galleryImage);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteGalleryImageAsync(int id)
        {
            var galleryImageDb = await _context.GalleryImages.FindAsync(id);

            if (galleryImageDb == null)
            {
                throw new KeyNotFoundException($"Gallery Image with id {id} was not found.");
            }

            _context.GalleryImages.Remove(galleryImageDb);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<GalleryImageDto>> GetAllAsync()
        {
            var galleryImages = new List<GalleryImageDto>();
            var galleryImagesDb = await _context.GalleryImages.ToListAsync();

            if (galleryImagesDb?.Any() == true)
            {
                foreach (var galleryImage in galleryImagesDb)
                {
                    var galleryImageDto = GalleryImageMapper.ToGalleryImageDto(galleryImage);
                    galleryImages.Add(galleryImageDto);
                }
            }

            return galleryImages;
        }

        public async Task<GalleryImageDto?> GetByIdAsync(int id)
        {
            var galleryImage = await _context.GalleryImages.FindAsync(id);

            var galleryImageDto = GalleryImageMapper.ToGalleryImageDto(galleryImage);

            return galleryImageDto;
        }

        public async Task UpdateGalleryImageAsync(GalleryImageDto galleryImageDto)
        {
            var galleryImageDb = await _context.GalleryImages.FirstOrDefaultAsync(x => x.Id == galleryImageDto.Id);

            if (galleryImageDb != null)
            {
                galleryImageDb.Id = galleryImageDto.Id;
                galleryImageDb.ImagePath = galleryImageDto.ImagePath;
                galleryImageDb.UploadedAt = galleryImageDto.UploadedAt;

                _context.GalleryImages.Update(galleryImageDb);
                await _context.SaveChangesAsync();
            }
        }
    }
}
