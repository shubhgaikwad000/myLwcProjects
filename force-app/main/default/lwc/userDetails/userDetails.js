import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import UserMessageChannel from '@salesforce/messageChannel/UserMessageChannel__c';

export default class UserDetailsPage extends LightningElement {
    name;
    email;
    phone;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.loadStoredData();  // Load data from sessionStorage first
        this.subscribeToMessageChannel();  // Then listen for new messages
    }

    subscribeToMessageChannel() {
        subscribe(this.messageContext, UserMessageChannel, (message) => {
            this.handleMessage(message);
        });
    }

    handleMessage(message) {
        this.name = message?.name || '';
        this.email = message?.email || '';
        this.phone = message?.phone || '';

        // Store data in sessionStorage
        const userDetails = {
            name: this.name,
            email: this.email,
            phone: this.phone
        };

        sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
    }

    loadStoredData() {
        // Retrieve data from sessionStorage
        const storedData = sessionStorage.getItem('userDetails');

        if (storedData) {
            const userDetails = JSON.parse(storedData);
            
            this.name = userDetails?.name || '';
            this.email = userDetails?.email || '';
            this.phone = userDetails?.phone || '';
        }
    }
}
