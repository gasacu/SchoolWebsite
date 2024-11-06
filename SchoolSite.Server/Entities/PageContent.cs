using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.Entities
{
    public class PageContent
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Page Name is required")]
        public string PageName { get; set; }

        public string Content { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }
}
