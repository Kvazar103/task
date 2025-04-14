@IsTest
private class ContactServiceTest {

    @IsTest
    static void testCreateContact() {

        Contact contact = TestDataFactory.createContact(false);

        Test.startTest();
        ContactService.createContact(contact);
        Test.stopTest();

        Assert.areEqual(1,[SELECT COUNT() FROM Contact]);
    }

    @IsTest
    static void testHasContactLoginAndPassword() {

        Contact contact = TestDataFactory.createContact(true);

        Test.startTest();
        Boolean result = ContactService.hasContactLoginAndPassword(contact.Login__c, contact.Password__c);
        Test.stopTest();

        Assert.isTrue(result);
    }

    @IsTest
    static void testHasNoContactLoginAndPassword() {

        Test.startTest();
        Boolean result = ContactService.hasContactLoginAndPassword('falseLogin', 'falsePassword');
        Test.stopTest();

        Assert.isFalse(result);
    }
}