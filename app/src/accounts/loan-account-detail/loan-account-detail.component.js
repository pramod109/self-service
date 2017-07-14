(function(){
	'use strict';

		angular.module('selfService')
			.controller('LoanAccountViewCtrl', ['$scope', '$http','BASE_URL', '$rootScope', '$stateParams', '$filter', 'LoanAccountService', LoanAccountViewCtrl]);

		function LoanAccountViewCtrl($scope,$http,BASE_URL, $rootScope, $stateParams, $filter, LoanAccountService) {

			var vm = this;
			vm.loadingLoanAccountInfo 	= true;
			vm.loanAccountDetails 		= getLoanDetails( $stateParams.loanId );
			vm.statusClass = '';
			vm.getStatusClass = getStatusClass

			function getLoanDetails( id ) {
				LoanAccountService.loanAccount().get({id: id}).$promise.then(function(res) {
					vm.loadingLoanAccountInfo = false;
					vm.loanAccountDetails = res;
					getStatusClass();
				});
			}

			function getStatusClass() {
                var statusClass = $filter('StatusLookup')(vm.loanAccountDetails.status.code);
                statusClass = 'bg_' + statusClass;
                if(vm.loanAccountDetails.inArrears) {
                    statusClass += 'overdue';
				}

				vm.statusClass = statusClass;
			}
		}
})();