using System;

namespace TrackMeBL.Model
{
    public class NavigationItem
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime ExpirationTime { get; set; }
        public DateTime? Expired { get; set; }
        public string Address { get; set; }
        public double? Accuracy { get; set; }
    }
}
