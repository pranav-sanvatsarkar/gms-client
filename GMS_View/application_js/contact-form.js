var contactForm = angular.module('contactForm', []);
contactForm.directive('contactForm', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.scope = {
        contactRecord: '=contact'
    };
    directive.templateUrl = 'application_js/contact-form.html';
    directive.controller = function ($scope, $rootScope, $compile) {
        $scope.isUpdatedByRoot = false;

        $scope.timezones = $rootScope.timezones;
        $scope.selectedTimeZoneId = angular.copy($scope.contactRecord.timezone.Id);
        $scope.localDateTime = {};

        $scope.updateContactDateTime = function(){
            $scope.contactRecord.dateTime = $scope.localDateTime;
            $scope.$parent.updateArrContacts($scope.localDateTime, $scope.contactRecord.timezone.GMT_Offset_in_Minutes__c);
        }
        
        $scope.$watch('contactRecord.dateTime', function (newValue, oldValue, scope) {
            if (newValue) {
                if (newValue.hours > 12)
                newValue.hours = 1;
                if (newValue.hours <= 0)
                newValue.hours = 12;
                
                if (newValue.minutes > 59)
                newValue.minutes = 0;
                if (newValue.minutes < 0)
                newValue.minutes = 59;
                if( scope.localDateTime != newValue )
                    scope.localDateTime = newValue;
            }
        }, true);

        $scope.$watch('selectedTimeZoneId', function (newValue, oldValue) {
            for (var index = 0; index < $rootScope.timezones.length; index++) {
                if ($rootScope.timezones[index].Id === newValue) {
                    $scope.contactRecord.timezone = $rootScope.timezones[index];
                    break;
                }
            }
        });

        $scope.removeContact = function (element) {
            if ($scope.contactRecord) {
                var indexToRemove = -1;
                for (var index = 0; index < $scope.$parent.arrContacts.length; index++) {
                    if ($scope.$parent.arrContacts[index].contact.Index == $scope.contactRecord.contact.Index)
                        indexToRemove = index;
                }
                document.getElementById('div-' + $scope.contactRecord.contact.Index).outerHTML = '';
                $scope.$parent.arrContacts.splice(indexToRemove, 1);
                setTimeout(function () {
                    for (var index = 0; index < $scope.$parent.arrContacts.length; index++) {
                        var divContainer = document.getElementById('inner-div-' + $scope.$parent.arrContacts[index].contact.Index);
                        if (divContainer) {
                            divContainer.innerHTML = '';
                            var elementToAppend = $compile('<contact-form contact="arrContacts[' + index + ']"/>')($scope.$parent);
                            angular.element(divContainer).append(elementToAppend);
                        }
                    }
                    $scope.$parent.$apply();
                    $scope.$parent.maxAllowedDivCount++;
                }, 500);
            }
        }
    }
    return directive;
});