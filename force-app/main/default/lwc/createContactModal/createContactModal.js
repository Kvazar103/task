import { LightningElement, wire  } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { publish, MessageContext } from 'lightning/messageService';

import CONTACT_CHANNEL from '@salesforce/messageChannel/contactMessageChannel__c';
import createContact from '@salesforce/apex/ContactController.createContact'

export default class CreateContactModal extends LightningElement {

    @wire(MessageContext)
    messageContext;

    isLoading = false;

    contact = {
        FirstName: null,
        LastName: null,
        Login__c: null,
        Password__c: null
    }

    onChange(event) {
        const fieldName = event.target.dataset.field;
        const value = event.target.value;

        switch (fieldName) {
            case 'FirstName':
                this.contact["FirstName"] = value;
                break;
            case 'LastName':
                this.contact["LastName"] = value;
                break;
            case 'Login__c':
                this.contact["Login__c"] = value;
                break;
            case 'Password__c':
                this.contact["Password__c"] = value;
                break;
            default:
                this.showToast('Error', 'Unknown field name:' + fieldName, 'error');
        }
    }

    async handleSave() {
        this.isLoading = true;
        const hasNullOrEmptyField = Object.values(this.contact).some(field => !field || field.trim() === '');

        if (hasNullOrEmptyField) {
            this.showToast('Error!','Contact fields cannot be empty.','error');
            this.isLoading = false;
            return;
        }

        try {

            await createContact({contact: this.contact});

            const newContact = {
                FirstName: this.contact.FirstName,
                LastName: this.contact.LastName,
                Login__c: this.contact.Login__c,
                Password__c: this.contact.Password__c,
            }

            publish(this.messageContext, CONTACT_CHANNEL, { contact: newContact });

            this.showToast('Success!','Contact successfully created!','success');
            this.closeModal();
            this.isLoading = false;

        } catch (error) {
            this.showToast('Error creating contact.','Error with status code:'+error.status +" " +error.statusText,'error');
            this.isLoading = false;

        } finally {
            this.isLoading = false;
        }
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }));
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('close'))
    }
}