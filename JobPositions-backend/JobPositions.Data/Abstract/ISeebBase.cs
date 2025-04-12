using Microsoft.EntityFrameworkCore;

namespace JobPositions.Data.Abstract
{
    public interface ISeebBase
    {
        void Execute(ModelBuilder modelBuilder);
    }
}
