(function () {
    'use strict';

    angular.module('selfService')
        .controller('ConfirmregisterCtrl', ['$http','$scope', '$state', '$mdToast', 'AuthService', 'AccountService','ConfirmRegisterService', ConfirmregisterCtrl]);

    /**
     * @module ConfirmegisterCtrl
     * @description
     * Confirms registration of already registered Users
     */
    function ConfirmregisterCtrl($http,$scope, $state, $mdToast, AuthService, AccountService,ConfirmRegisterService) {
        var vm=this;
        vm.submit=submit;


        function submit() {
            var data1={}
            data1.requestId=vm.form.requestId;
            data1.authenticationToken=vm.form.authenticationToken;
            console.log(data1);

            var data = Object.assign({}, data1);
            ConfirmRegisterService.confirmregister().save(data).$promise
                .then(function() {
                    $mdToast.show(
                        $mdToast.simple()
                        .content("Registration Successful")
                        .hideDelay(2000)
                        .position('top right')
                    );
            }, function(){
                $mdToast.show(
                    $mdToast.simple()
                        .content("Error in Registration")
                        .hideDelay(2000)
                        .position('top right')
                );
            });

        }
    }

})();
