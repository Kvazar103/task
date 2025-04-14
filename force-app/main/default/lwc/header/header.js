import { LightningElement } from 'lwc';

export default class Header extends LightningElement {

    isContactCreationModalOpen = false;
    isLoginContactModalOpen = false;

    handleOpenLoginContactModal() {
        this.isLoginContactModalOpen = true;
    }

    handleCloseLoginContactModal() {
        this.isLoginContactModalOpen = false;
    }

    handleOpenContactCreationModal() {
        this.isContactCreationModalOpen = true;
    }

    handleCloseContactCreationModal() {
        this.isContactCreationModalOpen = false;
    }

}