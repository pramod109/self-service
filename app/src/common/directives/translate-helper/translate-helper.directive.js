(function () {
    'use strict';

    angular.module('selfService')
        .directive('translateHelper', translateHelper);

    function translateHelper() {
        var directive = {
            restrict: 'E',
            controller: 'translateHelperCtrl',
            controllerAs: 'vm',
            scope: {},
            templateUrl: 'src/common/directives/translate-helper/translate-helper.html'
        }

        return directive;
    }

})();
