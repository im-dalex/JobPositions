using Microsoft.AspNetCore.SignalR;

namespace JobPositions.Hubs
{
    public class PositionHub : Hub
    {
        public async Task DataChange()
        {
            await Clients.All.SendAsync("DataChanged");
        }
    }
}
