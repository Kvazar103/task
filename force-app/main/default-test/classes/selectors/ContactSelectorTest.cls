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

        Assert.areEqual(3, contacts.size());

        for (Contact contact: contacts) {
            Assert.isNotNull(contact.Login__c);
        }

    }

    @IsTest
    static void testGetContactByLogin() {

        Contact contact = [SELECT Id, Login__c FROM Contact LIMIT 1];

        Test.startTest();
        Contact contactByLogin = ContactSelector.getContactByLogin(contact.Login__c);
        Test.stopTest();

        Assert.isNotNull(contactByLogin);
        Assert.areEqual(contactByLogin.Login__c, contact.Login__c);
    }
}