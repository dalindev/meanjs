//Moduleones service used to communicate Moduleones REST endpoints
(function () {
  'use strict';

  angular
    .module('moduleones')
    .factory('ModuleonesService', ModuleonesService);

  ModuleonesService.$inject = ['$resource'];

  function ModuleonesService($resource) {
    return $resource('api/moduleones/:moduleoneId', {
      moduleoneId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
