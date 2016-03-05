(function () {
  'use strict';

  describe('Moduleones Route Tests', function () {
    // Initialize global variables
    var $scope,
      ModuleonesService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ModuleonesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ModuleonesService = _ModuleonesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('moduleones');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/moduleones');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ModuleonesController,
          mockModuleone;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('moduleones.view');
          $templateCache.put('modules/moduleones/client/views/view-moduleone.client.view.html', '');

          // create mock Moduleone
          mockModuleone = new ModuleonesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Moduleone Name'
          });

          //Initialize Controller
          ModuleonesController = $controller('ModuleonesController as vm', {
            $scope: $scope,
            moduleoneResolve: mockModuleone
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:moduleoneId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.moduleoneResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            moduleoneId: 1
          })).toEqual('/moduleones/1');
        }));

        it('should attach an Moduleone to the controller scope', function () {
          expect($scope.vm.moduleone._id).toBe(mockModuleone._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/moduleones/client/views/view-moduleone.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ModuleonesController,
          mockModuleone;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('moduleones.create');
          $templateCache.put('modules/moduleones/client/views/form-moduleone.client.view.html', '');

          // create mock Moduleone
          mockModuleone = new ModuleonesService();

          //Initialize Controller
          ModuleonesController = $controller('ModuleonesController as vm', {
            $scope: $scope,
            moduleoneResolve: mockModuleone
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.moduleoneResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/moduleones/create');
        }));

        it('should attach an Moduleone to the controller scope', function () {
          expect($scope.vm.moduleone._id).toBe(mockModuleone._id);
          expect($scope.vm.moduleone._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/moduleones/client/views/form-moduleone.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ModuleonesController,
          mockModuleone;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('moduleones.edit');
          $templateCache.put('modules/moduleones/client/views/form-moduleone.client.view.html', '');

          // create mock Moduleone
          mockModuleone = new ModuleonesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Moduleone Name'
          });

          //Initialize Controller
          ModuleonesController = $controller('ModuleonesController as vm', {
            $scope: $scope,
            moduleoneResolve: mockModuleone
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:moduleoneId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.moduleoneResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            moduleoneId: 1
          })).toEqual('/moduleones/1/edit');
        }));

        it('should attach an Moduleone to the controller scope', function () {
          expect($scope.vm.moduleone._id).toBe(mockModuleone._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/moduleones/client/views/form-moduleone.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
