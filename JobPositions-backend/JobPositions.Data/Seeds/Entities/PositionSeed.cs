using JobPositions.Data.Base;
using JobPositions.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobPositions.Data.Seeds.Entities
{
    public class PositionSeed : ISeebBase
    {
        public void Execute(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Position>()
                .HasData(
                    new Position
                    {
                        Id = 1,
                        Title = "Full-Stack Developer",
                        Budget = 6000,
                        Number = 200,
                        DepartmentId = 1,
                        RecruiterId = 1,
                        StatusId = 2,
                    },
                    new Position
                    {
                        Id = 2,
                        Title = "QA Engineer",
                        Budget = 3000,
                        Number = 201,
                        DepartmentId = 1,
                        RecruiterId = 2,
                        StatusId = 1,
                    }
                );
        }
    }
}
