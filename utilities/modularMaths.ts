export type OperandType = number | bigint;

export class modularMath{


constructor(){}

static toBigInt(a:OperandType):bigint{
    return BigInt(a);
}

static toInteger(a:bigint){
    return Math.floor(Number(a));
}

static add2Points(input:OperandType[], modulus:OperandType):bigint{
    if(input.length < 2) throw new Error("Cannot be empty or 1 element in the set provided.");
return this.toBigInt(input.reduce((a,b)=> this.toBigInt(a) + this.toBigInt(b),0))  % this.toBigInt(modulus);
}


static multiply2PointsInField(input:OperandType[], modulus:OperandType):bigint{
     if(input.length < 2) throw new Error("Cannot be empty or 1 element in the set provided.");
    return this.toBigInt(input.reduce((a,b)=> this.toBigInt(a) * this.toBigInt(b),0)) % this.toBigInt(modulus); 
}

static XOR(input:OperandType[] | OperandType):bigint{
const modulus =this.toBigInt(2);
if (typeof input === 'object') return BigInt(input.reduce((a,b)=> this.toBigInt(a) + this.toBigInt(b),0)) % modulus;

return this.toBigInt(input) % modulus;
}

static getGCD(){
    // to be implemented
}


static EEA(){}


}


console.log(modularMath.XOR(35));