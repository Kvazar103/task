import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { subscribe ,MessageContext } from "lightning/messageService";

import CONTACT_CHANNEL from '@salesforce/messageChannel/contactMessageChannel__c';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ContactList extends LightningElement {

    @track contacts = [];

    @wire(MessageContext)
    messageContext;

    columns = [
        { label: 'First Name', fieldName: 'FirstName', type: 'text'},
        { label: 'Last Name', fieldName: 'LastName', type: 'text'},
        { label: 'Login', fieldName: 'Login__c', type: 'text'},
        { label: 'Password', fieldName: 'Password__c', type: 'text'}
    ]

    connectedCallback() {
        subscribe(this.messageContext, CONTACT_CHANNEL, (message) => {
            this.addContact(message.contact);
        })
    }

    @wire(getContacts)
    wiredContacts({data,error}) {
        if (data) {
            this.contacts = data;
        }else if (error) {
            this.showToast('Error fetch contacts','Error with status code:'+error.status +" " +error.statusText,'error')
        }
    }

    addContact(newContact) {
        this.contacts = [...this.contacts, newContact];
    }

    showToast(title, message, variant){
        this.dispatchEvent(new ShowToastEvent({
            title:title,
            message:message,
            variant:variant
        }));
    }
}