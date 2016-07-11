using System;
using System.Web.Http;
using TrackMeApi.Hubs;
using TrackMeApi.Model;
using TrackMeBL.Infrastructure;
using TrackMeBL.Model;
using TrackMeBL.Services;

namespace TrackMeApi.Controllers
{
    public class TokenController : ApiController
    {
        private readonly NavigationService _navigationService;
        private readonly ISessionTransmitter _sessionTransmitter;

        public TokenController(NavigationService navigationService, ISessionTransmitter sessionTransmitter)
        {
            _navigationService = navigationService;
            _sessionTransmitter = sessionTransmitter;
        }

        public OperationResult<TokensModel> Post([FromBody]NavigationInitializationViewModel vm)
        {
            if (vm == null)
            {
                return OperationResult<TokensModel>.Failure("No data provided");
            }
            if (vm.Latitude == null || vm.Longitude == null)
            {
                return OperationResult<TokensModel>.Failure("The coordinates are not provided");
            }
            var result = _navigationService.CreateSession(vm.Latitude ?? 0, vm.Longitude ?? 0, vm.Duration, vm.Address, vm.Accuracy);
            return result;
        }

        public OperationResult Delete(string id)
        {
            if (String.IsNullOrEmpty(id))
            {
                return OperationResult.Failure("Token not provided");
            }
            var result = _navigationService.DeactivateSession(id);
            if (result.IsError)
            {
                return OperationResult.Failure(result.ErrorMessage);
            }
            _sessionTransmitter.TerminateSession(result.Result);
            return OperationResult.Success();
        }
    }
}
