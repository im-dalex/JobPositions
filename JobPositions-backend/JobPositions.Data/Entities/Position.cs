using JobPositions.Data.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPositions.Data.Entities
{
    public class Position : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int Number { get; set; }

        [MaxLength(100)]
        public string Title { get; set; }

        public decimal Budget { get; set; }

        [ForeignKey("Status")]
        public int StatusId { get; set; }

        [ForeignKey("Department")]
        public int DepartmentId { get; set; }

        [ForeignKey("Recruiter")]
        public int RecruiterId { get; set; }

        public PositionStatus Status { get; set; }

        public Department Department { get; set; }

        public Recruiter Recruiter { get; set; }
    }
}
