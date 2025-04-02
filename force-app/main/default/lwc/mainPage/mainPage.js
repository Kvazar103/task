import { LightningElement } from 'lwc';

export default class MainPage extends LightningElement {
    contact;

    handleContactCreation(event){
        this.contact=event.detail;
    }
}