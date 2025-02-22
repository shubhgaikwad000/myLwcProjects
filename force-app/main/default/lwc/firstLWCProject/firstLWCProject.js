import { LightningElement, track } from 'lwc';

export default class FirstLWCProject extends LightningElement {

    @track number1;
    @track number2;
    result;


    changeNumber1(event){
        this.number1 = parseInt(event.target.value);
        console.log(this.number1);
    }
    changeNumber2(event){
        this.number2 = parseInt(event.target.value);
        console.log(this.number2);
    }

    handleClickAdition(){
            this.result = parseInt(this.number1) + parseInt(this.number2);
            console.log(this.result);
    }
    handleClickSubtraction(){
        this.result = parseInt(this.number1) - parseInt(this.number2);
        console.log(this.result);
    }
    handleClickMultiplication(){
        this.result = parseInt(this.number1) * parseInt(this.number2);
        console.log(this.result);
    }
    handleClickDivision(){
        this.result = parseInt(this.number1) / parseInt(this.number2);
        console.log(this.result);
    }

}