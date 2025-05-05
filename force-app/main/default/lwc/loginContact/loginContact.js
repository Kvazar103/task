import {LightningElement} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import hasContactLoginAndPassword from '@salesforce/apex/ContactController.hasContactLoginAndPassword';

export default class LoginContact extends LightningElement {

    login = null;
    password = null;

    handleChange(event) {
        const fieldName = event.target.dataset.field;
        const value = event.target.value;

        switch (fieldName) {
            case 'login':
                this.login = value;
                break;
            case 'password':
                this.password = value;
                break;
            default:
                this.showToast('Error', 'Unknown field name:' + fieldName, 'error');
        }
    }

    async handleLogin() {
        try {
            const result = await hasContactLoginAndPassword({ login: this.login, password: this.password });

            if (result) {
                this.showToast('Login success!','You have logged in!','success');
                this.closeModal();
            } else {
                this.showToast('Login failed.','Invalid login or password.','error');
            }

        } catch (error) {
            this.showToast('Error','Error with status code:'+error.status +" " +error.statusText,'error');
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