(function() {
    'use strict';

    angular.module('selfService')
        .service('RegisterService', ['$resource', 'BASE_URL', RegisterService]);

    /**
     * @module RegisterService
     * @description
     * Service required for Registration
     */
    function RegisterService($resource, BASE_URL) {

        this.register = function() {
            return $resource(BASE_URL + '/self/registration');
        }

        // this.loan = function() {
        //     return $resource(BASE_URL + '/self/loans');
        // }
    }

})();