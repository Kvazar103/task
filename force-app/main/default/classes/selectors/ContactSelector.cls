public with sharing class ContactSelector {

    public static List<Contact> getAllContactWithLogin() {
        return [
                SELECT Id, FirstName, LastName, Login__c, Password__c
                FROM Contact
                WHERE Login__c != NULL
        ];
    }

    public static Contact getContactByLogin(String contactLogin) {
        return [
                SELECT Id, Login__c, Password__c FROM Contact
                WHERE Login__c =: contactLogin
                LIMIT 1
        ];
    }
}