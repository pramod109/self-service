(function () {
    'use strict';
    angular.module('selfService')
        .service('TransactionService', ['$resource', 'BASE_URL', TransactionService]);

    function TransactionService($resource, BASE_URL) {

        this.getClientTransactions = function (clientId) {
            return $resource(BASE_URL + '/self/clients/' + clientId + '/transactions')
        }

    }

})();
