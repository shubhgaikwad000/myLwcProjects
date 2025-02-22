import { LightningElement, track } from 'lwc';
import getLoanStatus from '@salesforce/apex/LoanStatusController.getLoanStatus';

export default class LoanStatus extends LightningElement {
    @track loanId = '';
    @track loanStatus;
    @track error;

    handleLoanIdChange(event) {
        this.loanId = event.target.value;
    }

    fetchLoanStatus() {
        if (!this.loanId) {
            this.error = 'Please enter a Loan ID.';
            this.loanStatus = null;
            return;
        }

        this.loanStatus = null;
        this.error = null;

        getLoanStatus({ loanId: this.loanId })
            .then(result => {
                this.loanStatus = result.Loan_Status__c;
                this.error = null;
            })
            .catch(error => {
                this.loanStatus = null;
                this.error = 'Failed to fetch loan status. Please try again.';
                console.error('Error fetching loan status:', error);
            });
    }
}