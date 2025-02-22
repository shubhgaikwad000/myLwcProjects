import { LightningElement ,track } from 'lwc';
import searchList from '@salesforce/apex/agentSearchLwc.searchList';
export default class LwcAgent extends LightningElement {

    @track records;
    @track error;
    @track searchName = '';


    @track columns = 
    [   { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Email', fieldName: 'Agent_email__c', type: 'email' },
        { label: 'Phone', fieldName: 'Agent_phone__c', type: 'phone' },
        { label: 'Country', fieldName: 'Country__c', type: 'text' },
        { label: 'State', fieldName: 'State__c', type: 'text' }];


    handleNameChange(event){
        this.searchName=(event.target.value);
        console.log(this.searchName);
    }

        handleClick() {
            if (!this.searchName.trim()) {
                this.error = 'Please enter a valid search name.';
                this.records = null;
               return;
            }

            searchList({searchName: this.searchName})
                .then((result) => {
                    this.records = result;
                    this.error = null;
                })
                .catch((error) => {
                    this.records = null;
                    this.error = 'An error occurred while fetching records.';
                    console.error(error);
                });
        }
}
