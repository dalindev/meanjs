(function () {
  'use strict';

  angular
    .module('moduleones')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Moduleones',
      state: 'moduleones',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'moduleones', {
      title: 'List Moduleones',
      state: 'moduleones.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'moduleones', {
      title: 'Create Moduleone',
      state: 'moduleones.create',
      roles: ['user']
    });
  }
})();
