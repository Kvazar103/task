public with sharing class ContactService {

    public static void createContact(Contact contact) {

        if(contact != null){
            insert contact;
        }
    }

    public static Boolean hasContactLoginAndPassword(String login, String password) {

        try {
            Contact contact = ContactSelector.getContactByLogin(login);

            if(contact == null){
                return false;
            }

            return contact.Password__c == password;

        } catch (QueryException e) {
            return false;
        }

    }
}