(function () {
  'use strict';

  angular
    .module('moduleones')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('moduleones', {
        abstract: true,
        url: '/moduleones',
        template: '<ui-view/>'
      })
      .state('moduleones.list', {
        url: '',
        templateUrl: 'modules/moduleones/client/views/list-moduleones.client.view.html',
        controller: 'ModuleonesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Moduleones List'
        }
      })
      .state('moduleones.create', {
        url: '/create',
        templateUrl: 'modules/moduleones/client/views/form-moduleone.client.view.html',
        controller: 'ModuleonesController',
        controllerAs: 'vm',
        resolve: {
          moduleoneResolve: newModuleone
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Moduleones Create'
        }
      })
      .state('moduleones.edit', {
        url: '/:moduleoneId/edit',
        templateUrl: 'modules/moduleones/client/views/form-moduleone.client.view.html',
        controller: 'ModuleonesController',
        controllerAs: 'vm',
        resolve: {
          moduleoneResolve: getModuleone
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Moduleone {{ moduleoneResolve.name }}'
        }
      })
      .state('moduleones.view', {
        url: '/:moduleoneId',
        templateUrl: 'modules/moduleones/client/views/view-moduleone.client.view.html',
        controller: 'ModuleonesController',
        controllerAs: 'vm',
        resolve: {
          moduleoneResolve: getModuleone
        },
        data:{
          pageTitle: 'Moduleone {{ articleResolve.name }}'
        }
      });
  }

  getModuleone.$inject = ['$stateParams', 'ModuleonesService'];

  function getModuleone($stateParams, ModuleonesService) {
    return ModuleonesService.get({
      moduleoneId: $stateParams.moduleoneId
    }).$promise;
  }

  newModuleone.$inject = ['ModuleonesService'];

  function newModuleone(ModuleonesService) {
    return new ModuleonesService();
  }
})();
