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
        // Take an array of length of the input 
        const arrayForRandomValue = new Uint8Array(keyLength);

        // generate random array with values
        const randomlyGeneratedValue = crypto.getRandomValues(arrayForRandomValue);

        // A cipher in "human-readable" version
        let textResult:string="";
        // A cipher in binary
        let binaryResult:string="";

        for (let index = 0; index < randomlyGeneratedValue.length; index++) {
            // If the turned binary is less than 8 bits long, pad with 0s
            const pseudoRandomNumberToBinary = Helpers.turnIntoBinary(randomlyGeneratedValue[index]).padStart(8,"0");
            // Get the ASCI character
            const character = String.fromCharCode(randomlyGeneratedValue[index]);
            // Add respectively to appropriate variables.
            binaryResult += pseudoRandomNumberToBinary;
            textResult += character;
        }
        
        return {
            asciiIndecies:randomlyGeneratedValue,
            keyInBinary:binaryResult,
            text:textResult
        }
        
    }

    static encrypt(input:OTPInput): EncryptionOutput{
        // Convert input to string
        const convertedInput = input.toString();
        // generate the key
        const keyGenerated = this.generateKey(convertedInput.length);

        let cipherText:string='';
        let cipherTextInBinary:string='';

        // run a loop with turned into binary ASCII codes of the leter
        for (let index = 0; index < keyGenerated.text.length; index++) {
            let keyBinary = Helpers.turnIntoBinary(keyGenerated.asciiIndecies[index]);
            let inputBinary = Helpers.turnIntoBinary(convertedInput.charCodeAt(index)); 

            // padd the results with 0s if less than 8 characters (0s or 1s) long
            keyBinary = keyBinary.padStart(8, "0");
            inputBinary = inputBinary.padStart(8, "0");
            
            // XOR particular bits and add to cipherTextInBinary variable
            for (let j = 0; j < 8; j++) {
                const inputBit = inputBinary[j];
                const keyBit = keyBinary[j];


                cipherTextInBinary += `${modularMath.XOR([modularMath.toInteger(inputBit), modularMath.toInteger(keyBit)])}`;
            }
        }


        let splitIndex:number=0;
        let cipherAsciiIndecies:number[]=[];

        // Split the binary text into an array with ascii decimals
        while(splitIndex < cipherTextInBinary.length){
            let splitBinaryPart = Helpers.turnBinaryToDecimal(Number(cipherTextInBinary.slice(splitIndex, splitIndex + 8)));
            cipherAsciiIndecies.push(splitBinaryPart);
            splitIndex += 8;
        }
        

        // Find character for each ascii code and add to cipherText
        for (let index = 0; index < cipherAsciiIndecies.length; index++) {
            console.log(index);
            cipherText += String.fromCharCode(cipherAsciiIndecies[index]);
        }
        
        
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
            if(isNaN(modularMath.toInteger(plaintextOutput))) throw new Error("Input is a string with letters, could not turn into decimal number. Select string as output type.");
            
            return { key, 'plaintext': modularMath.toBigInt(plaintextOutput) };
        }
        case 'integer': {
            if(isNaN(modularMath.toInteger(plaintextOutput))) throw new Error("Input is a string with letters, could not turn into decimal number. Select string as output type.");
            return { key, 'plaintext': modularMath.toInteger(plaintextOutput) };
        }
        default:
            throw new Error("Invalid parameter has been provided.");
    }
}


}