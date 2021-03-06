(function() {
    'use strict';

    angular.module('selfService')
        .service('BeneficiariesService', ['$resource', 'BASE_URL', BeneficiariesService]);

    /**
     * @module BeneficiariesService
     * @description
     * Service required for Beneficiaries
     */
    function BeneficiariesService($resource, BASE_URL) {

        this.getBeneficiaries = function () {
            return $resource(BASE_URL + '/self/beneficiaries/tpt');
        };

        this.template = function() {
            return $resource(BASE_URL + '/self/beneficiaries/tpt/template');
        }

        this.beneficiary = function () {
            return $resource(BASE_URL + '/self/beneficiaries/tpt/:id',{id: '@id'},{
                update: {
                    method: 'PUT'
                }
            });
        }
    }

})();