using Microsoft.EntityFrameworkCore;
using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;

namespace SchoolSite.Server.Context
{
    public class SchoolDbContext : DbContext
    {
        // Constructor
        public SchoolDbContext(DbContextOptions<SchoolDbContext> options) : base(options)
        {

        }

        // Representations of the Entities in the database
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Gallery> Galleries { get; set; }
        public DbSet<GalleryImage> GalleryImages { get; set; }
        public DbSet<PageContent> PageContents { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<GalleryImage>()
                .HasOne<Gallery>() 
                .WithMany(g => g.GalleryImages)
                .HasForeignKey(gi => gi.GalleryId) 
                .OnDelete(DeleteBehavior.Cascade) 
                .HasConstraintName("FK_GalleryImages_Galleries");

            // Configure auto-increment ID's using Fluent API
            modelBuilder.Entity<Admin>()
                .Property(a => a.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Document>()
                .Property(d => d.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Gallery>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<GalleryImage>()
                .Property(gi => gi.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<PageContent>()
                .Property(pc => pc.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<TeamMember>()
                .Property(tm => tm.Id)
                .ValueGeneratedOnAdd();

            // Unique index using Fluent API
            modelBuilder.Entity<Admin>()
                .HasIndex(a => a.Username)
                .IsUnique();

            modelBuilder.Entity<Document>()
                .HasIndex(d => d.DocumentUrl)
                .IsUnique();

            modelBuilder.Entity<GalleryImage>()
                .HasIndex(gi => gi.ImagePath)
                .IsUnique();

            modelBuilder.Entity<PageContent>()
                .HasIndex(pc => pc.PageName)
                .IsUnique();

        }

        // Database Context Override to automatically set the dates
        public override int SaveChanges()
        {
            var timestamp = DateTime.Now;

            // Handle Gallery entries (CreatedDate and UpdatedDate)
            var galleryEntries = ChangeTracker.Entries<Gallery>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entityEntry in galleryEntries)
            {
                if (entityEntry.State == EntityState.Added)
                {
                    entityEntry.Entity.CreatedDate = timestamp;
                }
                entityEntry.Entity.UpdatedDate = timestamp;
            }

            // Handle GalleryImage additions or deletions to update parent Gallery's UpdatedDate
            var galleryImageEntries = ChangeTracker.Entries<GalleryImage>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Deleted);

            foreach (var imageEntry in galleryImageEntries)
            {
                var galleryId = imageEntry.Entity.GalleryId;
                var parentGallery = Set<Gallery>().Find(galleryId);

                if (parentGallery != null)
                {
                    parentGallery.UpdatedDate = timestamp;
                    Entry(parentGallery).State = EntityState.Modified;
                }
            }

            // Handle PageContent entries (CreatedDate and UpdatedDate)
            var pageContentEntries = ChangeTracker.Entries<PageContent>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach(var entityEntry in pageContentEntries)
            {
                if(entityEntry.State == EntityState.Added)
                {
                    entityEntry.Entity.CreatedDate = timestamp;
                }
                entityEntry.Entity.UpdatedDate = timestamp;
            }

            return base.SaveChanges();
        }
    }
}
