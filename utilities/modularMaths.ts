class modularMath{


constructor(){}

static toBigInt(a:number | bigint):bigint{
    return BigInt(a);
}

static toInteger(a:bigint){
    return Number(a);
}

static add2Points(a:bigint | number, b:bigint | number, fieldLength:bigint | number):bigint{
return (this.toBigInt(a) + this.toBigInt(b)) % this.toBigInt(fieldLength);
}


static multiply2PointsInField(a:bigint | number, b:bigint | number, fieldLength:bigint | number):bigint{
    return (this.toBigInt(a) * this.toBigInt(b)) % this.toBigInt(fieldLength); 
}



}

console.log(modularMath.toInteger(modularMath.add2Points(2, 5, 3)));