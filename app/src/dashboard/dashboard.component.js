(function(){
    'use strict';

    angular.module('selfService')
        .controller('DashboardCtrl', ['AccountService', DashboardCtrl]);

    /**
     * @module DashboardCtrl
     * @description
     * Controls the data of the dashboard
     */
    function DashboardCtrl(AccountService) {
        var vm = this;

        /**
         * @name dashboardData
         * @type {object}
         * @description Stores the dashboard data returned from the server
         */
        vm.dashboardData = {};

        /**
         * @name options
         * @type {{chart: {type: string, height: number, showLabels: boolean, x: module:DashboardCtrl.options.chart.x, y: module:DashboardCtrl.options.chart.y, duration: number, labelSunbeamLayout: boolean}}}
         * @description Configuration for pie charts on the dashboard
         */
        vm.options = {
            chart: {
                type: 'pieChart',
                height: 300,
                showLabels: false,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                duration: 500,
                labelSunbeamLayout: true,
            }
        };

        vm.getDashboardData = getDashboardData();

        /**
         * @method getDashboardData
         * @description Gets Dashboard data from the server
         */
        function getDashboardData() {
            AccountService.getClientId().then(function (clientId) {
                AccountService.getAllAccounts(clientId).get().$promise.then(function(data) {

                    if (typeof data.loanAccounts === 'undefined'){
                        vm.dashboardData.loanAccounts=[];
                    }
                    else {
                        vm.dashboardData.loanAccounts = data.loanAccounts;
                    }
                    
                    //vm.dashboardData.loanAccounts = data.loanAccounts;

                    if (typeof data.savingsAccounts === 'undefined'){
                        vm.dashboardData.savingsAccounts=[];
                    }
                    else {
                        vm.dashboardData.savingsAccounts = data.savingsAccounts;
                    }
                    
                    //vm.dashboardData.savingsAccounts = data.savingsAccounts;
                    
                    if (typeof data.shareAccounts === 'undefined'){
                        vm.dashboardData.shareAccounts=[];
                    }
                    else {
                        vm.dashboardData.shareAccounts = data.shareAccounts;
                    }
                    
                    //vm.dashboardData.shareAccounts = data.shareAccounts;
                    
                    vm.dashboardData.totalAccounts = vm.dashboardData.loanAccounts.length + vm.dashboardData.savingsAccounts.length + vm.dashboardData.shareAccounts.length;
                    vm.dashboardData.totalSavings = data.savingsAccounts.reduce(getTotalSavings, 0);
                    vm.dashboardData.totalLoan = data.loanAccounts.reduce(getTotalLoan, 0);
                    vm.dashboardData.loanAccountsOverview = getChartData(data.loanAccounts);
                    vm.dashboardData.savingsAccountsOverview = getChartData(data.savingsAccounts);
                    vm.dashboardData.shareAccountsOverview = getChartData(data.shareAccounts);
                });
            })
        }

        /**
         * @method getTotalSavings
         * @param total
         * @param acc
         * @description Reducer for chart data to get total savings balance
         * @returns {number}
         */
        function getTotalSavings(total, acc) {
            if(acc.accountBalance) {
                return total + acc.accountBalance;
            } else {
                return total;
            }
        }

        /**
         * @method getTotalLoan
         * @param total
         * @param acc
         * @description Reducer to find out total loan amount of the client
         * @returns {number}
         */
        function getTotalLoan(total, acc) {
            if(acc.loanBalance) {
                return total + acc.loanBalance;
            } else {
                return total;
            }
        }

        /**
         * @method getChartData
         * @param accounts
         * @description modifies data to fill in the pie charts
         * @returns {Array}
         */
        function getChartData(accounts) {
            var chartObj = {};
            accounts.map(function(acc) {
               chartObj[acc.status.value] = (chartObj[acc.status.value]) ? chartObj[acc.status.value] + 1: 1;
            });
            var chartData  = [];
            var keys = Object.keys(chartObj);
            for (var i in keys) {
                chartData.push({
                    key: keys[i],
                    y: chartObj[keys[i]]
                });
            }
            return chartData;
        }
    }
})();