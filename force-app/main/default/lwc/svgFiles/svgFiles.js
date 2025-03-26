import {LightningElement,api} from 'lwc';

export default class SvgFiles extends LightningElement {
    @api name;

    get isNexcentIcon(){
        return this.name === 'nexcentIcon';
    }

    get isInstagramIcon(){
        return this.name === 'instagramIcon';
    }

    get isDribbbleIcon(){
        return this.name === 'dribbbleIcon';
    }

    get isTwitterIcon(){
        return this.name === 'twitterIcon';
    }

    get isYoutubeIcon(){
        return this.name === 'youtubeIcon';
    }

    get isEmailSentIcon(){
        return this.name === 'emailSentIcon';
    }

    get isMembersIcon(){
        return this.name === 'membersIcon';
    }

    get isEventBookingIcon(){
        return this.name === 'eventBookingIcon';
    }

    get isClubIcon(){
        return this.name === 'clubIcon';
    }

    get isPaymentIcon(){
        return this.name === 'paymentIcon';
    }

    get isPhoneImage(){
        return this.name === 'phoneImage'
    }

    get isMembershipOrganisationIcon(){
        return this.name === 'membershipOrganisationsIcon';
    }

    get isNationalAssociationsIcon(){
        return this.name === 'nationalAssociationsIcon';
    }

    get isClubsAndGroupsIcon(){
        return this.name === 'clubsAndGroupsIcon';
    }

    get isMeetAllCustomersFirstLogo(){
        return this.name === 'firstLogo';
    }

    get isMeetAllCustomersFirstLogoBlack(){
        return this.name === 'firstLogoBlack';
    }

    get isMeetAllCustomersSecondLogo(){
        return this.name === 'secondLogo';
    }

    get isMeetAllCustomersThirdLogo(){
        return this.name === 'thirdLogo';
    }

    get isMeetAllCustomersFourthLogo(){
        return this.name === 'fourthLogo';
    }

    get isMeetAllCustomersFifthLogo(){
        return this.name === 'fifthLogo';
    }

    get isMeetAllCustomersSixthLogo(){
        return this.name === 'sixthLogo';
    }

    get isPixelGradeImage(){
        return this.name === 'pixelGradeImage';
    }
}