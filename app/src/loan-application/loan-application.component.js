(function(){
    'use strict';

    angular.module('selfService')
        .controller('LoanApplicationCtrl', ['$scope', '$rootScope','$filter', '$mdToast', 'AccountService', 'LoanApplicationService', LoanApplicationCtrl]);

    /**
     * @module LoanApplicationCtrl
     * @description
     * Controls Application for Loan
     */
    function LoanApplicationCtrl($scope, $rootScope, $filter, $mdToast, AccountService, LoanApplicationService) {
        var vm = this;

        //pramod109
        vm.reRoute = reRoute;
        vm.form = {
            locale: 'en_GB',
            dateFormat: 'dd MMMM yyyy',
            loanType: 'individual'
        };
        vm.template = {};
        vm.clientId = null;

        vm.init = init;
        vm.getLoanTemplate = getLoanTemplate;
        vm.submit = submit;

        init();

        function init() {
            AccountService.getClientId().then(function (clientId) {
                vm.clientId = clientId;
                getLoanTemplate(clientId, null);
            });
        }

        function getLoanTemplate(clientId, productId) {
            LoanApplicationService.template().get({
                templateType: 'individual',
                clientId: clientId,
                productId: productId
            }).$promise.then(function(template) {
                vm.template = template;
                vm.form.principal = vm.template.principal;
                vm.form.submittedOnDate = $filter('date','dd MMMM yyyy')(new Date(), 'dd MMMM yyyy');
                vm.form.expectedDisbursementDate = $filter('date')(new Date(), 'dd MMMM yyyy');
            });
        }

        function submit() {
            var loanTemp = {
                clientId: vm.clientId,
                loanTermFrequency: vm.template.termFrequency,
                loanTermFrequencyType: vm.template.termPeriodFrequencyType.id,
                numberOfRepayments: vm.template.numberOfRepayments,
                repaymentEvery: vm.template.repaymentEvery,
                repaymentFrequencyType: vm.template.repaymentFrequencyType.id,
                interestRatePerPeriod: vm.template.interestRatePerPeriod,
                amortizationType: vm.template.amortizationType.id,
                interestType: vm.template.interestType.id,
                interestCalculationPeriodType: vm.template.interestCalculationPeriodType.id,
                transactionProcessingStrategyId: vm.template.transactionProcessingStrategyId
            };
            var data = Object.assign({}, loanTemp, vm.form);
            LoanApplicationService.loan().save(data).$promise.then(function() {
                $mdToast.show(
                    $mdToast.simple()
                        .content("Loan Application Submitted Successfully")
                        .hideDelay(2000)
                        .position('top right')
                );
            }, function(){
                $mdToast.show(
                    $mdToast.simple()
                        .content("Error Creating Loan Application")
                        .hideDelay(2000)
                        .position('top right')
                );
            });
        }

        //pramod109
        //Method to route 'Cancel' button to 'Dashboard'
        function reRoute(msg) {
            $rootScope.$broadcast('dashboard', 'Dashboard');
        }

    }
})();