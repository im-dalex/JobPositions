
using Microsoft.EntityFrameworkCore;

namespace JobPositions.Data.Base
{
    public interface ISeebBase
    {
        void Execute(ModelBuilder modelBuilder);
    }
}
