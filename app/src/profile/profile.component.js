(function () {
    
        angular.module('selfService')
            .controller('ProfileCtrl', ['BASE_URL','$scope','$http','navService','$mdToast', '$mdSidenav', 'AuthService', 'AccountService','ProfileService', ProfileCtrl]);
    
        function ProfileCtrl(BASE_URL,$scope, $http, navService,$mdToast, $mdSidenav, AuthService, AccountService,ProfileService) {
            var vm = this;
            vm.submit=submit;
            
            vm.menuItems = [];
            vm.profileImage = null;
            vm.selectItem = selectItem;
            vm.toggleItemsList = toggleItemsList;
            vm.toggleRightSidebar = toggleRightSidebar;
            vm.logout = logout;
            vm.gotoProfile = gotoProfile;
            

            vm.profile = getUserData();
    
            navService.loadAllItems().then(function (menuItems) {
                vm.menuItems = [].concat(menuItems);
            });
    
            function toggleRightSidebar() {
                $mdSidenav('right').toggle();
            }
    
            function toggleItemsList() {
                $mdSidenav('left').toggle();
            }
    
            function selectItem(itemName) {
                vm.title = itemName;
                vm.toggleItemsList();
            }
    
            function getUserData() {
                AccountService.getClientId().then(function (clientId) {
                    vm.clientId = clientId;
                    getClient(clientId);
                    getClientImage(clientId);
                }).catch(angular.noop);
            }
    
            function getClient(clientId) {
                AccountService.getClient(clientId).get().$promise.then( function (data) {
                    vm.profile = data;
                }).catch(angular.noop);
            }
    
            function getClientImage(clientId) {
                AccountService.getClientImage(clientId).then( function (resp) {
                    vm.profileImage = resp.data;
                }).catch(angular.noop);
            }
    
            function logout() {
                AuthService.logout();
            }
    
            //pramod109
    
            function gotoProfile() {
                angular.element('#profileButton').triggerHandler('click');
            }
    
            $scope.$on('dashboard', function (event, data) {
                angular.element('#dashButton').triggerHandler('click');
            });
            var URL = BASE_URL + '/self/user?tenantIdentifier=default'
            function submit() {
                var data1={}
                data1.password=vm.form.password;
                data1.repeatPassword=vm.form.repeatPassword;
                console.log(data1);

                var data = Object.assign({}, data1);

                // ProfileService.changePassword().save(data).$promise
                //     .then(function() {
                //         $mdToast.show(
                //             $mdToast.simple()
                //             .content("Password Changed Succesful")
                //             .hideDelay(2000)
                //             .position('top right')
                //         );
                // }, function(){
                //     $mdToast.show(
                //         $mdToast.simple()
                //             .content("Error in Changing Password")
                //             .hideDelay(2000)
                //             .position('top right')
                //     );
                // });

                $http.put(URL,data)
                    .then( function() {
                        $mdToast.show(
                            $mdToast.simple()
                            .content("Password Changed Successful")
                            .hideDelay(2000)
                            .position('top right')
                        );
                    },function() {
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Error in Changing Password")
                                .hideDelay(2000)
                                .position('top right')
                        );
                    }).catch(angular.noop);
    
            }
    
        }
    
    })();
    