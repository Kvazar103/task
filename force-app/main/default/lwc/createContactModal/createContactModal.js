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
        this.contact[fieldName] = event.target.value;
    }

    handleSave() {
        this.isLoading = true;
        const hasNullOrEmptyField = Object.values(this.contact).some(field => !field || field.trim() === '');

        if (hasNullOrEmptyField) {
            this.showToast('Error!','Contact fields cannot be empty.','error');
            this.isLoading = false;
            return;
        }

        createContact({contact:this.contact})
            .then(() => {
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
            })
            .catch((error)=> {
                this.showToast('Error creating contact.','Error with status code:'+error.status +" " +error.statusText,'error');
                this.isLoading = false;
            })
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        }));
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('close'))
    }
}