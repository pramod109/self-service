(function () {
    'use strict';

    angular.module('selfService')
        .controller('RegisterCtrl', ['$state', '$mdToast', 'AuthService', 'AccountService','RegisterService', RegisterCtrl]);

    /**
     * @module RegisterCtrl
     * @description
     * Handles Registration of self service user
     */
    function RegisterCtrl($state, $mdToast, AuthService, AccountService,RegisterService) {
        var vm=this;
        
        vm.submit=submit;

        //vm.form = {};

        // vm.data = {
        //     "accountNumber":vm.form.accountNumber,
        //     "firstName":vm.form.firstName,
        //     "lastName":vm.form.lastName,
        //     "username":vm.form.username,
        //     "password":vm.form.password,
        //     "authenticationMode":"email",
        //     "email":vm.form.email
        // }
        // //$http.post('/someUrl', data, config).then(successCallback, errorCallback);

        function submit() {

            var data1={};
            data1.accountNumber=vm.form.accountNumber;
            data1.firstName=vm.form.firstName;
            data1.lastName=vm.form.lastName;
            data1.username=vm.form.username;
            data1.password=vm.form.password;
            data1.authenticationMode='email';
            data1.email=vm.form.email;
            
            //$http.post()
            console.log(data1);
            var data = Object.assign({}, data1);
            RegisterService.register().save(data).$promise.then(function() {
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
