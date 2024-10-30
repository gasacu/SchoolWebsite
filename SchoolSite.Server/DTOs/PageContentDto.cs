using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.DTOs
{
    public class PageContentDto
    {
        public int Id { get; set; }

        [StringLength(64, ErrorMessage = "PageName cannot be longer than 64 characters.")]
        [Required(ErrorMessage = "PageName is required.")]
        public string PageName { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
