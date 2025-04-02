public with sharing class ContactController {
    @AuraEnabled
    public static void createContact(String firstName, String lastName, String login, String password) {
        Contact newContact = new Contact(
                FirstName = firstName,
                LastName = lastName,
                Login__c = login,
                Password__c = password
        );
        insert newContact;
    }

    @AuraEnabled(Cacheable=true)
    public static List<Contact> getContacts(){
        return [SELECT Id,FirstName,LastName,Login__c,Password__c FROM Contact WHERE Login__c!=NULL];
    }

    @AuraEnabled(Cacheable=false)
    public static Boolean checkContactLoginAndPassword(String login,String password){
        Contact contact=[
                SELECT Id,Login__c,Password__c FROM Contact
                WHERE Login__c=:login
                LIMIT 1
        ];

        if (contact==null) {
            return false;
        }

        return contact.Password__c == password;
    }

}