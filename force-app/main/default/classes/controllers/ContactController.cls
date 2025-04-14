public with sharing class ContactController {

    @AuraEnabled
    public static void createContact(Contact contact) {
        ContactService.createContact(contact);
    }

    @AuraEnabled(Cacheable=true)
    public static List<Contact> getContacts() {
        return ContactSelector.getAllContactWithLogin();
    }

    @AuraEnabled
    public static Boolean hasContactLoginAndPassword(String login, String password) {
        return ContactService.hasContactLoginAndPassword(login,password);
    }

}