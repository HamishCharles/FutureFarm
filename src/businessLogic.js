  
  export function calcYeildValue (yAvg, Ha, cRisk, fRisk, price) {
    return (yAvg * Ha) / (cRisk * fRisk) * price;
  }

  export function farmTotal (fields = []) {
    return fields.reduce( (total, field) => total + (field.crop ? field.crop.yield : 0) , 0);
  }