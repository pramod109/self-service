(function() {
    'use strict';

    angular.module('selfService')
        .service('ConfirmRegisterService', ['$resource', 'BASE_URL', ConfirmRegisterService]);

    /**
     * @module ConfirmRegisterService
     * @description
     * Service required for Conformation of Registration
     */
    function ConfirmRegisterService($resource, BASE_URL) {

        this.confirmregister = function() {
            return $resource(BASE_URL + '/self/registration/user');
        }

        
    }

})();