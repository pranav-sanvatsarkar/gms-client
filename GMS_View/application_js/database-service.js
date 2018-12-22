var databaseService = angular.module('dbService',[]);
databaseService.service('$database',function($q){
    var onerror = function(event){
        console.log(event);
    }
    var onsuccess = function(event){
        console.log(event);
    }
    this.initialize = function(){
        var deferred = $q.defer();
        var request = window.indexedDB.open('gms',3);
        request.onerror = function(event){
            deferred.resolve(event);
        }
        request.onsuccess = function(event){
            var db = event.target.result;
            deferred.resolve(db);
        }
        request.onupgradeneeded = function(event){
            var db = event.target.result;
            
            var contacts = db.createObjectStore('contacts',{ keyPath : 'External_Id__c' });
            contacts.createIndex('Id','Id',{ unique : true });
            contacts.createIndex('FirstName','FirstName',{ unique : false });
            contacts.createIndex('LastName','LastName',{ unique : false });
            contacts.createIndex('Timezone__c','Timezone__c',{ unique : false });
            contacts.createIndex('Email','Email',{ unique : false });
            contacts.createIndex('Account','Account',{ unique : false });
            contacts.onerror = onerror;
            contacts.onsuccess = onsuccess;

            var accounts = db.createObjectStore('accounts',{ keyPath : 'SSO_User_Id__c' });
            accounts.createIndex('Id','Id',{ unique : false });
            accounts.createIndex('First_Name__c','First_Name__c',{ unique : false });
            accounts.createIndex('Last_Name__c','Last_Name__c',{ unique : false });
            accounts.createIndex('Timezone__c','Timezone__c',{ unique : false });
            accounts.onerror = onerror;
            accounts.onsuccess = onsuccess;
            
            deferred.resolve(db);
        }
        return deferred.promise;
    }
    this.insertObjects = function( apiName, lstObjects ){
        try{
            var deferred = $q.defer();
            if( apiName ){
                if( lstObjects && lstObjects.length > 0 ){
                    this.initialize().then(function(result){
                        var database = result;
                        var arrRequest = [];
                        var requestCount = 0;
                        for( var index = 0; index < lstObjects.length; index ++ )
                        {
                            arrRequest[index] = database.transaction(apiName,'readwrite').objectStore(apiName).add(lstObjects[index]);
                            arrRequest[index].onsuccess = function(event){
                                requestCount++;
                                if( requestCount >= lstObjects.length )
                                    deferred.resolve(arrRequest);
                            }
                            arrRequest[index].onerror = function(event){
                                deferred.reject(arrRequest);
                            }
                        }

                    });
                }
            }
            return deferred.promise;
        }
        catch(ex){
            return ex;
        }
    }
    this.generateUID = function(){
        var guid = function(){
            var s4 = function(){
                return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
        return guid();
    }
});