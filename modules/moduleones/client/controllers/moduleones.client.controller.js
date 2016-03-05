(function () {
  'use strict';

  // Moduleones controller
  angular
    .module('moduleones')
    .controller('ModuleonesController', ModuleonesController);

  ModuleonesController.$inject = ['$scope', '$state', 'Authentication', 'moduleoneResolve'];

  function ModuleonesController ($scope, $state, Authentication, moduleone) {
    var vm = this;

    vm.authentication = Authentication;
    vm.moduleone = moduleone;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Moduleone
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.moduleone.$remove($state.go('moduleones.list'));
      }
    }

    // Save Moduleone
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.moduleoneForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.moduleone._id) {
        vm.moduleone.$update(successCallback, errorCallback);
      } else {
        vm.moduleone.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('moduleones.view', {
          moduleoneId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
