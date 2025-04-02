import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_FIRSTNAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LASTNAME from '@salesforce/schema/Contact.LastName';
import CONTACT_LOGIN from '@salesforce/schema/Contact.Login__c';
import CONTACT_PASSWORD from '@salesforce/schema/Contact.Password__c';

export default class CreateContactModal extends LightningElement {

    firstName = '';
    lastName = '';
    login = '';
    password = '';

    handleChange(event) {
        const fieldName = event.target.dataset.field;
        this[fieldName] = event.target.value;
    }

    handleSave() {
        const fields={};

        fields[CONTACT_FIRSTNAME.fieldApiName]=this.firstName;
        fields[CONTACT_LASTNAME.fieldApiName]=this.lastName;
        fields[CONTACT_LOGIN.fieldApiName]=this.login;
        fields[CONTACT_PASSWORD.fieldApiName]=this.password;

        const recordInput={apiName:CONTACT_OBJECT.objectApiName,fields};

        createRecord(recordInput)
            .then(()=>{
                this.dispatchEvent(new CustomEvent('contactcreated',{
                    detail:{
                        FirstName:this.firstName,
                        LastName:this.lastName,
                        Login__c:this.login,
                        Password__c:this.password,
                    },
                    bubbles: true,
                    composed: true
                }));
                this.closeModal();
            })
            .catch((error)=>{
                console.log("Error creating contact: ",error);
            })

    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('close'))
    }
}