const { ipcRenderer } = require('electron');

ipcRenderer.on('getAccountsResponse', function( event, arg ){
    updateDivWithResponse(arg);
})

var updateDivWithResponse = function(arg)
{
    //alert(1);
    var responseDiv = document.getElementById('apiResponse');
    var paragraph = document.createElement('p');
    paragraph.innerText = arg;
    responseDiv.appendChild(paragraph);
}

process.once('loaded', () => {
    global.getAccounts = getAccounts;
});


var getAccounts = function()
{
    ipcRenderer.send('getAccounts');
}