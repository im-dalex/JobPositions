using JobPositions.Business.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace JobPositions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MiscellaneousController : ControllerBase
    {
        private readonly IMiscellaneousService _miscellaneousService;

        public MiscellaneousController(IMiscellaneousService miscellaneousService)
        {
            _miscellaneousService = miscellaneousService;
        }

        [HttpGet("Departments")]
        public async Task<IActionResult> GetDepartments()
        {
            var result = await _miscellaneousService.GetDepartments();
            return Ok(result);
        }

        [HttpGet("Recruiters")]
        public async Task<IActionResult> GetRecruiters()
        {
            var result = await _miscellaneousService.GetRecruiters();
            return Ok(result);
        }

        [HttpGet("PositionStatuses")]
        public async Task<IActionResult> GetPositionStatuses()
        {
            var result = await _miscellaneousService.GetPositionStatuses();
            return Ok(result);
        }
    }
}
