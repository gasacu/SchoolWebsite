namespace SchoolSite.Server.Entities
{
    public class GalleryImage
    {
        public int Id { get; set; }
        public string ImagePath { get; set; }
        public DateTime CreatedDate { get; set; }
        public int GalleryId { get; set; }

    }
}
