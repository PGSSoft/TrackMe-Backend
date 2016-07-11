namespace TrackMeBL.Utils.Validators
{
    internal class DurationValidator : BaseValidator
    {
        private readonly int _duration;
        public DurationValidator(int duration)
        {
            _duration = duration;
        }
        public override bool Validate()
        {
            //if (_duration < 1 || _duration > 120)
            if (_duration != 240)
            {
                IsError = true;
                Errors.Add("Duration has an invalid value.");
            }
            else
            {
                IsError = false;
            }
            return IsError;
        }
    }
}
