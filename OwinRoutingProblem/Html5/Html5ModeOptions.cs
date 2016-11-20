using Microsoft.Owin;
using Microsoft.Owin.StaticFiles;

namespace OwinRoutingProblem.Html5
{
    public class Html5ModeOptions
    {
        public PathString EntryPath { get; set; }

        public FileServerOptions FileServerOptions { get; set; }
    }
}