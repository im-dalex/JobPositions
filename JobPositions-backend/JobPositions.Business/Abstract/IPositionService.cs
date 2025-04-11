
using JobPositions.Business.DTO;

namespace JobPositions.Business.Abstract
{
    public interface IPositionService
    {
        Task<IEnumerable<PositionDTO>> GetAll(string? positionTitle, int? statusId, int? departmentId);
        Task<PositionDTO> GetPositionById(int positionId);
        Task UpdatePostion(int positionId, PositionCreateDTO positionDto);
        Task CreatePostion(PositionCreateDTO positionDto);
        Task DeletePosition(int positionId);
    }
}
