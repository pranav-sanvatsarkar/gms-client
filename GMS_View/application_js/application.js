var gmsApp = angular.module('gmsApp', ['contactForm', 'dbService', 'objectService']);
gmsApp.controller('gmsAppController', function ($rootScope, $scope, $compile, $database, $object) {

    $scope.arrContacts = [];
    $scope.indexChanged = -1;
    $scope.maxAllowedDivCount = 5;
    $scope.database;

    $scope.contactRecordToPush = $object.getContact();

    $scope.insertRow = function () {
        var arrContacts = [];
        //$scope.contactRecordToPush.External_Id__c = '123';
        arrContacts.push($scope.contactRecordToPush);

        var additionalRecord = $object.getContact();
        additionalRecord = angular.copy($scope.contactRecordToPush);
        additionalRecord.Id = $database.generateUID();
        additionalRecord.External_Id__c = $database.generateUID();
        //additionalRecord.External_Id__c = '345';
        arrContacts.push(additionalRecord);

        $database.insertObjects('contacts', arrContacts).then(function (result) {
            console.log(result);
        }, function (error) {
            console.log(error);
        });
    }

    $scope.updateArrContacts = function (sourceDateTime, sourceTimezoneOffSet) {
        for (var index = 0; index < $scope.arrContacts.length; index++) {
            var sourceDateTimeGMT = $scope.getGMTDateTime(sourceDateTime, sourceTimezoneOffSet);
            var destDateTime = new Date(sourceDateTimeGMT.valueOf() + (60000 * $scope.arrContacts[index].timezone.GMT_Offset_in_Minutes__c));
            $scope.arrContacts[index].dateTime = $scope.getFullDateToDateTime(destDateTime);
        }
    }

    $scope.getGMTDateTime = function (dateTime, timeZoneOffSet) {
        if (dateTime.meridiem == 'AM' && dateTime.hours == 12)
            dateTime.hours = 0;
        var hours = dateTime.meridiem == 'PM' ? dateTime.hours + 12 : dateTime.hours;
        var month = dateTime.date.split('-')[1] - 1;
        if (month.valueOf() < 10)
            month = '0' + month;
        var dateTimeFull = new Date(dateTime.date.split('-')[0], month, dateTime.date.split('-')[2], hours, dateTime.minutes);
        var gmtDateTimeFull = new Date(dateTimeFull.valueOf() - (60000 * timeZoneOffSet));
        return gmtDateTimeFull;
    }

    $scope.getFullDateToDateTime = function (fullDate) {
        var dateTime = {};
        var month = (fullDate.getMonth() + 1);
        if (month < 10)
            month = '0' + month;
        dateTime.date = fullDate.getFullYear() + '-' + month + '-' + fullDate.getDate();
        dateTime.hours = fullDate.getHours() > 12 ? fullDate.getHours() - 12 : fullDate.getHours();
        dateTime.minutes = fullDate.getMinutes();
        dateTime.meridiem = (fullDate.getHours() > 12 ? 'PM' : 'AM');
        if (dateTime.meridiem == 'AM' && dateTime.hours == 0)
            dateTime.hours = 12;
        return dateTime;
    }

    $scope.createDatabase = function () {
        $database.initialize().then(function (result) {
            $scope.database = result;
            $scope.fetchTimeZones();
        });
    }

    $scope.fetchTimeZones = function () {
        $database.getAllRecords('timezones').then(function (result) {
            if( result && result.length <= 0 )
                $scope.upsertTimezones();
            else
                $scope.timezones = result;
        }, function (error) {
            console.log('Fetching timezones error: ' + error);
        });


    }
    
    $scope.upsertTimezones = function(){
        var timezones = $object.getSampleTimezones();
        var request = $database.updateObjects('timezones', timezones).then(function (result) {
            $scope.fetchTimeZones();
        }, function (error) {
            alert.log('Timezones upsert error: ' + error);
        });
    }

    $scope.createDatabase();

    $scope.addRow = function () {
        var request = $scope.database.transaction('contacts', 'readwrite');
        request.objectStore('contacts').add({ 'external_id__c': '123', 'name': 'Pranav' });
        request.onsuccess = function (event) {
            console.log(event);
        }
        request.onerror = function (event) {
            console.log(event);
        }
    }

    $scope.readRows = function () {
        var request = $scope.database.transaction('contacts').objectStore('contacts').getAll();
        request.onsuccess = function (event) {
            alert(event);
        }
        request.onerror = function (event) {
            alert(event);
        }
    }

    $rootScope.contacts = [];
    $rootScope.coordinatedTime = {};
    $rootScope.coordinatedTime.timezone = {};

    $rootScope.defaulTimezone = {};
    $rootScope.defaulTimezone.Name = 'Greenwich Mean Time / Coordinated Universal Time';
    $rootScope.defaulTimezone.Short_Name__c = 'GMT';
    $rootScope.defaulTimezone.Region__c = 'Europe';
    $rootScope.defaulTimezone.City_or_State__c = 'Dublin';
    $rootScope.defaulTimezone.GMT_Offset_in_Minutes__c = 0;
    $rootScope.defaulTimezone.Type__c = 'Standard Time';
    $rootScope.defaulTimezone.Id = 'a001000001dTgV5';

    $rootScope.coordinatedTime.timezone.Name = 'India Standard Time / India Time';
    $rootScope.coordinatedTime.timezone.Short_Name__c = 'IST';
    $rootScope.coordinatedTime.timezone.Region__c = 'India';
    $rootScope.coordinatedTime.timezone.City_or_State__c = '';
    $rootScope.coordinatedTime.timezone.Country__c = '';
    $rootScope.coordinatedTime.timezone.GMT_Offset_in_Minutes__c = 330;
    $rootScope.coordinatedTime.timezone.Type__c = 'Standard Time';
    $rootScope.coordinatedTime.timezone.Id = 'a001000001dTgUv';

    $rootScope.coordinatedTime.dateTime = new Date();
    $scope.divCounter = 0;

    $scope.addAttendee = function () {
        if ($scope.divCounter < $scope.maxAllowedDivCount) {
            var contact = $scope.contact($scope.divCounter);
            $scope.arrContacts.push(contact);
            $scope.createContact($scope.divCounter);
            //$rootScope.contacts.push(contact);
            $scope.divCounter++;
        }
    }

    $scope.createContact = function (divId) {
        var div = document.createElement('div');
        div.className = 'schedule-contacts-element';
        div.id = 'div-' + divId;
        var innerDiv = document.createElement('div');
        innerDiv.id = "inner-div-" + divId;
        innerDiv.className = 'schedule-contacts-element-content';
        // innerDiv.draggable = true;
        //innerDiv.setAttribute('ondragstart', 'drag(event)');
        var contactRecordIndex = 0;
        for (var index = 0; index < $scope.arrContacts.length; index++) {
            if ($scope.arrContacts[index].contact.Index == divId)
                contactRecordIndex = index;
        }
        var newElement = $compile('<contact-form contact="arrContacts[' + contactRecordIndex + ']"/>')($scope);
        div.appendChild(innerDiv);
        angular.element(innerDiv).append(newElement);
        // div.setAttribute('ondragover', "allowDrop(event)");
        // div.setAttribute('ondrop', "drop(event)");
        document.getElementById('schedule-contacts').appendChild(div);
    }

    $scope.contact = function (divCounter) {
        var contact = {};
        contact.Id = '123';
        contact.Name = '';
        contact.Index = divCounter;
        contact.isUpdated = false;

        //$scope.arrContacts.push(contact);

        var contactWrapper = {};
        contactWrapper.contact = contact;
        contactWrapper.timezone = $rootScope.coordinatedTime.timezone;
        contactWrapper.dateTime = $scope.getFullDateToDateTime($rootScope.coordinatedTime.dateTime);
        return contactWrapper;
    }

    $scope.upsertAttendeeGroups = function(){
        if( !$scope.selectedAttendeeGroup.External_Id__c )
            $scope.selectedAttendeeGroup.External_Id__c = $database.generateUID();
        var attendeeGroups = [];
        attendeeGroups.push( $scope.selectedAttendeeGroup );
        $database.updateObjects('attendeeGroups',attendeeGroups).then(function(result){
            debugger;
        },function(error){
            debugger;
        });
    }

    
    // $scope.$watch('selectedAttendeeGroup',function(newValue){
    //     console.log(newValue);
    // },true);
    
    $scope.$watch('arrContacts',function(newValue){
        if( newValue && newValue.length > 0 ){
            //$scope.selectedAttendeeGroup.Name = 'Group1';
            $scope.selectedAttendeeGroup.Attendees__c = [];
            for( var index = 0; index < newValue.length; index ++ ){
                var attendee = {};
                attendee.Name = newValue[index].contact.Name;
                attendee.Timezone__c = newValue[index].timezone.Id;    
                $scope.selectedAttendeeGroup.Attendees__c.push( attendee );
            }
        }
    },true);
    $scope.selectedAttendeeGroup = {};
    $scope.selectedAttendeeGroup.Name = 'Group_1';

    $scope.upsertGroup = function(){
        console.log('Group:' + $scope.selectedAttendeeGroup);
    }
});


