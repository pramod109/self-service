(function(){
    'use strict';

    angular.module('selfService')
        .controller('ReviewTPTDialogCtrl', ['$filter', '$mdDialog', '$mdToast', 'transferFormData', 'AccountTransferService', ReviewTPTDialogCtrl]);

    /**
     * @module ReviewTPTDialogCtrl
     * @description
     * Review Third party transfer confirm dialog
     */
    function ReviewTPTDialogCtrl($filter, $mdDialog, $mdToast, transferFormData, AccountTransferService) {

        var vm = this;

        /**
         * @name transferFormData
         * @type {object}
         * @description To get the form data to be sent to the server
         */
        vm.transferFormData = Object.assign({}, transferFormData);

        vm.cancel = cancel;
        vm.transfer = transfer;

        vm.transferFormData.transferDate = $filter('DateFormat')(transferFormData.transferDate);

        /**
         * @method cancel
         * @description To cancel the dialog and close it
         */
        function cancel() {
            $mdDialog.cancel();
        }

        /**
         * @method transfer
         * @description Do transfer send data to server
         */
        function transfer() {
            // Transforming Request Data
            var transferData = {
                fromOfficeId: vm.transferFormData.fromAccount.officeId,
                fromClientId: vm.transferFormData.fromAccount.clientId,
                fromAccountType: vm.transferFormData.fromAccount.accountType.id,
                fromAccountId: vm.transferFormData.fromAccount.accountId,
                toOfficeId: vm.transferFormData.toAccount.officeId,
                toClientId: vm.transferFormData.toAccount.clientId,
                toAccountType: vm.transferFormData.toAccount.accountType.id,
                toAccountId: vm.transferFormData.toAccount.accountId,
                dateFormat: "dd MMMM yyyy",
                locale: "en",
                transferDate: vm.transferFormData.transferDate,
                transferAmount: "" + vm.transferFormData.amount,
                transferDescription: vm.transferFormData.remark
            }
            // Sending
            AccountTransferService.transfer().save({type: "tpt"},transferData).$promise.then(function () {
               $mdDialog.hide("success");
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Transfer Completed Successfully')
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
                        .textContent('Error in Completing Transfer: ' + errors)
                        .position('top right')
                );
                $mdDialog.hide("error");

            });

        }
    }
})();