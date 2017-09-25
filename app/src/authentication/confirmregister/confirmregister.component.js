(function () {
    'use strict';

    angular.module('selfService')
        .controller('ConfirmregisterCtrl', ['$http','$scope', '$state', '$mdToast', 'AuthService', 'AccountService', ConfirmregisterCtrl]);

    /**
     * @module ConfirmegisterCtrl
     * @description
     * Confirms registration of already registered Users
     */
    function ConfirmregisterCtrl($http,$scope, $state, $mdToast, AuthService, AccountService) {
        var vm=this;
       

        

    }

})();