var openDiv = function (divId) {
    document.getElementById(divId).style.display = 'inline-block';
}
var closeDiv = function (divId) {
    document.getElementById(divId).style.display = 'none';
}




// var allowDrop = function (event) {
//     event.preventDefault();
// }

// var drag = function (event) {
//     event.dataTransfer.setData('sourceId', event.target.id);
// }

// var drop = function (event) {
//     event.preventDefault();
//     var elementToMove;

//     var sourceId = event.dataTransfer.getData('sourceId');
//     var sourceElement = document.getElementById(sourceId);
//     var sourceElementParent = sourceElement.parentElement;

//     var destinationId = event.target.id;
//     var destinationElement = event.target;
//     var destinationElementParent = destinationElement.parentElement;

//     if (destinationElement.draggable == false) {
//         destinationElement.appendChild(sourceElement);
//         sourceElementParent.appendChild(destinationElement.children[0]);
//     }
//     else {
//         destinationElementParent.appendChild(sourceElement);
//         sourceElementParent.appendChild(destinationElement);
//     }
// }

// var readContactHTML = function () {
//     var htmlFile = new XMLHttpRequest();
//     htmlFile.open('GET', 'contact.html', true);
//     htmlFile.onreadystatechange = function () {
//         if (htmlFile.readyState === 4) {
//             if (htmlFile.status === 200 || htmlFile.status == 0) {
//                 htmlFile.send(htmlFile.responseText);
//             }
//         }
//     }
//     // htmlFile.send(htmlFile.responseText);
// }