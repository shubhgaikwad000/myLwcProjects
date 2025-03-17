import { LightningElement, wire, track } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import UserMessageChannel from '@salesforce/messageChannel/UserMessageChannel__c';

export default class UserDetailsPage extends LightningElement {
    @track userName = ''; // Changed name to userName
    @track userEmail = ''; // Changed email to userEmail
    @track userPhone = ''; // Changed phone to userPhone
    subscription = null; // Store the subscription reference

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.loadStoredData();  // Load data from sessionStorage first
        this.subscribeToMessageChannel();  // Then listen for new messages
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {  // Avoid duplicate subscriptions
            this.subscription = subscribe(this.messageContext, UserMessageChannel, (message) => {
                this.handleMessage(message);
            });
        }
    }

    handleMessage(message) {
        this.userName = message?.name || ''; // Updated to userName
        this.userEmail = message?.email || ''; // Updated to userEmail
        this.userPhone = message?.phone || ''; // Updated to userPhone

        this.storeDataInSession(); // Store the updated data
    }

    loadStoredData() {
        try {
            const storedData = sessionStorage.getItem('userDetails');
            if (storedData) {
                const userDetails = JSON.parse(storedData);
                this.userName = userDetails?.name || ''; // Updated to userName
                this.userEmail = userDetails?.email || ''; // Updated to userEmail
                this.userPhone = userDetails?.phone || ''; // Updated to userPhone
            }
        } catch (error) {
            console.error('Error loading sessionStorage data:', error);
        }
    }

    storeDataInSession() {
        try {
            const userDetails = {
                name: this.userName, // Updated to userName
                email: this.userEmail, // Updated to userEmail
                phone: this.userPhone // Updated to userPhone
            };
            sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
        } catch (error) {
            console.error('Error saving to sessionStorage:', error);
        }
    }

    disconnectedCallback() {
        if (this.subscription) {
            unsubscribe(this.subscription);
            this.subscription = null;
        }
    }
}
