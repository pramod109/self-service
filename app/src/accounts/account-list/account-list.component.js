(function () {
    'use strict';

    angular.module('selfService')
        .controller('AccountCtrl', ['$state', 'AccountService', AccountCtrl]);

    /**
     * @module AccountCtrl
     * @description
     * Handles all different types of account of the user
     * Shows Loan, Savings and Share accounts of the client
     */
    function AccountCtrl($state, AccountService) {

        var vm = this;

        /**
         * @name loanAccounts
         * @description To Store the loan accounts of user
         * @type {Array}
         */
        vm.loanAccounts = [];

        /**
         * @name savingsAccounts
         * @description To store Savings account of user
         * @type {Array}
         */
        vm.savingsAccounts = [];

        /**
         * @name shareAccounts
         * @description To store share accounts of user
         * @type {Array}
         */
        vm.shareAccounts = [];

        /**
         * @name loadingAccountInfo
         * @description flag to store whether data loaded from API or not
         * @type {boolean}
         */
        vm.loadingAccountInfo = true;

        /**
         * @name query
         * @description The Datatable needs a query object to query data to the server and filter
         * @type {{limit: number, offset: number}}
         */
        vm.query = {
            limit: 5,
            offset: 1
        };

        /**
         * @name clientId
         * @description Store Client Id of the user
         * @type {number}
         */
        vm.clientId = getClient();

        vm.getAccounts = getAccounts;
        vm.onPaginate = onPaginate;
        vm.onReorder = onReorder;
        vm.routeTo = routeTo;

        /**
         * @method getClient
         * @description Get Client from account service and then fetch accounts
         */
        function getClient() {
            AccountService.getClientId().then(function (clientId) {
                vm.clientId = clientId;
                getAccounts(clientId);
            });
        }

        /**
         * @method getAccounts
         * @description Get All accounts (Loan, Savings and share) from server and disable the loading
         * @param clientId {number} Client Id
         */
        function getAccounts(clientId) {
            AccountService.getAllAccounts(clientId).get().$promise.then(function (res) {
                if(res.loanAccounts != null && res.loanAccounts != undefined) {
                    vm.loanAccounts = res.loanAccounts;
                }
                //vm.loanAccounts = res.loanAccounts;
                
                if(res.savingsAccounts != null && res.savingsAccounts != undefined) {
                    vm.savingsAccounts = res.savingsAccounts;
                }
                //vm.savingsAccounts = res.savingsAccounts;

                if(res.shareAccounts != null && res.shareAccounts != undefined) {
                    vm.shareAccounts = res.shareAccounts;
                }
                //vm.shareAccounts = res.shareAccounts;
                
                vm.loadingAccountInfo = false;
            }).catch(angular.noop);
        }

        /**
         * @method onPaginate
         * @description When the page is updated of the account list table query data again
         * @param offset {number} What offset should the record be fetched
         * @param limit {number} Limit the number of record to fetch
         */
        function onPaginate(offset, limit) {
            getAccounts(angular.extend({}, vm.query, {offset: offset, limit: limit}));
        }

        /**
         * @method onReorder
         * @description Handle table updates when its sorted using column headers
         * @param order
         */
        function onReorder(order) {
            getAccounts(angular.extend({}, vm.query, {order: order}));
        }

        /**
         * @method routeTo
         * @description When account is clicked handle routing to take user to account detail page
         * @param accountType {string} type of account clicked (loan, savings, charge)
         * @param id {number} id of the clicked account
         */
        function routeTo(accountType, id) {
            var routingSlug = 'viewloanaccount';
            if ('savings' == accountType) {
                routingSlug = 'viewsavingsaccount';
            } else if ('loan' == accountType) {
                routingSlug = 'viewloanaccount';
            } else {
                routingSlug = 'viewshareaccount';
            }
            $state.go('app.'+routingSlug, {id: id});
        }

    }

})();
