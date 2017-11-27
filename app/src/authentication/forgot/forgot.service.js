(function() {
    'use strict';

    angular.module('selfService')
        .service('ForgotService', ['$resource', 'BASE_URL', ForgotService]);

    /**
     * @module ForgotService
     * @description
     * Service required for Forgot password.
     */
    function ForgotService($resource, BASE_URL) {

        this.forgotpassword = function() {
            //return $resource(BASE_URL + '/self/registration/user');
        }

        
    }

})();