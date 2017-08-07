(function(){
	'use strict';

		angular.module('selfService')
			.controller('SavingsAccountViewCtrl', ['$stateParams', '$filter', 'SavingsAccountService', SavingsAccountViewCtrl]);
		/**
		 * @module SavingsAccountViewCtrl
		 * @description
		 * Handles the individial savings account detail page
		 */
		function SavingsAccountViewCtrl($stateParams, $filter, SavingsAccountService) {

			var vm = this;

			/**
			 * @name loadingSavingsAccount
             * @type {boolean}
			 * @description Flag to check where the savings account data is loaded or not
             */
			vm.loadingSavingsAccount = true;

            /**
			 * @name statusClass
             * @type {string}
			 * @description Stores the status class of savings account
             */
            vm.statusClass = '';

            /**
			 * @name savingsAccountDetails
			 * @type {object}
			 * @description Stores the savings account details from server
             */
			vm.savingsAccountDetails = getSavingsDetail($stateParams.id);

            /**
			 * @name transactions
             * @type {Array}
             */
			vm.transactions = [];

			vm.getStatusClass = getStatusClass

            /**
			 * @method getSavingsDetail
			 * @description Gets savings account detail from server
			 * @param id {number} Savings Account id
             */
			function getSavingsDetail(id) {
                SavingsAccountService.savingsAccount().get({id: id, associations: 'transactions,charges'}).$promise.then(function(res) {
					vm.loadingSavingsAccount = false;
					vm.savingsAccountDetails = res;
					vm.transactions = res.transactions;
					getStatusClass();
				});
			}

            /**
			 * @method getStatusClass
			 * @description updates the status of the savings account
             */
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