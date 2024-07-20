namespace SchoolSite.Server.Entities
{
    public class GalleryImage
    {
        public int Id { get; set; }
        public string ImagePath { get; set; }
        public DateTime UploadedAt { get; set; }
        public int GalleryId { get; set; }
        public Gallery Gallery { get; set; }

    }
}
