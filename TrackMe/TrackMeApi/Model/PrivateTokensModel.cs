using TrackMeBL.Model;

namespace TrackMeApi.Model
{
    internal class PrivateNavigationItem
    {
        public PrivateNavigationItem(string token, NavigationItem item)
        {
            PublicToken = token;
            NavigationItem = item;
        }
        public string PublicToken { get; }
        public NavigationItem NavigationItem { get; }
    }
}