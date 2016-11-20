using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Owin;
using Microsoft.Owin.StaticFiles;

namespace OwinRoutingProblem.Html5
{
    using AppFunc = System.Func<System.Collections.Generic.IDictionary<string, object>, System.Threading.Tasks.Task>;

    public class Html5ModeMiddleware
    {
        private readonly Html5ModeOptions _options;
        private readonly StaticFileMiddleware _innerMiddleware;
        private readonly StaticFileMiddleware _entryPointAwareInnerMiddleware;

        public Html5ModeMiddleware(AppFunc next, Html5ModeOptions options)
        {
            if (next == null)
            {
                throw new ArgumentNullException(nameof(next));
            }

            if (options == null)
            {
                throw new ArgumentNullException(nameof(options));
            }

            _options = options;
            _innerMiddleware = new StaticFileMiddleware(next, options.FileServerOptions.StaticFileOptions);
            _entryPointAwareInnerMiddleware = new StaticFileMiddleware(
                environment =>
                {
                    var context = new OwinContext(environment);
                    context.Request.Path = _options.EntryPath;
                    return _innerMiddleware.Invoke(environment);

                },
                options.FileServerOptions.StaticFileOptions);
        }

        public Task Invoke(IDictionary<string, object> environment) =>
            _entryPointAwareInnerMiddleware.Invoke(environment);
    }
}