/// <reference path="../../typings/index.d.ts" />

import { config } from "./index.config";
import { routerConfig } from "./index.route";
import { runBlock } from "./index.run";
import { MainController } from "./main/main.controller";
import { ContactController } from "./contact/contact.controller";
import { AboutController } from "./about/about.controller";
import { GithubContributor } from "../app/components/githubContributor/githubContributor.service";
import { WebDevTecService } from "../app/components/webDevTec/webDevTec.service";
import { acmeNavbar } from "../app/components/navbar/navbar.directive";
import { acmeMalarkey } from "../app/components/malarkey/malarkey.directive";

declare const malarkey: any;
declare const moment: moment.MomentStatic;

namespace owinRoutingProblem {
  "use strict";

  angular
    .module("owinRoutingProblem", [
      "ngAnimate",
      "ngCookies",
      "ngTouch",
      "ngSanitize",
      "ngMessages",
      "ngAria",
      "restangular",
      "ui.router",
      "ui.bootstrap",
      "toastr",
    ])
    .constant("malarkey", malarkey)
    .constant("moment", moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service("githubContributor", GithubContributor)
    .service("webDevTec", WebDevTecService)
    .controller("MainController", MainController)
    .controller("ContactController", ContactController)
    .controller("AboutController", AboutController)
    .directive("acmeNavbar", acmeNavbar)
    .directive("acmeMalarkey", acmeMalarkey);
}
