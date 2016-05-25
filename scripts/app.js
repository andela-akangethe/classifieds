(function() {
  'use strict';

  angular
    .module('ngClassifieds', ['ngMaterial', 'ui.router'])
    .config(function($mdThemingProvider, $stateProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');

      $stateProvider
        .state('state', {
          url: '/stateone',
          template: '<h1>State One </h1>'
        })
        .state('statetwo', {
          url: '/statetwo',
          template: '<h1>State Two  </h1>'
        })
    });

})();