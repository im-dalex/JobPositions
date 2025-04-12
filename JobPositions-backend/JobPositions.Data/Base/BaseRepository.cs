using System.Linq.Expressions;
using JobPositions.Data.Abstract;
using Microsoft.EntityFrameworkCore;

namespace JobPositions.Data.Base
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity>
        where TEntity : class, new()
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<TEntity> _dbSet;

        public BaseRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
        }

        public virtual async Task<IEnumerable<TResult>> GetAllAsync<TResult>(
            Func<IQueryable<TEntity>, IQueryable<TResult>> transform,
            Expression<Func<TEntity, bool>>? filter = null
        )
        {
            var query = _dbSet.AsNoTracking();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            var resultQuery = transform(query);

            return await resultQuery.ToListAsync();
        }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            var query = _dbSet.AsNoTracking();

            return await query.ToListAsync();
        }

        public virtual async Task<TResult?> GetAsync<TResult>(
            Func<IQueryable<TEntity>, IQueryable<TResult>> transform,
            Expression<Func<TEntity, bool>>? filter = null
        )
        {
            var query = _dbSet.AsNoTracking();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            var resultQuery = transform(query);

            return await resultQuery.FirstOrDefaultAsync();
        }

        public virtual async Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> filter)
        {
            var query = _dbSet.AsNoTracking().Where(filter);

            return await query.FirstOrDefaultAsync();
        }

        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            _dbSet.Attach(entity);
            _context.Entry<TEntity>(entity).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return entity;
        }

        public virtual async Task RemoveAsync(TEntity entity)
        {
            _dbSet.Attach(entity);

            _context.Entry<TEntity>(entity).State = EntityState.Deleted;

            await _context.SaveChangesAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
