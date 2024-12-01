using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SchoolSite.Server.Context;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;
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

            // Update the UpdatedDate of the associated Gallery
            var gallery = await _context.Galleries.FindAsync(galleryImage.GalleryId);
            if(gallery != null)
            {
                gallery.UpdatedDate = DateTime.Now;
            }

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

            // Update the UpdatedDate of the associated Gallery
            var gallery = await _context.Galleries.FindAsync(galleryImageDb.GalleryId);
            if (gallery != null)
            {
                gallery.UpdatedDate = DateTime.Now;
            }

            await _context.SaveChangesAsync();
        }

        public async Task<IList<GalleryImageDto>> GetImagesByGalleryIdAsync(int galleryId)
        {
            var galleryImages = new List<GalleryImageDto>();
            var galleryImagesDb = await _context.GalleryImages.Where(img => img.GalleryId == galleryId).ToListAsync();

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

        public async Task<GalleryImageDto> GetGalleryImageByIdAsync(int id)
        {
            var galleryImage = await _context.GalleryImages.FirstOrDefaultAsync(x => x.Id == id);

            var galleryImageDto = GalleryImageMapper.ToGalleryImageDto(galleryImage);

            return galleryImageDto;
        }
        public async Task<GalleryImage?> GetById(int id)
        {
            return await _context.GalleryImages.FindAsync(id);
        }

        public async Task UpdateGalleryImageAsync(GalleryImageDto galleryImageDto)
        {
            var galleryImageDb = await _context.GalleryImages.FirstOrDefaultAsync(x => x.Id == galleryImageDto.Id);

            if (galleryImageDb != null)
            {
                galleryImageDb.Id = galleryImageDto.Id;
                galleryImageDb.ImagePath = galleryImageDto.ImagePath;
                galleryImageDb.CreatedDate = galleryImageDto.CreatedDate;
                galleryImageDb.GalleryId = galleryImageDto.GalleryId;

                _context.GalleryImages.Update(galleryImageDb);
                await _context.SaveChangesAsync();
            }
        }

        public async Task AddRangeAsync(IEnumerable<GalleryImageDto> galleryImages)
        {
            var galleryImageEntities = galleryImages.Select(galleryImageDto => GalleryImageMapper.ToGalleryImage(galleryImageDto)).ToList();

            _context.GalleryImages.AddRange(galleryImageEntities);
            await _context.SaveChangesAsync();
        }
    }
}
