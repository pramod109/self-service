(function () {
    'use strict';

    angular.module('selfService')
        .controller('AccountTransferCtrl', ['$scope', '$filter', '$mdDialog', '$mdDateLocale', '$mdToast', 'AccountTransferService', AccountTransferCtrl]);

    /**
     * @module AccountTransferCtrl
     * @description
     * Account Transfer Controller
     */
    function AccountTransferCtrl($scope, $filter, $mdDialog, $mdDateLocale, $mdToast, AccountTransferService) {

        var vm = this;

        /**
         * @name fromAccountOptions
         * @type {Array}
         * @description From account options to do transfer from
         */
        vm.fromAccountOptions = [];

        /**
         * @name toAccountOptions
         * @type {Array}
         * @description Perform transfer to what account, to acount options
         */
        vm.toAccountOptions = [];

        vm.transferFormData = getTransferFormDataObj();
        vm.getTransferTemplate = getTransferTemplate();

        vm.submit = submit;

        // FORMAT THE DATE FOR THE DATEPICKER
        $mdDateLocale.formatDate = function (date) {
            return $filter('date')(date, "dd-MM-yyyy");
        };

        /**
         * @method getTransferFormDataObj
         * @returns {{transferDate: Date}}
         * @description gets the transfer form data object to be sent to the server
         */
        function getTransferFormDataObj() {
            return {
                transferDate: new Date()
            };
        }

        /**
         * @method getTransferTemplate
         * @description Gets the template from the server to do a transfer
         */
        function getTransferTemplate() {
            AccountTransferService.getTransferTemplate().get(function (data) {
                vm.fromAccountOptions = data.fromAccountOptions;
                vm.toAccountOptions = data.toAccountOptions;
            });
        }

        /**
         * @method clearForm
         * @description clears the form
         */
        function clearForm() {
            $scope.transferForm.$setPristine();
            vm.transferFormData = getTransferFormDataObj();
        }

        /**
         * @method submit
         * @param ev
         * @description Sends data to server and performs transfer
         */
        function submit(ev) {
            $mdDialog.show({
                controller: 'ReviewTransferDialogCtrl',
                controllerAs: 'vm',
                templateUrl: 'src/transfers/review-transfer-dialog/review-transfer-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {transferFormData: vm.transferFormData},
                clickOutsideToClose: true
            }).then(function (result) {
                if(result === "success"){
                    clearForm();
                }
            }, function () {
                clearForm();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Transfer Cancelled')
                        .position('top right')
                );
            });
        }


    }
})();