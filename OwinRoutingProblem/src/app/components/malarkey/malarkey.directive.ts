import { GithubContributor } from '../githubContributor/githubContributor.service';

interface IProjectsScope extends angular.IScope {
  extraValues: any[];
}

/** @ngInject */
export function acmeMalarkey(malarkey: any): angular.IDirective {

  return {
    restrict: 'E',
    scope: {
      extraValues: '='
    },
    template: '&nbsp;',
    link: linkFunc,
    controller: MalarkeyController,
    controllerAs: 'vm'
  };

}

function linkFunc(scope: IProjectsScope, el: JQuery, attr: any, vm: MalarkeyController): void {
  const watcher: () => void;
  const typist: any = vm.malarkey(el[0], {
    typeSpeed: 40,
    deleteSpeed: 40,
    pauseDelay: 800,
    loop: true,
    postfix: " ",
  });

  el.addClass('acme-malarkey');

  angular.forEach(scope.extraValues, function(value: string): void {
    typist.type(value).pause().delete();
  });

  watcher = scope.$watch('vm.contributors', function(current: IContributor, original: IContributor): void {
    angular.forEach(vm.contributors, function(contributor: IContributor): void {
      typist.type(contributor.login).pause().delete();
    });
  });

  scope.$on('$destroy', function (): void {
    watcher();
  });
}

export interface IContributor {
  id: number;
  login: string;
}

/** @ngInject */
export class MalarkeyController {
  public contributors: any[];


  constructor(private $log: angular.ILogService, private githubContributor: GithubContributor, public malarkey: any) {
    this.contributors = [];

    this.activate();
  }

  activate(): ng.IPromise<void> {
    return this.getContributors()
      .then(() => {
        this.$log.info('Activated Contributors View');
      });
  }

  getContributors(): ng.IPromise<any[]> {
    return this.githubContributor.getContributors(10)
      .then((data: any) => {
        this.contributors = data;
        return this.contributors;
      });
  }
}
