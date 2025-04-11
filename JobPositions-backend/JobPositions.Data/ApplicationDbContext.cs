using JobPositions.Data.Entities;
using JobPositions.Data.Seeds;
using Microsoft.EntityFrameworkCore;

namespace JobPositions.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            SeedRunner.Run(modelBuilder);

            modelBuilder.Entity<Position>()
                .HasIndex(e => e.Number)
                .IsUnique();
        }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Recruiter> Recruiters { get; set; }
        public DbSet<PositionStatus> PositionStatuses { get; set; }
    }
}
