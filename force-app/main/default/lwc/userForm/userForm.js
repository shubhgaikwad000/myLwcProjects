import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import { NavigationMixin } from 'lightning/navigation';
import UserMessageChannel from '@salesforce/messageChannel/UserMessageChannel__c';

export default class UserForm extends NavigationMixin(LightningElement) {

    receivedName = '';
    receivedEmail = '';
    receivedPhone = '';


    @wire(MessageContext)
    messageContext;


    handleName(event) {
        this.receivedName = event.target.value;
    }
    handleEmail(event) {
        this.receivedEmail = event.target.value;
    }
    handlePhone(event) {
        this.receivedPhone = event.target.value;
    }
    handleSubmit() {
        const payload = {
            name: this.receivedName,
            email: this.receivedEmail,
            phone: this.receivedPhone
        };


        // Store data in sessionStorage
            sessionStorage.setItem('userDetails', JSON.stringify(payload));


        // Publish data to LMS
        publish(this.messageContext, UserMessageChannel, payload);
        console.log('Message Published:', payload);


        // Navigate to the Lightning App Page
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/lightning/n/detailsPage' // Actual page URL            
            }

        });
    }
}
