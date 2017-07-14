(function(){
    'use strict';

    angular.module('selfService')
        .controller('ChargesCtrl', ['AccountService', 'ChargesService', ChargesCtrl]);

    /**
     * @module ChargesCtrl
     * @description
     * Charges Controller
     */
    function ChargesCtrl(AccountService, ChargesService) {

        var vm = this;

        /**
         * @name loadingCharges
         * @type {boolean}
         * @description Flag to check if data loaded from the server
         */
        vm.loadingCharges = true;

        /**
         * @name charges
         * @type {object}
         * @description Stores the charges returned from the server
         */
        vm.charges = {};

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
         * @description Queries the server for paginated data
         */
        vm.query = {
            limit: 5,
            offset: 0
        }

        vm.getCharges = getCharges(vm.query);

        /**
         * @method getCharges
         * @param query
         * @description Gets charges from the server
         */
        function getCharges(query){
            AccountService.getClientId().then(function (clientId){
                ChargesService.getClientCharges(clientId).get(query).$promise.then(function (res) {
                    vm.loadingCharges = false;
                    vm.charges = res;
                });
            });
        }

        /**
         * @method onPaginate
         * @param offset
         * @param limit
         * @description When the page is paginated handles returning data from the server
         */
        function onPaginate(offset,limit) {
            getCharges(angular.extend({}, vm.query, {offset: (offset - 1) * limit, limit: limit}));
        }

    }
})();