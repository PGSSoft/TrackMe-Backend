using Microsoft.AspNet.SignalR;
using TrackMeBL.Model;

namespace TrackMeApi.Hubs
{
    public class SignalrTransmitter : ICoordinatesTransmitter, ISessionTransmitter
    {
        private readonly IHubContext _hubContext;

        public SignalrTransmitter()
        {
            _hubContext = GlobalHost.ConnectionManager.GetHubContext<TrackMeHub>();
        }

        public void PushCoordinates(string token, NavigationItem item)
        {
            _hubContext.Clients.Group(token).pushCoordinates(token, item);
        }

        public void TerminateSession(string token)
        {
            _hubContext.Clients.Group(token).terminateSession(token);
        }
    }
}