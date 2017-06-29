(function () {
    'use strict';
    //@todo Move this service to the common folder
    angular.module('selfService')
        .service('BeneficiariesService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', BeneficiariesService]);

    function BeneficiariesService($q, $http, $rootScope, $resource, BASE_URL) {

        this.getBeneficiaries = function () {
            return $resource(BASE_URL + '/self/beneficiaries/tpt');
        };
    }

})();
