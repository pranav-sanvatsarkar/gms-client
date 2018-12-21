var contactForm = angular.module('contactForm', []);
contactForm.directive('contactForm', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.scope = {
        //contactId: '@',
        contactRecord: '=contact'
    };
    directive.templateUrl = 'application_js/contact-form.html';
    directive.controller = function ($scope, $rootScope) {
        $scope.isUpdatedByRoot = false;
        
        $scope.timezones = $rootScope.timezones;
        $scope.selectedTimeZoneId = angular.copy($rootScope.coordinatedTime.timezone.Id);
        $scope.localDateTime = {};
        $scope.localDateTime.date = $scope.contactRecord.dateTime.getFullYear() + '-' + ($scope.contactRecord.dateTime.getMonth() + 1) + '-' + $scope.contactRecord.dateTime.getDate();
        $scope.localDateTime.hours = $scope.contactRecord.dateTime.getHours() > 12 ? $scope.contactRecord.dateTime.getHours() - 12 : $scope.contactRecord.dateTime.getHours();
        $scope.localDateTime.minutes = $scope.contactRecord.dateTime.getMinutes();
        $scope.localDateTime.meridiem = ($scope.contactRecord.dateTime.getHours() > 12 ? 'PM' : 'AM');
        
        $scope.skipUpdate = true;

        $scope.$watch('localDateTime', function(newValue, oldValue, scope){
            if( newValue.hours > 12 )
                newValue.hours = 1;
            if( newValue.hours <= 0 )
                newValue.hours = 12;
            if( newValue.minutes > 59 )
                newValue.minutes = 0;
            if( newValue.minutes < 0 )
                newValue.minutes = 59;
            scope.contactRecord.dateTime = newValue;
            if( !scope.contactRecord.contact.isUpdated )
            {
                setTimeout(function(){
                    scope.$parent.updateArrContacts(scope.contactRecord.contact.Index);
                },100);
            }
            else
                scope.contactRecord.contact.isUpdated = false;
        },true);

        $scope.$watch('contactRecord.dateTime',function(newValue, oldValue, scope){
            scope.localDateTime.date = newValue.date;
            scope.localDateTime.hours = newValue.hours;
            scope.localDateTime.minutes = newValue.minutes;
            scope.localDateTime.meridiem = newValue.meridiem;
        },true);

        $scope.$watch('selectedTimeZoneId', function (newValue, oldValue) {
            for (var index = 0; index < $rootScope.timezones.length; index++) {
                if ($rootScope.timezones[index].Id === newValue) {
                    $scope.contactRecord.timezone = $rootScope.timezones[index];
                    break;
                }
            }
        });
    }
    return directive;
});