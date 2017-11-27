(function () {
    'use strict';

    angular.module('selfService')
        .controller('ForgotPwdCtrl', ['$scope', '$state', '$mdToast', 'AuthService', 'AccountService','ForgotService', ForgotPwdCtrl]);

    /**
     * @module ForgotPwdCtrl
     * @description
     * Handles Forgot Password
     */
    function ForgotPwdCtrl($scope, $state, $mdToast, AuthService, AccountService,ForgotService) {
        var vm = this;
        vm.submit = submit;

        function submit() {
            var data1 = {};
            data1.email=vm.form.email;

            console.log(data1);

            var data = Object.assign({}, data1);

            ForgotService.forgotpassword().save(data).$promise
            .then(function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content("Reset Successful")
                    .hideDelay(2000)
                    .position('top right')
                );
            }, function(){
                $mdToast.show(
                    $mdToast.simple()
                    .content("Error in Reset")
                    .hideDelay(2000)
                    .position('top right')
                );
            });
            
        }

    }

})();
