var objectProvider = angular.module('objectService', []);
objectProvider.service('$object', function () {
    this.getContact = function (Id, FirstName, LastName, Timezone__c, Email, External_Id__c, Account) {
        var contact = {};
        contact.Id = Id;
        contact.FirstName = FirstName;
        contact.LastName = LastName;
        contact.Timezone__c = Timezone__c;
        contact.Email = Email;
        contact.External_Id__c = External_Id__c;
        contact.Account = Account;
        return contact;
    }
    this.getContact = function () {
        var contact = {};
        contact.Id = this.generateUID();
        contact.FirstName;
        contact.LastName;
        contact.Timezone__c;
        contact.Email;
        contact.External_Id__c = this.generateUID();
        contact.Account;
        return contact;
    }
    this.getAccount = function(Id, First_Name__c, Last_Name__c, SSO_User_Id__c, Timezone__c){
        var account = {};
        account.Id = Id;
        account.First_Name__c = FirstName;
        account.Last_Name__c = Last_Name__c;
        account.SSO_User_Id__c = SSO_User_Id__c;
        account.Timezone__c = Timezone__c;
        return account;
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