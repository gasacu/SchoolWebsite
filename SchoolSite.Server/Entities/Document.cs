namespace SchoolSite.Server.Entities
{
    public class Document
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string DocumentUrl { get; set; }
        public bool IsEvent { get; set; }
        public int AdminId { get; set; }
        public Admin Admin { get; set; }
        public ICollection<Event> Events { get; set; }

    }
}
