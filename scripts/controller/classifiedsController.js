(function() {
  'use strict';

  angular
    .module('ngClassifieds')
    .controller('classifiedsCtrl', function($scope, classifiedsFactory, $mdSidenav, $mdToast) {
      classifiedsFactory.getClassifieds().then(function(classifieds) {
        $scope.classifieds = classifieds.data;
      });

      var contact = {
        name: 'Alex Lexville',
        email: 'lexville@kingdom.com',
        phone: '(555) 555-5555'
      }
      $scope.openSidebar = function() {
        $mdSidenav('left').open();
      }

      $scope.closeSidebar = function() {
        $mdSidenav('left').close();
      }

      $scope.saveClassified = function(product) {
        if (product) {
          product.contact = contact;
          $scope.classifieds.push(product);
          $scope.product = {};
          $scope.closeSidebar();
          showToast('Classified Added!!');
        }
      }

      $scope.editClassified = function(classified) {
        $scope.editing = true;
        $scope.openSidebar();
        $scope.product = classified;
      }

      $scope.saveEdit = function() {
        $scope.editing = false;
        $scope.product = {};
        $scope.closeSidebar();
        showToast('Classified Edited!!');
      }

      function showToast(message) {
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('bottom right')
            .hideDelay(3000)
        );
      }
    });
})();