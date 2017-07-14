(function(){
	'use strict';

		angular.module('selfService')
			.controller('SavingsAccountViewCtrl', ['$stateParams', '$filter', 'SavingsAccountService', SavingsAccountViewCtrl]);

		function SavingsAccountViewCtrl($stateParams, $filter, SavingsAccountService) {

			var vm = this;
			vm.loadingSavingsAccount = true;
			vm.savingsAccountDetails 		= getLoanDetails( $stateParams.id );
			vm.statusClass = '';
			vm.getStatusClass = getStatusClass

			function getLoanDetails( id ) {
                SavingsAccountService.savingsAccount().get({id: id}).$promise.then(function(res) {
					vm.loadingSavingsAccount = false;
					vm.savingsAccountDetails = res;
					getStatusClass();
				});
			}

			function getStatusClass() {
                var statusClass = $filter('StatusLookup')(vm.savingsAccountDetails.status.code);
                statusClass = 'bg_' + statusClass;
                if(vm.savingsAccountDetails.subStatus.id !== 0) {
                    statusClass = $filter('StatusLookup')(vm.savingsAccountDetails.status.code+vm.savingsAccountDetails.subStatus.value);
				}

				vm.statusClass = statusClass;
			}
		}
})();