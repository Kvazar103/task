import {LightningElement} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import hasContactLoginAndPassword from '@salesforce/apex/ContactController.hasContactLoginAndPassword';

export default class LoginContact extends LightningElement {

    login = null
    password = null

    handleChange(event) {
        const fieldName = event.target.dataset.field;
        this[fieldName] = event.target.value;
    }

    handleLogin(){
        hasContactLoginAndPassword({ login: this.login, password: this.password })
            .then(result => {
                if (result) {
                    this.showToast('Login success!','You have logged in!','success');
                    this.closeModal();
                } else {
                    this.showToast('Login failed.','Invalid login or password.','error');
                }
            })
            .catch(error => {
                this.showToast('Error','Error with status code:'+error.status +" " +error.statusText,'error');
            })
    }

    showToast(title, message, variant){
        this.dispatchEvent(new ShowToastEvent({
            title:title,
            message:message,
            variant:variant
        }));
    }

    closeModal(){
        this.dispatchEvent(new CustomEvent('close'))
    }
}