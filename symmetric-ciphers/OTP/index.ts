// TO DO: APPLY RECURSION INSTEAD OF ITERATION IN MULTIPLE CASES

import { Helpers } from "../../utilities/helpers";
import { modularMath, OperandType } from "../../utilities/modularMaths";

type OTPInput = string | OperandType;
export interface EncryptionOutput {
    cipher:string,
    cipherTextInBinary:string,
    cipherInBinaryArray:number[],
    key: KeyGenerationOutput
}


export interface DecryptionOutput{
    plaintext: string | number | bigint,
     key: KeyGenerationOutput
} 


export interface KeyGenerationOutput{
    text:string,
    keyInBinary:string,
    asciiIndecies:Uint8Array<ArrayBuffer>
}

export class OTP{
    constructor(){}

    private static generateKey(keyLength:number):KeyGenerationOutput{
        // Take an array of length 
        const arrayForRandomValue = new Uint8Array(keyLength);
        const randomlyGeneratedValue = crypto.getRandomValues(arrayForRandomValue);

        let textResult:string="";
        let binaryResult:string="";

        for (let index = 0; index < randomlyGeneratedValue.length; index++) {
            const pseudoRandomNumberToBinary = Helpers.turnIntoBinary(randomlyGeneratedValue[index]).padStart(8,"0");
            const character = String.fromCharCode(randomlyGeneratedValue[index]);
            binaryResult += pseudoRandomNumberToBinary;
            textResult += character;
        }
        
        return {
            asciiIndecies:randomlyGeneratedValue,
            keyInBinary:binaryResult,
            text:textResult
        }
        
    }

    static generateKey1(keyLength:number):KeyGenerationOutput{
        return this.generateKey(keyLength);

    }

    static encrypt(input:OTPInput): EncryptionOutput{
        const convertedInput = input.toString();
        const keyGenerated = this.generateKey(convertedInput.length);

        let cipherText:string='';
        let cipherTextInBinary:string='';

        console.log(keyGenerated.text.length === convertedInput.length, "is key equal length to the key");

        for (let index = 0; index < keyGenerated.text.length; index++) {
            let keyBinary = Helpers.turnIntoBinary(keyGenerated.asciiIndecies[index]);
            let inputBinary = Helpers.turnIntoBinary(convertedInput.charCodeAt(index)); 

            keyBinary = keyBinary.padStart(8, "0");
            inputBinary = inputBinary.padStart(8, "0");
            
            for (let j = 0; j < 8; j++) {
                const inputBit = inputBinary[j];
                const keyBit = keyBinary[j];


                cipherTextInBinary += `${modularMath.XOR([modularMath.toInteger(inputBit), modularMath.toInteger(keyBit)])}`;
            }
        }


        let splitIndex:number=0;
        let cipherAsciiIndecies:number[]=[];

        while(splitIndex < cipherTextInBinary.length){
            let splitBinaryPart = Helpers.turnBinaryToDecimal(Number(cipherTextInBinary.slice(splitIndex, splitIndex + 8)));
            cipherAsciiIndecies.push(splitBinaryPart);
            splitIndex += 8;
        }
        

        console.log(cipherAsciiIndecies, 'cipher indicies');

        for (let index = 0; index < cipherAsciiIndecies.length; index++) {
            console.log(index);
            cipherText += String.fromCharCode(cipherAsciiIndecies[index]);
        }

        console.log(cipherText, cipherTextInBinary, "ciphertext + binary");
        
        
        return {
            cipher:cipherText,
            'cipherInBinaryArray':cipherAsciiIndecies,
            cipherTextInBinary,
            key: keyGenerated
        }

    }

static decrypt(cipher: string, key: KeyGenerationOutput, outputType: 'string' | 'bigint' | 'integer'): DecryptionOutput {
    // Ensure both have the same length by padding to the longer one
    const maxLength = Math.max(cipher.length, key.keyInBinary.length);
    const paddedCipher = cipher.padStart(maxLength, "0");
    const paddedKey = key.keyInBinary.padStart(maxLength, "0");

    let outputBinary: string = "";
    let outputBinaryArray: number[] = [];
    let plaintextOutput: string = "";

    // XOR bit by bit
    for (let i = 0; i < paddedCipher.length; i++) {
        const cipherBit = modularMath.toInteger(paddedCipher[i]);
        const keyBit = modularMath.toInteger(paddedKey[i]);
        outputBinary += `${modularMath.XOR([cipherBit, keyBit])}`;
    }

    // Convert binary string to bytes (8-bit chunks)
    for (let i = 0; i < outputBinary.length; i += 8) {
        const binaryChunk = outputBinary.slice(i, i + 8);
        if (binaryChunk.length === 8) { // Only process complete bytes
            const decimalValue = parseInt(binaryChunk, 2); // Convert binary string to decimal
            outputBinaryArray.push(decimalValue);
        }
    }

    for (let index = 0; index < outputBinaryArray.length; index++) {
        const letter = String.fromCharCode(outputBinaryArray[index]);
        plaintextOutput += letter;
    }

    switch (outputType) {
        case 'string': {
            return { key, 'plaintext': plaintextOutput };
        }
        case 'bigint': {
            return { key, 'plaintext': modularMath.toBigInt(plaintextOutput) };
        }
        case 'integer': {
            return { key, 'plaintext': modularMath.toInteger(plaintextOutput) };
        }
        default:
            throw new Error("Invalid parameter has been provided.");
    }
}


}



const encryptedMessage = OTP.encrypt("Jobited is the best crypto community");



console.log(encryptedMessage.cipher.length, "cipher length");
console.log(encryptedMessage.cipherTextInBinary.length, "cipher in binary");
console.log(encryptedMessage.key.keyInBinary.length, "Key in binary length");
console.log(encryptedMessage.key.text.length, "key in binary length");

const decryptedMessage = OTP.decrypt(encryptedMessage.cipherTextInBinary, encryptedMessage.key, 'string');

console.log(decryptedMessage);