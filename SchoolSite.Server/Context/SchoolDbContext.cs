using Microsoft.EntityFrameworkCore;
using SchoolSite.Server.Entities;

namespace SchoolSite.Server.Context
{
    public class SchoolDbContext : DbContext
    {
        // Constructor
        public SchoolDbContext (DbContextOptions<SchoolDbContext> options) : base(options) 
        {
            
        }

        // Representations of the Entities in the database
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Gallery> Galleries { get; set; }
        public DbSet<GalleryImage> GalleryImages { get; set; }
        public DbSet<PageContent> PageContents { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            // Configure relationships and contraints
            modelBuilder.Entity<Document>()
                .HasOne(a => a.Admin)
                .WithMany(d => d.Documents)
                .HasForeignKey(a => a.AdminId)
                .HasConstraintName("FK_Documents_Admins");

            modelBuilder.Entity<Event>()
                .HasOne(d => d.Document)
                .WithMany(e => e.Events)
                .HasForeignKey(d => d.DocumentId)
                .HasConstraintName("FK_Events_Documents");

            modelBuilder.Entity<Gallery>()
                .HasOne(a => a.Admin)
                .WithMany(g => g.Galleries)
                .HasForeignKey(a => a.AdminId)
                .HasConstraintName("FK_Galleries_Admins");

            modelBuilder.Entity<GalleryImage>()
               .HasOne(g => g.Gallery)
               .WithMany(gi => gi.GalleryImages)
               .HasForeignKey(g => g.GalleryId)
               .HasConstraintName("FK_GalleryImages_Galleries");

            
            // Unique index using Fluent API
            modelBuilder.Entity<Admin>()
                .HasIndex(a => a.Username)
                .IsUnique();

            
        }
    }
}
