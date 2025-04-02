import {LightningElement,api} from 'lwc';

export default class OurClients extends LightningElement {
    @api contact;

    renderedCallback() {
        this.handleAddContact();
    }

    handleAddContact() {
        const contactList = this.template.querySelector('c-contact-list');
        if (contactList) {
            contactList.addContact(this.contact);
        }
    }
}