import React, { Component } from 'react';
import {calcYeildValue}  from './businessLogic';

class CropForm extends Component {
 
  render() {
    const {field, changeCrop, fieldCrop, crops, fieldYeild} = this.props;
    console.log(this.props)
    return (
      <form><h4>{field.name} &emsp; <span className='yield'>{ fieldYeild ? 'Yield £' + Math.round(fieldYeild) : ''}</span></h4> 
        <select onChange={changeCrop} value={fieldCrop}>
          <option key="" value="">No crop selected</option>
          {crops.map((crop, idx) => <option key={crop.name} value={idx}>
            {crop.name} (&pound;{Math.round(calcYeildValue(crop.expected_yield, field.hectares, crop.disease_risk_factor, field.disease_susceptibility, crop.price_per_tonne))})
          </option>)}
        </select>
      </form>
    )
  }
}

export default CropForm;
