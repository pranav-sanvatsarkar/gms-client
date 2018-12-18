var gmsApp = angular.module('gmsApp', ['contactForm']);
gmsApp.controller('gmsAppController', function ($rootScope, $scope, $compile) {

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
    $rootScope.coordinatedTime.timezone.GMT_Offset_in_Minutes__c = -330;
    $rootScope.coordinatedTime.timezone.Type__c = 'Standard Time';
    $rootScope.coordinatedTime.timezone.Id = 'a001000001dTgUv';

    $rootScope.coordinatedTime.dateTime = new Date();
    // $rootScope.coordinatedTime.date = new Date();

    $rootScope.$watch('coordinatedTime', function (newValue) {
        var gmtDateTime = new Date( newValue.dateTime.valueOf() + ( 60000 * newValue.timezone.GMT_Offset_in_Minutes__c ) );
        for( var index = 0; index < $rootScope.contacts.length; index ++ )
        {
            
        }
    },true);

    $scope.divCounter = 0;

    $scope.addContact = function () {
        if ($scope.divCounter < 5) {
            var newContactWrapper = $scope.contact();
            $rootScope.contacts.push(newContactWrapper);
            $scope.createContact($scope.divCounter);
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
        innerDiv.draggable = true;
        innerDiv.setAttribute('ondragstart', 'drag(event)');
        var newElement = $compile('<contact-form contact-id="' + divId + '"/>')($scope);
        div.appendChild(innerDiv);
        angular.element(innerDiv).append(newElement);
        div.setAttribute('ondragover', "allowDrop(event)");
        div.setAttribute('ondrop', "drop(event)");
        document.getElementById('schedule-contacts').appendChild(div);
    }

    $scope.contact = function () {
        var contact = {};
        contact.Id = '123';
        contact.Name = '';

        // var timezone = {};
        // timezone.Name = 'India Standard Time / India Time';
        // timezone.Short_Name__c = 'IST';
        // timezone.Region__c = 'India';
        // timezone.City_or_State__c = '';
        // timezone.Country__c = '';
        // timezone.GMT_Offset_in_Minutes__c = -330;
        // timezone.Type__c = 'Standard Time';
        // timezone.Id = 'a001000001dTgUv';

        // var time = {};
        // var today = new Date();
        // time.hours = ( today.getHours() > 12 ? today.getHours() - 12 : today.getHours());
        // if( today.getHours() > 12 )
        //     time.meridiem = 'PM';
        // else
        //     time.meridiem = 'AM';
        // time.minutes = today.getMinutes();
        // time.date = today.getFullYear() + '-' +  ( today.getMonth() + 1 ) + '-' + today.getDate();
        // time.fullDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        var contactWrapper = {};
        contactWrapper.contact = contact;
        contactWrapper.timezone = $rootScope.coordinatedTime.timezone;
        contactWrapper.dateTime = $rootScope.coordinatedTime.dateTime;
        return contactWrapper;
    }

    $scope.getTimeZones = function () {
        var timezones = [];
        var timezone = {};
        timezone.Name = 'Eastern Standard Time / Eastern Time';
        timezone.Short_Name__c = 'EST';
        timezone.Region__c = 'New_York';
        timezone.City_or_State__c = '';
        timezone.Country__c = '';
        timezone.GMT_Offset_in_Minutes__c = -300;
        timezone.Type__c = 'Standard Time';
        timezone.Id = 'a001000001dTgUl';
        timezones.push(timezone);

        timezone = {};
        timezone.Name = 'Gulf Standard Time';
        timezone.Short_Name__c = 'GST';
        timezone.Region__c = 'Asia';
        timezone.City_or_State__c = '';
        timezone.Country__c = '';
        timezone.GMT_Offset_in_Minutes__c = 240;
        timezone.Type__c = 'Standard Time';
        timezone.Id = 'a001000001dTgUq';
        timezones.push(timezone);

        timezone = {};
        timezone.Name = 'India Standard Time / India Time';
        timezone.Short_Name__c = 'IST';
        timezone.Region__c = 'India';
        timezone.City_or_State__c = '';
        timezone.Country__c = '';
        timezone.GMT_Offset_in_Minutes__c = 330;
        timezone.Type__c = 'Standard Time';
        timezone.Id = 'a001000001dTgUv';
        timezones.push(timezone);

        timezone = {};
        timezone.Name = 'Pacific Standard Time / Pacific Time';
        timezone.Short_Name__c = 'PST';
        timezone.Region__c = 'America';
        timezone.City_or_State__c = 'Tijuana';
        timezone.Country__c = 'Mexico';
        timezone.GMT_Offset_in_Minutes__c = -600;
        timezone.Type__c = 'Daylight Saving Time';
        timezone.Id = 'a001000001dTFrQ';
        timezones.push(timezone);
        return timezones;


        // timezone.DST_End_Date__c = '';
        // timezone.DST_State_Date__c = '';
        // timezone.DST_Timezone_Offset_in_Minutes__c = '';
        // timezone.Is_DST_Active__c = '';
        // timezone.Id = '';
    }
    $rootScope.timezones = $scope.getTimeZones();
});


var openDiv = function (divId) {
    document.getElementById(divId).style.display = 'inline-block';
}
var closeDiv = function (divId) {
    document.getElementById(divId).style.display = 'none';
}
var divCount = 0;
var addContact = function () {
    if (divCount < 5) {
        createContact('div-' + divCount);
        divCount++;
    }
}
var removeContact = function () {

}
var createContact = async function (divId) {
    var div = document.createElement('div');
    div.className = 'schedule-contacts-element';
    div.id = divId;
    var innerDiv = document.createElement('div');
    innerDiv.id = "inner-" + divId;
    innerDiv.className = 'schedule-contacts-element-content';
    innerDiv.draggable = true;
    innerDiv.setAttribute('ondragstart', 'drag(event)');
    innerDiv.innerHTML = await readContactHTML();
    div.appendChild(innerDiv);
    div.setAttribute('ondragover', "allowDrop(event)");
    div.setAttribute('ondrop', "drop(event)");
    document.getElementById('schedule-contacts').appendChild(div);
}


var allowDrop = function (event) {
    event.preventDefault();
}

var drag = function (event) {
    event.dataTransfer.setData('sourceId', event.target.id);
}

var drop = function (event) {
    event.preventDefault();
    var elementToMove;

    var sourceId = event.dataTransfer.getData('sourceId');
    var sourceElement = document.getElementById(sourceId);
    var sourceElementParent = sourceElement.parentElement;

    var destinationId = event.target.id;
    var destinationElement = event.target;
    var destinationElementParent = destinationElement.parentElement;

    if (destinationElement.draggable == false) {
        destinationElement.appendChild(sourceElement);
        sourceElementParent.appendChild(destinationElement.children[0]);
    }
    else {
        destinationElementParent.appendChild(sourceElement);
        sourceElementParent.appendChild(destinationElement);
    }
}

var readContactHTML = function () {
    var htmlFile = new XMLHttpRequest();
    htmlFile.open('GET', 'contact.html', true);
    htmlFile.onreadystatechange = function () {
        if (htmlFile.readyState === 4) {
            if (htmlFile.status === 200 || htmlFile.status == 0) {
                htmlFile.send(htmlFile.responseText);
            }
        }
    }
    // htmlFile.send(htmlFile.responseText);
}