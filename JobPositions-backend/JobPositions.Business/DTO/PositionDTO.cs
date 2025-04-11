
namespace JobPositions.Business.DTO
{
    public class PositionDTO
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Department { get; set; }
        public string RecruiterName { get; set; }
        public decimal Budget { get; set; }
        public int? StatusId { get; set; }
        public int? DepartmentId { get; set; }
        public int? RecruiterId { get; set; }
    }
}
