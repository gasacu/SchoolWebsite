using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.DTOs
{
    public class PageContentDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(32)]
        public string PageName { get; set; }
        public string Content { get; set; }
    }
}
