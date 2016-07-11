using System.Reflection;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Ninject;
using Ninject.Web.Common.OwinHost;
using Owin;
using TrackMeApi;
using TrackMeBL.Providers;
using TrackMeBL.Services;
using TrackMeBL.Utils;
using Ninject.Web.WebApi.OwinHost;
using TrackMeApi.Hubs;

[assembly: OwinStartup(typeof(Startup))]
namespace TrackMeApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            WebApiConfig.Register(config);

            ConfigureSignalR(app);

            app.UseNinjectMiddleware(SetBindings);

            app.UseNinjectWebApi(config);

            app.UseCors(CorsOptions.AllowAll);
        }

        private IKernel SetBindings()
        {
            KernelProvider.Initialize();
            var kernel = KernelProvider.Kernel;
            kernel.Load(Assembly.GetExecutingAssembly());

            kernel.Bind<ITokenGenerator>().To<GuidTokenGenerator>();
            kernel.Bind<INavigationManager>().To<InMemoryNavigationManager>().InSingletonScope();
            kernel.Bind<NavigationService>().ToSelf();
            kernel.Bind<ICoordinatesTransmitter>().To<SignalrTransmitter>();
            kernel.Bind<ISessionTransmitter>().To<SignalrTransmitter>();
            kernel.Bind<LoggerService>().ToSelf();
            return kernel;
        }

        private void ConfigureSignalR(IAppBuilder app)
        {
            app.MapSignalR("/signalr", new HubConfiguration());
        }
    }
}