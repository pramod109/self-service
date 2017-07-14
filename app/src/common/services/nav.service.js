(function(){
  'use strict';

  angular.module('selfService')
    .service('navService', ['$q', navService]);

    /**
     * @module navService
     * @description Navigation Service
     */
  function navService($q){
    var menuItems = [
      {
        name: 'Dashboard',
        icon: 'view_module',
        sref: '.dashboard'
      },
      {
        name: 'Accounts',
        icon: 'account_balance_wallet',
        sref: '.clients'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();