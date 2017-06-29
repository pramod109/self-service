(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesListCtrl', ['$scope', '$rootScope', '$stateParams', 'BeneficiariesService', BeneficiariesListCtrl]);

    function BeneficiariesListCtrl($scope, $rootScope, $stateParams, BeneficiariesService) {

        var vm = this;
        vm.loadingBeneficiaries = true;
        vm.beneficiaries = [];
        vm.beneficiariesFilter = "";
        vm.page = 1;
        vm.query = {
            limit: 5,
            offset: 0
        }

        vm.getBeneficiaries = getBeneficiaries();

        function getBeneficiaries() {
            BeneficiariesService.getBeneficiaries().query().$promise.then(function(data) {
                vm.beneficiaries = data;
                vm.loadingBeneficiaries = false;
            });
        }
    }
})();