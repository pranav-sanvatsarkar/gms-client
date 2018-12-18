var gmsApp = angular.module('gmsApp',['contactForm']);
gmsApp.controller('gmsAppController', function($scope,$compile){
    $scope.value = 'Pronow';
    
    $scope.contacts = [];
    
    $scope.divCounter = 0;

    $scope.addContact = function(){
        if( $scope.divCounter < 5 )
        {
            var newContactWrapper = $scope.contact();
            $scope.contacts.push( newContactWrapper );
            $scope.createContact('div-' + $scope.divCounter);
            $scope.divCounter++;
        }
    }
    
    $scope.createContact = function(divId){
        var div = document.createElement('div');
        div.className = 'schedule-contacts-element';
        div.id = divId;
        var innerDiv = document.createElement('div');
        innerDiv.id = "inner-" + divId;
        innerDiv.className = 'schedule-contacts-element-content';
        innerDiv.draggable = true;
        innerDiv.setAttribute('ondragstart', 'drag(event)');
        $scope.contactWrapper = JSON.stringify($scope.contacts[$scope.divCounter].contact);

        var newElement = $compile('<contact-form contact="contactWrapper"/>')($scope);
        //$scope.$apply();
        //innerDiv.appendChild();
        div.appendChild(innerDiv);
        angular.element(innerDiv).append(newElement);
        div.setAttribute('ondragover', "allowDrop(event)");
        div.setAttribute('ondrop', "drop(event)");
        document.getElementById('schedule-contacts').appendChild(div);
    }

    $scope.contact = function(){
        var contact = {};
        contact.Id = '123';
        contact.FirstName = '';
        contact.Lastname = '';
        var timeZone = {};
        timeZone.Id = '';
        timeZone.Name = '';
        var contactWrapper = {};
        contactWrapper.contact = contact;
        contactWrapper.timeZone = timeZone;
        return contactWrapper;
    }
});


var openDiv = function (divId) {
    document.getElementById(divId).style.display = 'inline-block';
}
var closeDiv = function (divId) {
    document.getElementById(divId).style.display = 'none';
}
var divCount = 0;
var addContact = function () {
    if( divCount < 5 )
    {
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

    if( destinationElement.draggable == false )
    {
        destinationElement.appendChild(sourceElement);
        sourceElementParent.appendChild(destinationElement.children[0]);
    }
    else
    {
        destinationElementParent.appendChild(sourceElement);
        sourceElementParent.appendChild(destinationElement);
    }
}

var readContactHTML = function(){
    var htmlFile = new XMLHttpRequest();
    htmlFile.open('GET', 'contact.html',true);
    htmlFile.onreadystatechange = function(){
        if( htmlFile.readyState === 4 ){
            if( htmlFile.status === 200 || htmlFile.status == 0 ){
                htmlFile.send(htmlFile.responseText);
            }
        }
    }
    // htmlFile.send(htmlFile.responseText);
}