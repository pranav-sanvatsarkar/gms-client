var contactForm = angular.module('contactForm',[]);
contactForm.directive('contactForm',function(){
    var directive = {};
    directive.restrict = 'E';
    directive.scope = {
        contact : '=',
        timezone : '='
    };
    //directive.scope.contactWrapper = '=';
    directive.templateUrl = 'application_js/contact-form.html';
    directive.controller = function($scope){
        $scope.contact = JSON.parse($scope.contact);
        console.log($scope.contact);
    }
    return directive;
});
contactForm.controller('contactFormController',function($scope){
});