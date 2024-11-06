using System.ComponentModel.DataAnnotations;

namespace SchoolSite.Server.Entities
{
    public class Document
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Document Url is required")]
        public string DocumentUrl { get; set; }

        public bool IsEvent { get; set; }

    }
}
