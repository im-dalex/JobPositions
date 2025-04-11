using System.ComponentModel.DataAnnotations;
using JobPositions.Business.Abstract;
using JobPositions.Business.DTO;
using JobPositions.Data.Base;
using JobPositions.Data.Entities;
using LinqKit;

namespace JobPositions.Business.Services
{
    public class PositionService : IPositionService
    {
        private readonly IBaseRepository<Position> positionRepository;

        public PositionService(IBaseRepository<Position> positionRepository)
        {
            this.positionRepository = positionRepository;
        }

        public async Task<IEnumerable<PositionDTO>> GetAll(
            string? positionTitle,
            int? statusId,
            int? departmentId
        )
        {
            var predicate = PredicateBuilder.New<Position>(true);

            if (statusId.HasValue)
            {
                predicate = predicate.And(p => p.StatusId == statusId.Value);
            }

            if (departmentId.HasValue)
            {
                predicate = predicate.And(p => p.DepartmentId == departmentId.Value);
            }

            if (!string.IsNullOrEmpty(positionTitle))
            {
                var title = positionTitle.ToLower();
                predicate = predicate.And(p => p.Title.ToLower().Contains(title));
            }

            var positions = await positionRepository.GetAllAsync(
                x =>
                    x.Select(p => new PositionDTO
                    {
                        Id = p.Id,
                        Title = p.Title,
                        Number = p.Number,
                        Budget = p.Budget,
                        Department = p.Department.Name,
                        RecruiterName = p.Recruiter.FullName,
                        Status = p.Status.Description,
                    }),
                predicate
            );
            return positions;
        }

        public async Task<PositionDTO> GetPositionById(int positionId)
        {
            var position = await positionRepository.GetAsync(
                x =>
                    x.Select(position => new PositionDTO
                    {
                        Id = positionId,
                        Number = position.Number,
                        Title = position.Title,
                        Budget = position.Budget,
                        DepartmentId = position.DepartmentId,
                        StatusId = position.StatusId,
                        RecruiterId = position.RecruiterId,
                    }),
                x => x.Id == positionId
            );

            if (position == null)
            {
                throw new KeyNotFoundException($"Position with id {positionId} doesn't exist.");
            }

            return position;
        }

        public async Task CreatePostion(PositionCreateDTO positionDto)
        {
            await ValidatePositionNumber(positionDto.Number);

            var position = new Position()
            {
                Number = positionDto.Number,
                Title = positionDto.Title,
                StatusId = positionDto.StatusId,
                DepartmentId = positionDto.DepartmentId,
                Budget = positionDto.Budget,
                RecruiterId = positionDto.RecruiterId,
            };

            await positionRepository.AddAsync(position);
        }

        public async Task UpdatePostion(int positionId, PositionCreateDTO positionDto)
        {
            var existingPosition = await ValidatePositionExists(positionId);

            await ValidatePositionNumber(positionDto.Number, positionId);

            existingPosition.Number = positionDto.Number;
            existingPosition.Title = positionDto.Title;
            existingPosition.StatusId = positionDto.StatusId;
            existingPosition.DepartmentId = positionDto.DepartmentId;
            existingPosition.Budget = positionDto.Budget;
            existingPosition.RecruiterId = positionDto.RecruiterId;

            await positionRepository.UpdateAsync(existingPosition);
        }

        public async Task DeletePosition(int positionId)
        {
            var position = await ValidatePositionExists(positionId);

            await positionRepository.RemoveAsync(position);
        }

        private async Task<Position> ValidatePositionExists(int id)
        {
            var position = await positionRepository.GetAsync(p => p.Id.Equals(id));
            if (position == null)
            {
                throw new KeyNotFoundException($"Position with id {id} doesn't exist.");
            }
            return position;
        }

        private async Task ValidatePositionNumber(int positionNumber, int? excludePositionId = null)
        {
            var predicate = PredicateBuilder.New<Position>();
            predicate = predicate.And(p => p.Number == positionNumber);

            if (excludePositionId.HasValue)
            {
                predicate = predicate.And(p => p.Id != excludePositionId);
            }

            var conflictPosition = await positionRepository.GetAsync(predicate);
            if (conflictPosition != null)
            {
                throw new ValidationException(
                    $"The position number is already in use by the position {conflictPosition.Title}."
                );
            }
        }
    }
}
