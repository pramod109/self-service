(function () {
    'use strict';
    //@todo Move this service to the common folder
    angular.module('selfService')
        .service('LoanAccountService', ['$resource', 'BASE_URL', LoanAccountService]);

    function LoanAccountService($resource, BASE_URL) {

        this.loanAccount = function () {
            return $resource(BASE_URL + '/self/loans/:id',{id: '@id'});
        }
    }

})();
