@IsTest
private class ContactControllerTest {

    @IsTest
    private static void testCreateContact() {

        Contact contact = TestDataFactory.createContact(false);

        Test.startTest();
        ContactController.createContact(contact);
        Test.stopTest();

        Contact result = [SELECT Id,LastName FROM Contact LIMIT 1];

        Assert.isTrue(result!=null);
        Assert.areEqual(result.LastName,'Test');

    }

    @IsTest
    private static void testGetContacts(){

        for (Integer i = 0; i < 3; i++) {
            TestDataFactory.createContact(true);
        }

        Test.startTest();
        List<Contact> contacts = ContactController.getContacts();
        Test.stopTest();

        Assert.isTrue(contacts.size()==3);
    }

    @IsTest
    private static void testHasContactLoginAndPassword() {

        Contact contact = TestDataFactory.createContact(true);

        Test.startTest();
        Boolean result = ContactController.hasContactLoginAndPassword(contact.Login__c, contact.Password__c);
        Test.stopTest();

        Assert.isTrue(result);

    }

    @IsTest
    private static void testHasNoContactLoginAndPassword() {

        Test.startTest();
        Boolean result = ContactController.hasContactLoginAndPassword('falseLogin', 'falsePassword');
        Test.stopTest();

        Assert.isFalse(result);

    }
}