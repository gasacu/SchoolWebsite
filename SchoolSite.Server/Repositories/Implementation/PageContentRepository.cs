using Microsoft.EntityFrameworkCore;
using SchoolSite.Server.Context;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;
using SchoolSite.Server.Mappers;
using SchoolSite.Server.Repositories.Interfaces;

namespace SchoolSite.Server.Repositories.Implementation
{
    public class PageContentRepository : IPageContentRepository
    {
        private readonly SchoolDbContext _context;
        public PageContentRepository(SchoolDbContext context)
        {
            _context = context;
        }

        public async Task AddPageContentAsync(PageContentDto pageContentDto)
        {
            var pageContent = PageContentMapper.ToPageContent(pageContentDto);

            await _context.AddAsync(pageContent);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePageContentAsync(int id)
        {
            var pageContentDb = await _context.PageContents.FindAsync(id);

            if (pageContentDb == null)
            {
                throw new KeyNotFoundException($"Page Content with id {id} was not found.");
            }

            _context.PageContents.Remove(pageContentDb);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<PageContentDto>> GetAllAsync()
        {
            var pagesContent = new List<PageContentDto>();
            var pagesContentDb = await _context.PageContents.ToListAsync();

            if (pagesContentDb?.Any() == true)
            {
                foreach (var pageContent in pagesContentDb)
                {
                    var pageContentDto = PageContentMapper.ToPageContentDto(pageContent);
                    pagesContent.Add(pageContentDto);
                }
            }

            return pagesContent;
        }

        public async Task<PageContentDto?> GetByIdAsync(int id)
        {
            var pageContent = await _context.PageContents.FindAsync(id);

            var pageContentDto = PageContentMapper.ToPageContentDto(pageContent);

            return pageContentDto;
        }

        public async Task UpdatePageContentAsync(PageContentDto pageContentDto)
        {
            var pageContentDb = await _context.PageContents.FirstOrDefaultAsync(x => x.Id == pageContentDto.Id);

            if (pageContentDb != null)
            {
                pageContentDb.Id = pageContentDto.Id;
                pageContentDb.PageName = pageContentDto.PageName;
                pageContentDb.Content = pageContentDto.Content;
                pageContentDb.CreatedDate = pageContentDto.CreatedDate;
                pageContentDb.UpdatedDate = DateTime.Now;

                _context.PageContents.Update(pageContentDb);
                await _context.SaveChangesAsync();
            }
        }
    }
}
