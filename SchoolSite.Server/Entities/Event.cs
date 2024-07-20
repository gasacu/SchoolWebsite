namespace SchoolSite.Server.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int DocumentId { get; set; }
        public Document Document { get; set; }
    
    }
}
