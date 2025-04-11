using JobPositions.Business.Abstract;
using Microsoft.AspNetCore.SignalR;

namespace JobPositions.Hubs
{
    public class PositionHub : Hub
    {
        //private readonly IPositionService _positionService;
        //public PositionHub(IPositionService positionService)
        //{
        //    _positionService = positionService;
        //}

        public async Task DataChange()
        {
            await Clients.All.SendAsync("DataChanged");
        }
    }
}
