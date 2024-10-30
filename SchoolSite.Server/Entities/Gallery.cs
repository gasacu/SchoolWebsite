namespace SchoolSite.Server.Entities
{
    public class Gallery
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public ICollection<GalleryImage> GalleryImages { get; set; } = new List<GalleryImage>();
    }
}
