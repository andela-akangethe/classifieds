(function() {
  'use strict';

  angular
    .module('ngClassifieds')
    .controller('classifiedsCtrl', function($scope, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
      classifiedsFactory.getClassifieds().then(function(classifieds) {
        $scope.classifieds = classifieds.data;
        $scope.categories = getCategories($scope.classifieds);
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

      $scope.deleteClassified = function(event, classified) {
        var confirm = $mdDialog.confirm()
          .title('Are you sure yo want to delete ' + classified.title + ' ?')
          .ok('Yes Delete')
          .cancel('No')
          .targetEvent(event);
        $mdDialog.show(confirm).then(function() {
          var index = $scope.classifieds.indexOf(classified);
          $scope.classifieds.splice(index, 1);
          }, function() {

        });
      }

      function showToast(message) {
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('bottom right')
            .hideDelay(3000)
        );
      }

      function getCategories(classifieds) {
        var categories = [];

        angular.forEach(classifieds, function(item) {
          angular.forEach(item.categories, function(category) {
            categories.push(category);
          });
        });

        return _.uniq(categories);
      }
    });
})();