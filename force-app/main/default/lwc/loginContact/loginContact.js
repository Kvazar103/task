import {LightningElement} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import checkContactLoginAndPassword from '@salesforce/apex/ContactController.checkContactLoginAndPassword';

export default class LoginContact extends LightningElement {

    login=''
    password=''

    handleChange(event) {
        const fieldName = event.target.dataset.field;
        this[fieldName] = event.target.value;
    }

    handleLogin(){
        checkContactLoginAndPassword({ login: this.login, password: this.password })
            .then(result => {
                if (result) {
                    this.showToast('Login success!','You have logged in!','success');
                    this.closeModal();
                } else {
                    this.showToast('Login failed.','Invalid login or password.','error');
                }
            })
            .catch(error => {
                console.log('Error: ',error);
                this.showToast('Error','Something went wrong. Contact your system administrator for more info.','error');
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