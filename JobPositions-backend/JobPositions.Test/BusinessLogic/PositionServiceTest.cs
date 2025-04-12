using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using AutoFixture;
using AutoFixture.AutoMoq;
using JobPositions.Business.DTO;
using JobPositions.Business.Services;
using JobPositions.Data.Abstract;
using JobPositions.Data.Entities;
using Moq;

namespace JobPositions.Test.BusinessLogic
{
    public class PositionServiceTests
    {
        private readonly IFixture _fixture;
        private readonly Mock<IBaseRepository<Position>> _mockPositionRepository;
        private readonly PositionService _positionService;

        public PositionServiceTests()
        {
            _fixture = new Fixture().Customize(new AutoMoqCustomization());
            _fixture.Behaviors.Remove(new ThrowingRecursionBehavior());
            _fixture.Behaviors.Add(new OmitOnRecursionBehavior(recursionDepth: 1));

            _mockPositionRepository = new Mock<IBaseRepository<Position>>();
            _positionService = new PositionService(_mockPositionRepository.Object);
        }

        [Fact]
        public async Task CreatePosition_ShouldAddPosition_WhenValidData()
        {
            // Arrange
            var positionDto = _fixture
                .Build<PositionCreateDTO>()
                .With(p => p.Budget, 2500)
                .Create();

            _mockPositionRepository
                .Setup(r => r.GetAsync(It.IsAny<Expression<Func<Position, bool>>>()))
                .ReturnsAsync((Position?)null);

            // Act
            await _positionService.CreatePostion(positionDto);

            // Assert
            _mockPositionRepository.Verify(
                r => r.AddAsync(It.Is<Position>(p => p.Number == positionDto.Number)),
                Times.Once
            );
        }

        [Fact]
        public async Task CreatePosition_ShouldThrowValidationException_WhenPositionNumberConflict()
        {
            // Arrange
            var positionDto = _fixture
                .Build<PositionCreateDTO>()
                .With(p => p.Budget, 2500)
                .Create();

            var existingPosition = _fixture
                .Build<Position>()
                .With(p => p.Number, positionDto.Number)
                .Create();

            _mockPositionRepository
                .Setup(r => r.GetAsync(It.IsAny<Expression<Func<Position, bool>>>()))
                .ReturnsAsync(existingPosition);

            // Act & Assert
            var exception = await Assert.ThrowsAsync<ValidationException>(
                () => _positionService.CreatePostion(positionDto)
            );
            Assert.Equal(
                $"The position number is already in use by the position {existingPosition.Title}.",
                exception.Message
            );
        }

        [Fact]
        public void Budget_ShouldThrowValidationException_WhenLessThanMinimum()
        {
            // Arrange
            var positionDto = _fixture
                .Build<PositionCreateDTO>()
                .With(p => p.Budget, -2500)
                .Create();

            var context = new ValidationContext(positionDto);
            var results = new List<ValidationResult>();

            // Act
            var isValid = Validator.TryValidateObject(positionDto, context, results, true);

            // Assert
            Assert.False(isValid);
            Assert.Contains(results, r => r.ErrorMessage == "Budget must be greater than 0.");
        }
    }
}
