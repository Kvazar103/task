import {LightningElement,track,wire,api} from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ContactList extends LightningElement {
    @api contact;
    @track contacts=[];

    columns=[
        { label: 'First Name', fieldName:'FirstName',type:'text'},
        { label: 'Last Name', fieldName:'LastName',type:'text'},
        { label: 'Login', fieldName:'Login__c',type:'text'},
        { label: 'Password', fieldName:'Password__c',type:'text'}
    ]

    @api
    addContact(newContact) {
        this.contacts = [...this.contacts, newContact];
    }

    @wire(getContacts)
    wiredContacts({error,data}){
        if(data){
            this.contacts=data;
        }else if(error){
            console.log("Error getContacts: ",error);
        }
    }
}