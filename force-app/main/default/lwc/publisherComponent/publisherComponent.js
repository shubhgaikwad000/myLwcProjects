import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SIMPLE_MESSAGE_CHANNEL from '@salesforce/messageChannel/simpleMessageChannel__c';

export default class PublisherComponent extends LightningElement {
    message = 'Hello from Publisher!';

    @wire(MessageContext)
    messageContext;

    handleSendMessage() {
        const payload = { messageText: this.message };
        publish(this.messageContext, SIMPLE_MESSAGE_CHANNEL, payload);
    }
}
