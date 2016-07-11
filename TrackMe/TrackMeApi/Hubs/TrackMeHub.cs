using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace TrackMeApi.Hubs
{
    public class TrackMeHub: Hub
    {
        public Task JoinGroup(string token)
        {
            return Groups.Add(Context.ConnectionId, token);
        }

        public Task LeaveGroup(string token)
        {
            return Groups.Remove(Context.ConnectionId, token);
        }
    }
}