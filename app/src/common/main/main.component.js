(function () {

    angular.module('selfService')
        .controller('MainCtrl', ['navService', '$mdSidenav', 'AuthService', 'AccountService', MainCtrl]);

    function MainCtrl(navService, $mdSidenav, AuthService, AccountService) {
        var vm = this;

        vm.menuItems = [];
        vm.profileImage = null;
        vm.selectItem = selectItem;
        vm.toggleItemsList = toggleItemsList;
        vm.toggleRightSidebar = toggleRightSidebar;
        vm.logout = logout;

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

    }

})();
