(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesEditCtrl', ['$scope', '$stateParams', '$mdToast', 'BeneficiariesService', BeneficiariesEditCtrl]);

    /**
     * @module BeneficiariesEditCtrl
     * @description
     * Handles Updation of beneficiary in the self service account
     */
    function BeneficiariesEditCtrl($scope, $stateParams, $mdToast, BeneficiariesService) {

        var vm = this;

        /**
         * @name editBeneficiaryFormData
         * @type {object}
         * @description Stores beneficiary data to be edited and sent to server
         */
        vm.editBeneficiaryFormData = {
            "locale": "en_GB"
        };

        /**
         * @name beneficiary
         * @description Stores the beneficiary data
         */
        vm.beneficiary = $stateParams.data;

        /**
         * @name accountTypeOptions
         * @type {Array}
         * @description Stores the type of account options available [ Savings, Loan ]
         */
        vm.accountTypeOptions = [];

        vm.getBeneficiaryTemplate = getBeneficiaryTemplate();
        vm.clearForm = clearForm;
        vm.submit = submit;

        /**
         * @method getBeneficiaryTemplate
         * @description Gets the beneficiary template from server to be filled in by the client
         */
        function getBeneficiaryTemplate() {
            BeneficiariesService.template().get().$promise.then(function (data) {
                vm.accountTypeOptions = data.accountTypeOptions;
            });

            if(vm.beneficiary !== null) {
                vm.editBeneficiaryFormData.accountType = vm.beneficiary.accountType.id;
                vm.editBeneficiaryFormData.accountNumber = vm.beneficiary.accountNumber;
                vm.editBeneficiaryFormData.officeName = vm.beneficiary.officeName;
                vm.editBeneficiaryFormData.transferLimit = vm.beneficiary.transferLimit;
                vm.editBeneficiaryFormData.name = vm.beneficiary.name;
            }
        }

        /**
         * @method clearForm
         * @description Clears Beneficiary Form
         */
        function clearForm() {
            $scope.editBeneficiaryForm.$setPristine();
            vm.editBeneficiaryFormData = {
                "locale": "en_GB"
            };
        }

        /**
         * @method submit
         * @description Handles submit of the edit beneficiary form
         */
        function submit() {
            var data = {
                name: vm.editBeneficiaryFormData.name,
                transferLimit: vm.editBeneficiaryFormData.transferLimit
            }

            BeneficiariesService.beneficiary().update({id: vm.beneficiary.id}, data).$promise.then(function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Beneficiary Updated Successfully')
                        .position('top right')
                );
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