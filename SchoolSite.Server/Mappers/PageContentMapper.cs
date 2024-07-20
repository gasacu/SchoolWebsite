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
                Content = pageContentDto.Content
            };
        }

        public static PageContentDto ToPageContentDto(PageContent pageContent)
        {
            return new PageContentDto
            {
                Id = pageContent.Id,
                PageName = pageContent.PageName,
                Content = pageContent.Content
            };
        }
    }
}
