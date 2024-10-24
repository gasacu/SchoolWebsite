﻿using Microsoft.EntityFrameworkCore;
using SchoolSite.Server.Context;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Mappers;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Repositories.Implementation
{
    public class GalleryRepository : IGalleryRepository
    {
        private readonly SchoolDbContext _context;
        public GalleryRepository(SchoolDbContext context)
        {
            _context = context;
        }

        public async Task AddGalleryAsync(GalleryDto galleryDto)
        {
            var gallery = GalleryMapper.ToGallery(galleryDto);

            await _context.AddAsync(gallery);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteGalleryAsync(int id)
        {
            var galleryDb = await _context.Galleries.FindAsync(id);

            if (galleryDb == null)
            {
                throw new KeyNotFoundException($"Gallery with id {id} was not found.");
            }

            _context.Galleries.Remove(galleryDb);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<GalleryDto>> GetAllAsync()
        {
            var galleries = new List<GalleryDto>();
            var galleriesDb = await _context.Galleries.ToListAsync();

            if (galleriesDb?.Any() == true)
            {
                foreach (var gallery in galleriesDb)
                {
                    var galleryDto = GalleryMapper.ToGalleryDto(gallery);
                    galleries.Add(galleryDto);
                }
            }

            return galleries;
        }

        public async Task<GalleryDto?> GetByIdAsync(int id)
        {
            var gallery = await _context.Galleries.FindAsync(id);

            var galleryDto = GalleryMapper.ToGalleryDto(gallery);

            return galleryDto;
        }

        public async Task UpdateGalleryAsync(GalleryDto galleryDto)
        {
            var galleryDb = await _context.Galleries.FirstOrDefaultAsync(x => x.Id == galleryDto.Id);

            if (galleryDb != null)
            {
                galleryDb.Id = galleryDto.Id;
                galleryDb.Title = galleryDto.Title;
                galleryDb.Description = galleryDto.Description;

                _context.Galleries.Update(galleryDb);
                await _context.SaveChangesAsync();
            }
        }
    }
}
