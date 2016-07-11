namespace TrackMeBL.Utils.Validators
{
    internal class CoordinatesValidator : BaseValidator
    {
        private readonly double _latitude;
        private readonly double _longitude;
        public CoordinatesValidator(double latitude, double longitude)
        {
            _latitude = latitude;
            _longitude = longitude;
        }
        public override bool Validate()
        {
            IsError = false;
            if (!(_latitude >= -90 && _latitude <= 90))
            {
                Errors.Add("Latitude out of bounds.");
                IsError = true;
            }
            if (!(_longitude >= -180 && _longitude <= 180))
            {
                Errors.Add("Longitude out of bounds.");
                IsError = true;
            }
            return IsError;
        }
    }
}
