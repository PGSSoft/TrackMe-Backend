using System.Web.Http;
using TrackMeBL.Services;

namespace TrackMeApi.Controllers
{
    public class LoggerController : ApiController
    {
        private readonly LoggerService _logger;

        public LoggerController(LoggerService logger)
        {
            _logger = logger;
        }

        public void Post([FromBody]string message)
        {
            _logger.Log(message);
        }
    }
}
