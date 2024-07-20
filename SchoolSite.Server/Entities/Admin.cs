﻿namespace SchoolSite.Server.Entities
{
    public class Admin
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public ICollection<Document> Documents { get; set; }
        public ICollection<Gallery> Galleries { get; set; }
    }
}
