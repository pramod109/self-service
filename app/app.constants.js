(function () {
    'use strict';

    angular.module('selfService')

        .constant("BASE_URL", "https://52.50.55.214/fineract-provider/api/v1")
        //https://52.50.55.214:8443/fineract-provider/api/v1 apache server
        //"https://demo.openmf.org/fineract-provider/api/v1" mifos demo server
        //https://192.168.0.19:8443/fineract-provider/api/v1 local server
        .constant("TENANT_IDENTIFIER", "default")

        .constant('AUTH_EVENTS', {
            updateUser: 'update-user',
            notAuthorized: 'auth-not-authorized',
            notAuthenticated: 'auth-not-authenticated'
        })

        .constant('USER_ROLES', {
            user: 'USER'
        });

})();