using TrackMeBL.Model;

namespace TrackMeApi.Hubs
{
    public interface ICoordinatesTransmitter
    {
        void PushCoordinates(string token, NavigationItem item);
    }

    public interface ISessionTransmitter
    {
        void TerminateSession(string token);
    }
}