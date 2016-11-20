using Microsoft.Owin;
using OwinRoutingProblem;

[assembly: OwinStartup(typeof(Startup))]
namespace OwinRoutingProblem
{
    using System.Web.Http;
    using Html5;
    using Microsoft.Owin.Extensions;
    using Owin;

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var httpConfiguration = new HttpConfiguration();

            // Configure Web API Routes:
            // - Enable Attribute Mapping
            // - Enable Default routes at /api.
            httpConfiguration.MapHttpAttributeRoutes();
            httpConfiguration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            app.UseWebApi(httpConfiguration);

            app.UseHtml5Mode("dist", "/index.html");

            app.UseStageMarker(PipelineStage.MapHandler);
        }
    }
}
