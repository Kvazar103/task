@IsTest
public class TestDataFactory {

    public static Contact createContact(Boolean doInsert) {

        Contact contact = new Contact(
                FirstName = 'Test',
                LastName = 'Test',
                Login__c = 'TestLogin',
                Password__c = 'TestPassword'
        );

        if (doInsert) {
            insert contact;
        }

        return contact;
    }

    public static Contact createContactWithoutLoginAndPassword(Boolean doInsert) {

        Contact contact = new Contact(
                FirstName = 'Test',
                LastName = 'Test'
        );

        if (doInsert) {
            insert contact;
        }

        return contact;
    }
}