@IsTest
private class ContactSelectorTest {

    @TestSetup
    static void createTestData() {

        for (Integer i = 0; i < 3; i++) {

            TestDataFactory.createContact(true);
            TestDataFactory.createContactWithoutLoginAndPassword(true);

        }
    }

    @IsTest
    static void testGetAllContactWithLogin() {

        Test.startTest();
        List<Contact> contacts = ContactSelector.getAllContactWithLogin();
        Test.stopTest();

        Assert.isTrue(contacts.size() == 3);

        for (Contact contact: contacts) {
            Assert.isTrue(contact.Login__c != null);
        }

    }

    @IsTest
    static void testGetContactByLogin() {

        Contact contact = [SELECT Id, Login__c FROM Contact LIMIT 1];

        Test.startTest();
        Contact contactByLogin = ContactSelector.getContactByLogin(contact.Login__c);
        Test.stopTest();

        Assert.isTrue(contactByLogin != null);
        Assert.isTrue(contactByLogin.Login__c == contact.Login__c);
    }
}