import { modularMath } from "./modularMaths";



export interface StringToBinaryOutput {
    binaryArray:number[],
    text:string
}

export class Helpers{

constructor(){}


static turnIntoBinary(input:number | bigint):string{

   if (input === 0) return "0";
    if (input === 1) return "1";

    return `${this.turnIntoBinary(Math.floor(modularMath.toInteger(input)/ 2)) + (modularMath.toInteger(input) % 2).toString()}`;
}

static turnStringIntoBinary(input:string):StringToBinaryOutput {
// FLAWED
if(input.split("").length === 0) throw new Error('No character has been provided, cannot be empty string');

let letterIndex:number=0;
let result:StringToBinaryOutput={
    binaryArray:[],
    text:'',
};

while(input.length > letterIndex){
    let letterASCI = input.charCodeAt(letterIndex); 
    let binaryResult = this.turnIntoBinary(letterASCI);
    result.binaryArray.push(modularMath.toInteger(binaryResult));
    result.text += `${binaryResult} `;
    letterIndex++;
}

return result;

}


static turnBinaryToDecimal(input:number):number{
    let decimalResult:number=0;
    let bitsLength:number = (input).toString().length;

    for (let index = bitsLength - 1; index >=0 ; index--) {
        const exponent= modularMath.toInteger(modularMath.toInteger(input).toString()[index]);
        
        if(exponent === 1){
            decimalResult += 2 ** ((bitsLength-1) - index);
        }
    }
return decimalResult;
}

static turnBinaryToString(input:number[]):string {
// FLAWED NEEDS TO BE FIXED RETURNS THE SAME CHARACTER

let result:string='';

for (let index = 0; index < input.length; index++) {
    const binaryASCIIReference = input[index];
    const turnedToDecimal = this.turnBinaryToDecimal(binaryASCIIReference);
    result += String.fromCharCode(turnedToDecimal);
}
return result;
}

}