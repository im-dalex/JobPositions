using JobPositions.Business.DTO;

namespace JobPositions.Business.Abstract
{
    public interface IMiscellaneousService
    {
        Task<IEnumerable<KeyValueDTO<int>>> GetDepartments();
        Task<IEnumerable<KeyValueDTO<int>>> GetRecruiters();
        Task<IEnumerable<KeyValueDTO<int>>> GetPositionStatuses();
    }
}
