(function(){
    'use strict';

    angular.module('selfService')
        .controller('DashboardCtrl', ['AccountService', DashboardCtrl]);

    function DashboardCtrl(AccountService) {
        var vm = this;
        vm.dashboardData = {};

        vm.getDashboardData = getDashboardData();

        function getDashboardData() {
            AccountService.getClientId().then(function (clientId) {
                AccountService.getAllAccounts(clientId).get().$promise.then(function(data) {
                    vm.dashboardData.loanAccounts = data.loanAccounts;
                    vm.dashboardData.savingsAccounts = data.savingsAccounts;
                    vm.dashboardData.shareAccounts = data.shareAccounts;
                    vm.dashboardData.totalAccounts = vm.dashboardData.loanAccounts.length + vm.dashboardData.savingsAccounts.length + vm.dashboardData.shareAccounts.length
                    vm.dashboardData.totalSavings = data.savingsAccounts.reduce(getTotalSavings, 0);
                    vm.dashboardData.totalLoan = data.loanAccounts.reduce(getTotalLoan, 0)
                });
            })
        }

        function getTotalSavings(total, acc) {
            if(acc.accountBalance) {
                return total + acc.accountBalance;
            } else {
                return total;
            }
        }

        function getTotalLoan(total, acc) {
            if(acc.loanBalance) {
                return total + acc.loanBalance;
            } else {
                return total;
            }
        }

    }
})();