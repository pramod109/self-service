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

        this.changePassword = function() {
            return $resource(BASE_URL + '/self/user');
        }
    }

})();