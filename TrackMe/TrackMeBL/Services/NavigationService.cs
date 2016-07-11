using TrackMeBL.Infrastructure;
using TrackMeBL.Model;
using TrackMeBL.Utils;
using TrackMeBL.Utils.Validators;

namespace TrackMeBL.Services
{
    public class NavigationService
    {
        private readonly INavigationManager _navigationManager;

        public NavigationService(INavigationManager navigationManager)
        {
            _navigationManager = navigationManager;
        }

        public OperationResult<TokensModel> CreateSession(double latitude, double longitude, int duration, string address, double? accuracy)
        {
            var coordinatesValidator = new CoordinatesValidator(latitude, longitude);
            if (coordinatesValidator.Validate())
            {
                return OperationResult<TokensModel>.Failure(coordinatesValidator.ToString());
            }
            var durationValidator = new DurationValidator(duration);
            if (durationValidator.Validate())
            {
                return OperationResult<TokensModel>.Failure(durationValidator.ToString());
            }

            var token = _navigationManager.CreateItem(latitude, longitude, duration, address, accuracy);
            return OperationResult<TokensModel>.Success(token);
        }

        public OperationResult<NavigationItem> GetNavigationData(string token)
        {
            var item = _navigationManager.GetItem(token);
            if (item == null)
            {
                return OperationResult<NavigationItem>.Failure("Token doesn't match.");
            }
            return OperationResult<NavigationItem>.Success(item);
        }

        public OperationResult<NavigationItem> UpdateCoordinates(string token, double latitude, double longitude, string address, double? accuracy)
        {
            var validator = new CoordinatesValidator(latitude, longitude);
            if (validator.Validate())
            {
                return OperationResult<NavigationItem>.Failure(validator.ToString());
            }

            if (token == null)
            {
                return OperationResult<NavigationItem>.Failure("Token has to be provided");
            }

            var item = _navigationManager.GetItem(token);
            if (item == null)
            {
                return OperationResult<NavigationItem>.Failure("Token doesn't match.");
            }

            item.Address = address ?? "";
            item.Latitude = latitude;
            item.Longitude = longitude;
            item.Accuracy = accuracy;

            return OperationResult<NavigationItem>.Success(item);
        }

        public OperationResult<string> DeactivateSession(string token)
        {
            return _navigationManager.DeactivateItem(token);
        }
    }
}
