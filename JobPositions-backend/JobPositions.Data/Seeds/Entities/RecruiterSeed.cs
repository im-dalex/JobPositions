using JobPositions.Data.Base;
using JobPositions.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobPositions.Data.Seeds.Entities
{
    public class RecruiterSeed : ISeebBase
    {
        public void Execute(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Recruiter>()
                .HasData(
                    new Recruiter { Id = 1, FullName = "Veronica Arias" },
                    new Recruiter { Id = 2, FullName = "Adrian Carmona" }
                );
        }
    }
}
