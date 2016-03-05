(function () {
  'use strict';

  angular
    .module('moduleones')
    .controller('ModuleonesListController', ModuleonesListController);

  ModuleonesListController.$inject = ['ModuleonesService'];

  function ModuleonesListController(ModuleonesService) {
    var vm = this;

    vm.moduleones = ModuleonesService.query();
  }
})();
