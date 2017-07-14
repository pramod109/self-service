(function () {
    'use strict';
    angular.module('selfService')
        .service('AccountService', ['$http', '$resource', 'BASE_URL', 'storageService', AccountService]);

    /**
     * @module AccountService
     * @description
     * Service required for managing Accounts
     */
    function AccountService($http, $resource, BASE_URL, storageService) {

        this.getClients = function () {
            return $resource(BASE_URL + '/self/clients/');
        };

        this.getAllAccounts = function (clientId) {//@todo rename this getClientAccounts
            return $resource(BASE_URL + '/self/clients/' + clientId + '/accounts');
        };

        this.getClient = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id);
        }

        this.getClientImage = function (id) {
            return $http({
                method: 'GET',
                url: BASE_URL + '/self/clients/' + id + '/images'
            });
        }

        this.getClientCharges = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id + '/charges?pendingPayment=true');
        }

        this.getClientAccounts = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id + '/accounts');
        }

        this.getLoanAccount = function (id) {
            return $resource(BASE_URL + '/self/loans/' + id);
        }

        this.setClientId = function (id) {
            storageService.setObject('client_id', id);
        }

        this.getClientId = function () {
            return storageService.getItem('client_id');
        }

    }

})();
