using JobPositions.Data.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPositions.Data.Entities
{
    public class Department : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(100)]
        public required string Name { get; set; }

        public ICollection<Position> Positions { get; set; }
    }
}
