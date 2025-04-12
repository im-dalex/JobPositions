using System.Linq.Expressions;

namespace JobPositions.Data.Abstract
{
    public interface IBaseRepository<T>
        where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<TResult>> GetAllAsync<TResult>(
            Func<IQueryable<T>, IQueryable<TResult>> transform,
            Expression<Func<T, bool>>? filter = null
        );
        Task<TResult?> GetAsync<TResult>(
            Func<IQueryable<T>, IQueryable<TResult>> transform,
            Expression<Func<T, bool>>? filter = null
        );
        Task<T?> GetAsync(Expression<Func<T, bool>> expression);
        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task RemoveAsync(T entity);
        Task SaveAsync();
    }
}
