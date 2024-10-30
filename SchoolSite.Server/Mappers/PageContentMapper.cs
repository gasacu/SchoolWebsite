using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;

namespace SchoolSite.Server.Mappers
{
    public static class PageContentMapper
    {
        public static PageContent ToPageContent(PageContentDto pageContentDto)
        {
            return new PageContent
            {
                Id = pageContentDto.Id,
                PageName = pageContentDto.PageName,
                Content = pageContentDto.Content,
                CreatedDate = pageContentDto.CreatedDate,
                UpdatedDate = pageContentDto.UpdatedDate
            };
        }

        public static PageContentDto ToPageContentDto(PageContent pageContent)
        {
            return new PageContentDto
            {
                Id = pageContent.Id,
                PageName = pageContent.PageName,
                Content = pageContent.Content,
                CreatedDate = pageContent.CreatedDate,
                UpdatedDate = pageContent.UpdatedDate
            };
        }
    }
}
