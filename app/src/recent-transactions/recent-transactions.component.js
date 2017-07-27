(function(){
    'use strict';

    angular.module('selfService')
        .controller('RecentTransactionCtrl', ['AccountService', 'TransactionService', RecentTransactionCtrl]);

    /**
     * @module RecentTransactionCtrl
     * @description
     * Gets the recent transactions of the client
     */
    function RecentTransactionCtrl(AccountService, TransactionService) {

        var vm = this;

        /**
         * @name loadingTransactions
         * @type {boolean}
         * @description Flag to keep check if transactions have been loaded
         */
        vm.loadingTransactions 	= true;

        /**
         * @name recenttransactions
         * @type {object}
         * @description keeps the recent transactions returned from the server
         */
        vm.recenttransactions = {};
        vm.onPaginate = onPaginate;

        /**
         * @name page
         * @type {number}
         * @description keeps track of the page you're on
         */
        vm.page = 1;

        /**
         * @name query
         * @type {{limit: number, offset: number}}
         * @description Queries data from the server with the parameters
         */
        vm.query = {
            limit: 5,
            offset: 0
        }

        vm.getTransactions = getTransactions(vm.query);

        /**
         * @method getTransactions
         * @param query
         * @description Gets Transactions from the server
         */
        function getTransactions(query){
            AccountService.getClientId().then(function (clientId){
                TransactionService.getClientTransactions(clientId).get(query).$promise.then(function (res) {
                    vm.loadingTransactions = false;
                    vm.recenttransactions = res;
                });
            });
        }

        /**
         * @method onPaginate
         * @param offset
         * @param limit
         * @description Query server according to filters set for recent transactions
         */
        function onPaginate(offset,limit) {
            getTransactions(angular.extend({}, vm.query, {offset: (offset - 1) * limit, limit: limit}));
        }

    }
})();