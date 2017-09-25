(function () {
    
        angular.module('selfService')
            .controller('ProfileCtrl', ['$scope','navService', '$mdSidenav', 'AuthService', 'AccountService', ProfileCtrl]);
    
        function ProfileCtrl($scope, navService, $mdSidenav, AuthService, AccountService) {
            var vm = this;

            vm.changePassword=false;
            vm.changeUsername=false;
            vm.menuItems = [];
            vm.profileImage = null;
            vm.selectItem = selectItem;
            vm.toggleItemsList = toggleItemsList;
            vm.toggleRightSidebar = toggleRightSidebar;
            vm.logout = logout;
            vm.gotoProfile = gotoProfile;
            vm.open = open;

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
                });
            }
    
            function getClient(clientId) {
                AccountService.getClient(clientId).get().$promise.then( function (data) {
                    vm.profile = data;
                })
            }
    
            function getClientImage(clientId) {
                AccountService.getClientImage(clientId).then( function (resp) {
                    vm.profileImage = resp.data;
                })
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

            function open() {

            }
    
        }
    
    })();
    