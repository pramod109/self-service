(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesAddCtrl', ['$scope', '$mdToast', 'BeneficiariesService', BeneficiariesAddCtrl]);

    /**
     * @module BeneficiariesAddCtrl
     * @description
     * Handles Adding beneficiary to the self service account
     */
    function BeneficiariesAddCtrl($scope, $mdToast, BeneficiariesService) {

        var vm = this;

        /**
         * @name addBeneficiaryFormData
         * @type {object}
         * @description To send beneficiary data to server to add him to client
         */
        vm.addBeneficiaryFormData = {
            "locale": "en_GB"
        };

        /**
         * @name accountTypeOptions
         * @type {Array}
         * @description The type of account options of beneficiaries [savings, loan]
         */
        vm.accountTypeOptions = [];

        vm.getBeneficiaryTemplate = getBeneficiaryTemplate();

        vm.clearForm = clearForm;
        vm.submit = submit;

        /**
         * @method getBeneficiary Template
         * @description To get beneficiary template to create
         */
        function getBeneficiaryTemplate() {
            BeneficiariesService.template().get().$promise.then(function (data) {
                vm.accountTypeOptions = data.accountTypeOptions;
            })
        }

        /**
         * @method clearForm
         * @description Function to clear form
         */
        function clearForm() {
            vm.addBeneficiaryFormData = {
                "locale": "en_GB"
            };
            $scope.addBeneficiaryForm.$setPristine();
            $scope.addBeneficiaryForm.$setUntouched();
        }

        /**
         * @method submit
         * @description Method to submit beneficiary to the server
         */
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