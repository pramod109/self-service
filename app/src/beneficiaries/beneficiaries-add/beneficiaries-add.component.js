(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesAddCtrl', ['$scope', '$mdToast', 'BeneficiariesService', BeneficiariesAddCtrl]);

    function BeneficiariesAddCtrl($scope, $mdToast, BeneficiariesService) {

        var vm = this;
        vm.addBeneficiaryFormData = {
            "locale": "en_GB"
        };
        vm.accountTypeOptions = [];
        vm.getBeneficiaryTemplate = getBeneficiaryTemplate();
        vm.clearForm = clearForm;
        vm.submit = submit;

        function getBeneficiaryTemplate() {
            BeneficiariesService.template().get().$promise.then(function (data) {
                vm.accountTypeOptions = data.accountTypeOptions;
            })
        }

        function clearForm() {
            $scope.addBeneficiaryForm.$setPristine();
            vm.addBeneficiaryFormData = {
                "locale": "en_GB"
            };
        }

        function submit() {
            BeneficiariesService.beneficiary().save(vm.addBeneficiaryFormData).$promise.then(function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Beneficiary Added Successfully')
                        .position('top right')
                );
                vm.clearForm();
            }, function (resp) {
                var errors = '';
                if(resp.data){
                    errors = resp.data.errors.map(function (data) {
                        return data.defaultUserMessage;
                    });
                    errors.join(' ');
                }
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error in Adding Beneficiary: ' + errors)
                        .position('top right')
                );

            });
        }
    }
})();