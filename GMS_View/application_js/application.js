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
var createContact = function (divId) {
    var div = document.createElement('div');
    div.className = 'schedule-contacts-element';
    div.id = divId;
    var innerDiv = document.createElement('div');
    innerDiv.id = "inner-" + divId;
    innerDiv.className = 'schedule-contacts-element-content';
    innerDiv.draggable = true;
    innerDiv.innerHTML = '<p>' + divId + '</div>';
    innerDiv.setAttribute('ondragstart', 'drag(event)');
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