(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesListCtrl', ['$state', '$mdDialog', '$mdToast', 'BeneficiariesService', BeneficiariesListCtrl]);

    /**
     * @module BeneficiariesListCtrl
     * @description
     * Shows list of beneficiary in the self service account
     */
    function BeneficiariesListCtrl($state, $mdDialog, $mdToast, BeneficiariesService) {

        var vm = this;

        /**
         * @name loadingBeneficiaries
         * @type {boolean}
         * @description Flag to check if beneficiaries have been loaded
         */
        vm.loadingBeneficiaries = true;

        /**
         * @name beneficiaries
         * @type {Array}
         * @description Stores Beneficiaries returned from the serve
         */
        vm.beneficiaries = [];

        /**
         * @name beneficiariesFilter
         * @type {string}
         * @description To store the search input filter
         */
        vm.beneficiariesFilter = "";

        /**
         * @name page
         * @type {number}
         * @description To store the current page number
         */
        vm.page = 1;

        /**
         * @name query
         * @description The Datatable needs a query object to query data to the server and filter
         * @type {{limit: number, offset: number}}
         */
        vm.query = {
            limit: 5,
            offset: 0
        }

        vm.getBeneficiaries = getBeneficiaries();
        vm.addBeneficiary = addBeneficiary;
        vm.goToEdit = goToEdit;
        vm.deleteConfirm = deleteConfirm;

        /**
         * @method getBeneficiaries
         * @description To get beneficiaries from the server
         */
        function getBeneficiaries() {
            BeneficiariesService.getBeneficiaries().query().$promise.then(function(data) {
                vm.beneficiaries = data;
                vm.loadingBeneficiaries = false;
            });
        }

        /**
         * @method addBeneficiary
         * @description To take user the add beneficiary form
         */
        function addBeneficiary() {
            $state.go('app.addbeneficiary');
        }

        /**
         * @method goToEdit
         * @param beneficiary
         * @description To take user to the edit beneficiary form
         */
        function goToEdit(beneficiary) {
            $state.go('app.editbeneficiary',{
                id: beneficiary.id,
                data: beneficiary
            });
        }

        /**
         * @method deleteConfirm
         * @param ev
         * @param beneficiary
         * @description Show confirm dialog before deleting user
         */
        function deleteConfirm(ev, beneficiary) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete?')
                .textContent('This beneficiary will be removed from your account')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Delete!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
               BeneficiariesService.beneficiary().delete({
                   id: beneficiary.id
               }, function() {
                   $mdToast.show(
                       $mdToast.simple()
                           .textContent('Beneficiary Deleted Successfully')
                           .position('top right')
                   );
                   vm.beneficiaries = vm.beneficiaries.filter(function (benef) {
                       return benef.id !== beneficiary.id
                   });
               });
            }, function() {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error in Deleting Beneficiary')
                        .position('top right')
                );
            });
        }
    }
})();