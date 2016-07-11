namespace TrackMeApi.Model
{
    public class CoordinatesViewModel
    {
        public string Token { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; }
        public double? Accuracy { get; set; }
    }
}