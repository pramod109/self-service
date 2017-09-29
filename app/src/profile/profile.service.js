(function() {
    'use strict';

    angular.module('selfService')
        .service('ProfileService', ['$resource', 'BASE_URL', ProfileService]);

    /**
     * @module ProfileService
     * @description
     * Service required to Change Password
     */
    function ProfileService($resource, BASE_URL) {

        //var URL='https://localhost:8443/fineract-provider/api/v1/self/user?tenantIdentifier=default'
        this.changePassword = function() {
            return $resource(BASE_URL + '/self/user?tenantIdentifier=default');
        }
    }

})();