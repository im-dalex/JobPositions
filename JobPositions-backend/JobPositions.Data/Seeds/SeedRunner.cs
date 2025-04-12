using JobPositions.Data.Abstract;
using JobPositions.Data.Seeds.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobPositions.Data.Seeds
{
    public static class SeedRunner
    {
        private static readonly List<ISeebBase> _seeders = new()
        {
            new DepartmentSeed(),
            new PositionStatusSeed(),
            new RecruiterSeed(),
            new PositionSeed(),
        };

        public static void Run(ModelBuilder modelBuilder)
        {
            foreach (var seed in _seeders)
            {
                seed.Execute(modelBuilder);
            }
        }
    }
}
