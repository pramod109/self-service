(function () {
    'use strict';

    angular.module('selfService')
        .controller('RegisterCtrl', ['$http','$scope','$state', '$mdToast', 'AuthService', 'AccountService','RegisterService', RegisterCtrl]);

    /**
     * @module RegisterCtrl
     * @description
     * Handles Registration of self service user
     */
    function RegisterCtrl($http,$scope,$state, $mdToast, AuthService, AccountService,RegisterService) {
        var vm=this;
        
        vm.submit=submit;

        function submit() {

            var data1={};
            data1.accountNumber=vm.form.accountNumber;
            data1.firstName=vm.form.firstName;
            data1.lastName=vm.form.lastName;
            data1.username=vm.form.username;
            data1.password=vm.form.password;
            data1.authenticationMode='email';
            data1.email=vm.form.email;
            console.log(data1);

            var data = Object.assign({}, data1);
           var promise =  RegisterService.register().save(data).$promise;
                promise.then(function() {
                    $mdToast.show(
                        $mdToast.simple()
                        .content("Registration Successful")
                        .hideDelay(2000)
                        .position('top right')
                    );
                    $state.go("confirmregister");
            });
            promise.catch( function(){
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
