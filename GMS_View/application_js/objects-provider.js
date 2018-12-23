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
    this.getSampleTimezones = function(){
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
    }
});