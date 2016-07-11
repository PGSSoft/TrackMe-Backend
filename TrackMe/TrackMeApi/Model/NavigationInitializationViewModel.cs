namespace TrackMeApi.Model
{
    public class NavigationInitializationViewModel
    {
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public int Duration { get; set; }
        public string Address { get; set; }
        public double? Accuracy { get; set; }
    }
}
