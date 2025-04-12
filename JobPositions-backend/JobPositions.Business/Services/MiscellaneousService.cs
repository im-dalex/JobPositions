using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JobPositions.Business.Abstract;
using JobPositions.Business.DTO;
using JobPositions.Data.Base;
using JobPositions.Data.Entities;

namespace JobPositions.Business.Services
{
    public class MiscellaneousService : IMiscellaneousService
    {
        private readonly IBaseRepository<Department> departmentRepository;
        private readonly IBaseRepository<PositionStatus> positionStatusRepository;
        private readonly IBaseRepository<Recruiter> recruiterRepository;

        public MiscellaneousService(
            IBaseRepository<Department> departmentRepository,
            IBaseRepository<PositionStatus> positionStatusRepository,
            IBaseRepository<Recruiter> recruiterRepository
        )
        {
            this.departmentRepository = departmentRepository;
            this.positionStatusRepository = positionStatusRepository;
            this.recruiterRepository = recruiterRepository;
        }

        public async Task<IEnumerable<KeyValueDTO<int>>> GetDepartments()
        {
            var departments = await departmentRepository.GetAllAsync(x =>
                x.Select(p => new KeyValueDTO<int> { Id = p.Id, Name = p.Name })
            );
            return departments;
        }

        public async Task<IEnumerable<KeyValueDTO<int>>> GetRecruiters()
        {
            var departments = await recruiterRepository.GetAllAsync(x =>
                x.Select(p => new KeyValueDTO<int> { Id = p.Id, Name = p.FullName })
            );
            return departments;
        }

        public async Task<IEnumerable<KeyValueDTO<int>>> GetPositionStatuses()
        {
            var statuses = await positionStatusRepository.GetAllAsync(x =>
                x.Select(p => new KeyValueDTO<int> { Id = p.Id, Name = p.Description })
            );
            return statuses;
        }
    }
}
