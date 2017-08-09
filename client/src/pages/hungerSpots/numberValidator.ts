import { FormControl } from '@angular/forms';

export class numberValidation{

    static isValid(control:FormControl):any{
        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }
        if(control.value % 1 !== 0){
            return {
                "not a whole number": true
            };
        }
        if (control.value > 10000){
            return {
                "not realistic": true
            };
        }
        return null;
    }
}