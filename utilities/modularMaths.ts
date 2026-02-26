export type OperandType = number | bigint;

export type BigIntCompliance = string | number | boolean | bigint;

export class modularMath{


constructor(){}

static toBigInt<T>(a:T):bigint{
    if(typeof a === 'string') throw new Error("Wrong type of data provided, the element is Not a number");
    
    const turnedNumber =  BigInt(a as BigIntCompliance);

    return BigInt(turnedNumber);
}

static toInteger<T>(a:T){
    const turnedNumber = Math.floor(Number(a));

    if(isNaN(turnedNumber)) throw new Error("Wrong type of data provided, the element is Not a number");

    return Math.floor(Number(a));
}

static modulo(operand:OperandType, modulus:OperandType, output?:'integer' | 'bigint'):OperandType{
    if(!output || output === 'bigint') return this.toBigInt(operand) % this.toBigInt(modulus);
    return this.toInteger(operand) % this.toInteger(modulus);    
}

static addOperandsModulo(input:OperandType[], modulus:OperandType):bigint{
    if(input.length < 2) throw new Error("Cannot be empty or 1 element in the set provided.");
return this.toBigInt(input.reduce((a,b)=> this.toBigInt(a) + this.toBigInt(b),0))  % this.toBigInt(modulus);
}


static multiplyOperandsModulo(input:OperandType[], modulus:OperandType):bigint{
     if(input.length < 2) throw new Error("Cannot be empty or 1 element in the set provided.");
    return this.toBigInt(input.reduce((a,b)=> this.toBigInt(a) * this.toBigInt(b),0)) % this.toBigInt(modulus); 
}

static XOR(input:OperandType[] | OperandType):bigint{
const modulus =this.toBigInt(2);
if (typeof input === 'object') return BigInt(input.reduce((a,b)=> this.toBigInt(a) + this.toBigInt(b),0)) % modulus;

return this.toBigInt(input) % modulus;
}

static getGCD(a:OperandType, b:OperandType,outputType?: "bigint" | "integer"):OperandType
{
a = this.toInteger(a);
b = this.toInteger(b);

  while (b !== 0) {
    const temp:OperandType= b;
    b = this.toInteger(this.modulo(a,b,outputType));
    a = temp;
  }

    if(!outputType || outputType === 'bigint') return this.toBigInt(a);
     return this.toInteger(a);
}


static EEA(){
    // To be implemented !
}


}


