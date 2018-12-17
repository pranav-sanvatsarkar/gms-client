var isBrowserCompatible = false;
var dbOpenRequest = window.indexedDB.open('members', 4);
// /var db;
// dbOpenRequest.onsuccess = function(event){
//     db = dbOpenRequest.result;
//     alert(db);
// }
var addFormData = function () {
    var data = [{
        id: 001,
        name: 'pranav'
    },
    {
        id: 002,
        name: 'sonal'
    },
    {
        id: 003,
        name: 'devansh'
    }];
    upsert('members', data);
}

var upsert = function (tableName, arrayData) {
    try {
        var dataToUpsert = tableData(tableName, arrayData);
        var database = window.indexedDB.open('gms', 1);
        database.onupgradeneeded = function(event)
        {
            var db = event.target.result;
            var objectStore = db.createObjectStore(tableName, { keyPath : 'id' });
        }
        database.onsuccess = function (event) {
            var db = event.target.result;
            var transaction = db.transaction(tableName, 'readwrite');
            for(var index = 0; index < arrayData.length; index++)
            {
                transaction.objectStore(tableName).add(arrayData[index]);
            }
        }
        database.onerror = function (event) {
            console.log('Error: ' + event.target.error);
        }
    }catch(ex){
        console.log(ex);
    }
}

var tableData = function (tableName, arrayData) {
    var tableData = {};
    tableData.tableName = tableName;
    tableData.arrayData = arrayData;
    return tableData;
}

var checkBrowserCompatibility = function () {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    isBrowserCompatible = true;
    if (!window.indexedDB || !window.IDBTransaction || !window.IDBKeyRange)
        isBrowserCompatible = true;
}

checkBrowserCompatibility();
