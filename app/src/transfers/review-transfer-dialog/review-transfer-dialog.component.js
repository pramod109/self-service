(function(){
    'use strict';

    angular.module('selfService')
        .controller('ReviewTransferDialogCtrl', ['$filter', '$mdDialog', '$mdToast', 'transferFormData', 'AccountTransferService', ReviewTransferDialogCtrl]);

    /**
     * @module ReviewTransferDialogCtrl
     * @description
     * Review transfer confirm dialog
     */
    function ReviewTransferDialogCtrl($filter, $mdDialog, $mdToast, transferFormData, AccountTransferService) {

        var vm = this;

        /**
         * @name transferFormData
         * @type {object}
         * @description stores the form data to be sent to server for doing third party transfer
         */
        vm.transferFormData = Object.assign({}, transferFormData);

        vm.cancel = cancel;
        vm.transfer = transfer;

        // Format date for the DatePicker
        vm.transferFormData.transferDate = $filter('DateFormat')(transferFormData.transferDate);

        /**
         * @method cancel
         * @description to cancel the dialog and the transfer
         */
        function cancel() {
            $mdDialog.cancel();
        }

        /**
         * @method transfer
         * @description to send form data to the server to perform transfer
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
            AccountTransferService.transfer().save(transferData).$promise.then(function () {
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