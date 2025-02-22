import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import SIMPLE_MESSAGE_CHANNEL from '@salesforce/messageChannel/simpleMessageChannel__c';

export default class SubscriberComponent extends LightningElement {
    receivedMessage = 'No message received yet';

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        subscribe(this.messageContext, SIMPLE_MESSAGE_CHANNEL, (message) => {
            this.receivedMessage = message.messageText;
        });
    }
}
