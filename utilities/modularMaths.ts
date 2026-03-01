export type OperandType = number | bigint;

export type BigIntCompliance = string | number | boolean | bigint;

export interface EEAOutput{
    t: OperandType,
    s: OperandType,
    gcd: OperandType,
}

export class modularMath{
static euclidianAlgorithm(arg0: bigint, arg1: bigint): any {
    throw new Error("Method not implemented.");
}


constructor(){}

static toBigInt(a:BigIntCompliance):bigint{
    
    const turnedNumber =  BigInt(a as BigIntCompliance);

    return BigInt(turnedNumber);
}

static toInteger(a:string | bigint | number){    
    const turnedNumber = Number(a);


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

static getGCD(r0:OperandType, r1:OperandType,outputType?: "bigint" | "integer"):OperandType {

    if(r1 === 0) return r0;

    const temp:OperandType= r1;
    r1 = this.toInteger(r0) % this.toInteger(r1);
    r0 = temp;
  

  return outputType === 'integer' ? this.getGCD(r0, r1, outputType) : this.toBigInt(this.getGCD(r0, r1, outputType));
}

static EEA(r0:bigint, r1:bigint):EEAOutput{
 // BASE CASE
    if (r1 === 0n) {
        return { gcd: r0, s: 1n, t: 0n }
    }
    
    // BEFORE RECURSION: calculate quotient and remainder
    let q:bigint = r0 / r1;
    let rem:bigint = r0 % r1;

    let result = this.EEA(r1, rem);
    
    let s = this.toBigInt(result.t);                    
    let t = this.toBigInt(result.s) - q * this.toBigInt(result.t);     
    
    return { gcd: result.gcd, s: s, t: t }

}


    private static findPhiExponents(m:OperandType):Record<number, number>{
        let result:Record<number, number>={};
        let divisor:number = 2;
     
        
        while (this.toInteger(m) !== 1){
            if(this.toInteger(m) % this.toInteger(divisor) !== 0){
                divisor++
            }else{
            m = this.toInteger(m) / divisor;
            if(!result[divisor]){
                result[divisor]=1;
            }else{
                result[divisor]++;
            }

            }
        }
        

    return result;
    }

    static EulerPhiFunction(m:OperandType):bigint{
        const exponents= this.findPhiExponents(m);
        let result:bigint=1n;
        for (const base in exponents) {
        result *= this.toBigInt((this.toInteger(base) ** exponents[base]) - (this.toInteger(base) ** (exponents[base] - 1)));
        }

        return result;
    }

}


console.log(modularMath.EulerPhiFunction(2 ** 40), "modular math calculations");
