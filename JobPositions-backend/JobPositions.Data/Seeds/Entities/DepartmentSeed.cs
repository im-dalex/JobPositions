using JobPositions.Data.Base;
using JobPositions.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobPositions.Data.Seeds.Entities
{
    public class DepartmentSeed : ISeebBase
    {
        public void Execute(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>().HasData(
                new Department { Id = 1, Name = "IT" },
                new Department { Id = 2, Name = "HR" }
            );
        }
    }
}
