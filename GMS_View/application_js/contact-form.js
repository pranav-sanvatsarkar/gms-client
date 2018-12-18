var contactForm = angular.module('contactForm',[]);
contactForm.directive('contactForm',function(){
    var directive = {};
    directive.restrict = 'E';
    directive.scope = {
        contactId : '@'
    };
    directive.templateUrl = 'application_js/contact-form.html';
    directive.controller = function($scope,$rootScope){
        $scope.contact = {};
        $scope.timezones = $rootScope.timezones;
        $scope.contact = angular.copy($rootScope.contacts[$scope.contactId].contact);
        //$scope.timezone = angular.copy($rootScope.contacts[$scope.contactId].contact);
        $scope.selectedTimeZoneId = angular.copy($rootScope.coordinatedTime.timezone.Id);
        $scope.localDateTime = {};
        $scope.localDateTime.date = $rootScope.coordinatedTime.dateTime.getFullYear() + '-' +  ( $rootScope.coordinatedTime.dateTime.getMonth() + 1 ) + '-' + $rootScope.coordinatedTime.dateTime.getDate();
        $scope.localDateTime.hours = ( $rootScope.coordinatedTime.dateTime.getHours() > 12 ? $rootScope.coordinatedTime.dateTime.getHours() - 12 : $rootScope.coordinatedTime.dateTime.getHours()) ;
        $scope.localDateTime.minutes = $rootScope.coordinatedTime.dateTime.getMinutes();
        $scope.localDateTime.meridiem = ( $rootScope.coordinatedTime.dateTime.getHours() > 12 ? 'PM' : 'AM');
        //$scope.localCoordinatedTime = $rootScope.coordinatedTime;

        $scope.$watch('selectedTimeZoneId',function(newValue, oldValue){
            for(var index = 0; index < $rootScope.timezones.length; index ++)
            {
                if( $rootScope.timezones[index].Id === newValue )
                {
                    $scope.timezone = $rootScope.timezones[index];
                    $rootScope.coordinatedTime.timezone = $scope.timezone;
                    break;
                }
            }
        });
        $scope.$watch('localDateTime',function(newValue){
            var dateElements = newValue.date.split('-');
            var hours = newValue.meridiem == 'PM' ? newValue.hours+12 : newValue.hours;
            var updatedDateTime = new Date(dateElements[0],dateElements[1],dateElements[2],hours, newValue.minutes);

            var gmtDateTime = new Date( newValue.dateTime.valueOf() + ( 60000 * newValue.timezone.GMT_Offset_in_Minutes__c ) );
            for( var index = 0; index < $rootScope.contacts.length; index ++ )
            {
                
            }

            //$rootScope.coordinatedTime.dateTime = updatedDateTime;
            //$rootScope.contacts[$scope.contactId].dateTime = updatedDateTime;
        },true);


        // $scope.$watch('wrapper',function(newValue){
        //     if( newValue.time )
        //     {
        //         $rootScope.coordinatedTime = new Date(newValue.time.fullDate.getFullYear(),newValue.time.fullDate.getMonth(),newValue.time.fullDate.getDate(),(newValue.time.meridiem == 'PM' ? newValue.time.hours + 12 : newValue.time.hours ),newValue.time.minutes );
        //         var offSetMinutes;
        //         for( var index = 0; index < $rootScope.timezones.length; index ++ )
        //         {
        //             if( newValue.timezone.Id === $rootScope.timezones[index] )
        //             {
        //                 offSetMinutes = $rootScope.timezones[index].GMT_Offset_in_Minutes__c;
        //                 break;
        //             }
        //         }
        //         $rootScope.coordinatedTime = new Date($rootScope.coordinatedTime.valueOf() + ( 60000 * offSetMinutes));
        //     }
        // },true);
        // $scope.$watch('wrapper.timezone',function(newValue){
        //     //$rootScope.coordinatedTime = new Date(newValue.fullDate.getFullYear(),newValue.fullDate.getMonth(),newValue.fullDate.getDate(),(newValue.meridiem == 'PM' ? newValue.hours + 12 : newValue.hours ),newValue.minutes );
        //     //console.log($rootScope.coordinatedTime);
        // });
    }
    return directive;
});