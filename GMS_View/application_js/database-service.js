var databaseService = angular.module('dbService', []);
databaseService.service('$database', function ($q) {
    var onerror = function (event) {
        console.log(event);
    }
    var onsuccess = function (event) {
        console.log(event);
    }
    this.initialize = function () {
        var deferred = $q.defer();
        var request = window.indexedDB.open('gms', 3);
        request.onerror = function (event) {
            deferred.resolve(event);
        }
        request.onsuccess = function (event) {
            var db = event.target.result;
            deferred.resolve(db);
        }
        request.onupgradeneeded = function (event) {
            var db = event.target.result;

            var timezones = db.createObjectStore('timezones', { keyPath: 'Id' });
            timezones.createIndex('Name', 'Name', { unique: false });
            timezones.createIndex('City_or_State__c', 'City_or_State__c', { unique: false });
            timezones.createIndex('Country__c', 'Country__c', { unique: false });
            timezones.createIndex('DST_End_Date__c', 'DST_End_Date__c', { unique: false });
            timezones.createIndex('DST_State_Date__c', 'DST_State_Date__c', { unique: false });
            timezones.createIndex('DST_Timezone_Offset_in_Minutes__c', 'DST_Timezone_Offset_in_Minutes__c', { unique: false });
            timezones.createIndex('GMT_Offset_in_Minutes__c', 'GMT_Offset_in_Minutes__c', { unique: false });
            timezones.createIndex('Is_DST_Active__c', 'Is_DST_Active__c', { unique: false });
            timezones.createIndex('Region__c', 'Region__c', { unique: false });
            timezones.createIndex('Short_Name__c', 'Short_Name__c', { unique: false });
            timezones.createIndex('Type__c', 'Type__c', { unique: false });

            var attendeeGroups = db.createObjectStore('attendeeGroups', { keyPath: 'External_Id__c' });
            attendeeGroups.createIndex('Id', 'Id', { unique: false });
            attendeeGroups.createIndex('Attendees__c', 'Attendees__c', { unique: false });
            attendeeGroups.createIndex('Name', 'Name', { unique: false });
            attendeeGroups.createIndex('Account__c', 'Account__c', { unique: false });

            deferred.resolve(db);
        }
        return deferred.promise;
    }
    this.insertObjects = function (apiName, lstObjects) {
        var deferred = $q.defer();
        try {
            if (apiName) {
                if (lstObjects && lstObjects.length > 0) {
                    this.initialize().then(function (result) {
                        var database = result;
                        var arrRequest = [];
                        var requestCount = 0;
                        for (var index = 0; index < lstObjects.length; index++) {
                            arrRequest[index] = database.transaction(apiName, 'readwrite').objectStore(apiName).add(lstObjects[index]);
                            arrRequest[index].onsuccess = function (event) {
                                requestCount++;
                                if (requestCount >= lstObjects.length)
                                    deferred.resolve(arrRequest);
                            }
                            arrRequest[index].onerror = function (event) {
                                deferred.reject(arrRequest);
                            }
                        }

                    });
                }
            }
        }
        catch (ex) {
            deferred.reject(ex);
        }
        return deferred.promise;
    }
    this.updateObjects = function (apiName, lstObjects) {
        var deferred = $q.defer();
        try {
            if (apiName) {
                if (lstObjects && lstObjects.length > 0) {
                    this.initialize().then(function (result) {
                        var database = result;
                        var arrRequest = [];
                        var requestCount = 0;
                        for (var index = 0; index < lstObjects.length; index++) {
                            arrRequest[index] = database.transaction(apiName, 'readwrite').objectStore(apiName).put(lstObjects[index]);
                            arrRequest[index].onsuccess = function (event) {
                                requestCount++;
                                if (requestCount >= lstObjects.length)
                                    deferred.resolve(arrRequest);
                            }
                            arrRequest[index].onerror = function (event) {
                                deferred.reject(arrRequest);
                            }
                        }

                    });
                }
            }
        }
        catch (ex) {
            deferred.reject(ex);
        }
        return deferred.promise;
    }
    this.getAllRecords = function(apiName) {
        var deferred = $q.defer();
        try {
            if( apiName ){
                this.initialize().then(function(result){
                    var database = result;
                    var request = database.transaction( apiName ).objectStore( apiName ).getAll();
                    request.onerror = function(event){
                        deferred.reject(event);
                    }
                    request.onsuccess = function(event){
                        deferred.resolve(event.target.result);
                    }
                });
            }
        }
        catch (ex) {
            deferred.reject(ex);
        }
        return deferred.promise;
    }
    this.generateUID = function () {
        var guid = function () {
            var s4 = function () {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
        return guid();
    }
});