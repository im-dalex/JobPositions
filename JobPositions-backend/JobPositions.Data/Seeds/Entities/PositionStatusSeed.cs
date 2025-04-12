using JobPositions.Data.Abstract;
using JobPositions.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobPositions.Data.Seeds.Entities
{
    public class PositionStatusSeed : ISeebBase
    {
        public void Execute(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<PositionStatus>()
                .HasData(
                    new PositionStatus { Id = 1, Description = "Open" },
                    new PositionStatus { Id = 2, Description = "Closed" }
                );
        }
    }
}
