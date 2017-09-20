(function () {
    'use strict';

    angular.module('selfService')
        .controller('TPTCtrl', ['$scope', '$rootScope', '$filter', '$mdDialog', '$mdDateLocale', '$mdToast', 'AccountTransferService', TPTCtrl]);

    /**
     * @module TPTCtrl
     * @description
     * Third party transfer controller
     */
    function TPTCtrl($scope, $rootScope, $filter, $mdDialog, $mdDateLocale, $mdToast, AccountTransferService) {

        var vm = this;

        //pramod109
        vm.reRoute = reRoute;

        /**
         * @name fromAccountOptions
         * @type {Array}
         * @description From account options to do a third party transfer
         */
        vm.fromAccountOptions = [];

        /**
         * @name toAccountOptions
         * @type {Array}
         * @description To account options to do a third party transfer
         */
        vm.toAccountOptions = [];

        vm.transferFormData = getTransferFormDataObj()
        vm.getTransferTemplate = getTransferTemplate();

        vm.submit = submit;

        // Format date for the DatePicker
        $mdDateLocale.formatDate = function (date) {
            return $filter('date')(date, "dd-MM-yyyy");
        };

        /**
         * @method getTransferFormDataObj
         * @returns {{transferDate: Date}}
         * @description Gets the transferFormObj to be sent to server to do a transfer
         */
        function getTransferFormDataObj() {
            return {
                transferDate: new Date()
            };
        }

        /**
         * @method getTransferTemplate
         * @description Returns template from the server for the form to do a third party transfer
         */
        function getTransferTemplate() {
            AccountTransferService.getTransferTemplate().get({type: "tpt"},function (data) {
                vm.fromAccountOptions = data.fromAccountOptions;
                vm.toAccountOptions = data.toAccountOptions;
            });
        }

        /**
         * @method clearForm
         * @description To clear form
         */
        function clearForm() {
            vm.transferFormData = getTransferFormDataObj();
            $scope.transferForm.$setPristine();
            $scope.transferForm.$setUntouched();
        }

        /**
         * @method submit
         * @param ev
         * @description To send form data to perform tpt to the server
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

        //pramod109
        //Method to route 'Cancel' button to 'Dashboard'
        function reRoute(msg) {
            console.log('reRoute Called');
            $rootScope.$broadcast('dashboard', 'Dashboard');
        }


    }
})();