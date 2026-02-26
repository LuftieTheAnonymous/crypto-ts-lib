import { Helpers } from "../../utilities/helpers";
import { modularMath, OperandType } from "../../utilities/modularMaths";

type OTPInput = string | OperandType;

class OTP{
    constructor(){}

    static private generateKey(keyLength:number){
        const randomGeneratedKey = crypto.getRandomValues();
    }

    static encrypt(input:OTPInput){

        const generateKeyInput = typeof input === 'string' ? input.length : Helpers.turnIntoBinary(modularMath.toInteger(input)).length;
        const keyGenerated = this.generateKey();


    }

static decrypt(input:OperandType, ouputType: 'string' | 'bigint' | 'integer'):OTPInput{}

}

