(function () {
    'use strict';
    //@todo Move this service to the common folder
    angular.module('selfService')
        .service('SavingsAccountService', ['$resource', 'BASE_URL', SavingsAccountService]);

    function SavingsAccountService($resource, BASE_URL) {

        this.savingsAccount = function () {
            return $resource(BASE_URL + '/self/savingsaccounts/:id',{id: '@id'});
        }
    }

})();
