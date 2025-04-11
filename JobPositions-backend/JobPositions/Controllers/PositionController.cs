using JobPositions.Business.Abstract;
using JobPositions.Business.DTO;
using JobPositions.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace JobPositions.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly IPositionService _positionService;
        private readonly IHubContext<PositionHub> _positionHub;
        public PositionController(IPositionService positionService, IHubContext<PositionHub> positionHub)
        {
            _positionService = positionService;
            _positionHub = positionHub;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string? positionTitle, int? statusId, int? departmentId)
        {
            var result = await _positionService.GetAll(positionTitle, statusId, departmentId);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var position = await _positionService.GetPositionById(id);
            return Ok(position);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PositionCreateDTO position)
        { 
            await _positionService.CreatePostion(position);
            return Ok(position);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] PositionCreateDTO position)
        {
            await _positionService.UpdatePostion(id, position);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _positionService.DeletePosition(id);
            return NoContent();
        }
    }
}
