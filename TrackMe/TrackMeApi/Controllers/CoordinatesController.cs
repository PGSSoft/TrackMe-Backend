using System.Web.Http;
using TrackMeApi.Hubs;
using TrackMeApi.Model;
using TrackMeBL.Infrastructure;
using TrackMeBL.Model;
using TrackMeBL.Services;

namespace TrackMeApi.Controllers
{
    public class CoordinatesController : ApiController
    {
        private readonly NavigationService _navigationService;
        private readonly ICoordinatesTransmitter _transmitter;

        public CoordinatesController(NavigationService navigationService, ICoordinatesTransmitter transmitter)
        {
            _navigationService = navigationService;
            _transmitter = transmitter;
        }

        public OperationResult<NavigationItem> Get()
        {
            return OperationResult<NavigationItem>.Failure("Token not provided");
        }

        public OperationResult<NavigationItem> Get(string id)
        {
            var navigationItemResult = _navigationService.GetNavigationData(id);
            return navigationItemResult;
        }
        
        public OperationResult<NavigationItem> Post([FromBody]CoordinatesViewModel coordinates)
        {
            if (coordinates == null)
            {
                return OperationResult<NavigationItem>.Failure("The coordinates have to be provided");
            }
            var result = _navigationService.UpdateCoordinates(coordinates.Token, coordinates.Latitude, coordinates.Longitude, coordinates.Address, coordinates.Accuracy);
            _transmitter.PushCoordinates(coordinates.Token, result.Result);
            return result;
        }
    }
}
