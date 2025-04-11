using System.ComponentModel.DataAnnotations;

namespace JobPositions.Business.DTO
{
    public class PositionCreateDTO
    {
        public int Number { get; set; }
        public required string Title { get; set; }
        public int StatusId { get; set; }
        public int DepartmentId { get; set; }
        public int RecruiterId { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Budget must be greater than 0.")]
        public decimal Budget { get; set; }
    }
}
