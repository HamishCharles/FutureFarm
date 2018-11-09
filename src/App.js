import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {farmTotal, calcYeildValue}  from './businessLogic';
import CropForm from './CropForm';

class App extends Component {
  state = {
    farm: {},
    crops: {},
    isFieldSelected: false,
    selectedField: null,
  };

  async makeRequest (key, uri) {
    const response = await fetch(uri);
    const json = await response.json();
    let obj = {}; 
    obj[key] = json;
    this.setState(obj);
  }

  ff_fieldClicked(name, fieldIndex) {
    const setState = this.setState.bind(this);
    return function (e) {
      setState({ isFieldSelected: true, selectedField: fieldIndex });
    }

  }

  ff_fieldPopupClosed (name, fieldIndex) {
    const setState = this.setState.bind(this);
    return function (e) {
      setState({ isFieldSelected: false, selectedField: null });
    }

  }

  changeCrop = (event) => {
    let cropIdx = event.target.value;
    let farm = {...this.state.farm};
    let crop = this.state.crops[cropIdx];
    let fields = [...farm.fields];
    let idx = this.state.selectedField;
    if (crop) {
      let yeildValue = calcYeildValue(crop.expected_yield, fields[idx].hectares, crop.disease_risk_factor, fields[idx].disease_susceptibility, crop.price_per_tonne);
      fields[idx] = {...fields[idx], crop: {name: crop.name, idx: cropIdx, yield: yeildValue}};
    } else {
      delete fields[idx]['crop'];
    }
    this.setState( { farm: {...farm, fields: fields }});  

  };

  componentDidMount() {
    this.makeRequest('farm', 'https://private-bf7f31-hummingbirdsimple.apiary-mock.com/farm');
    this.makeRequest('crops', 'https://private-bf7f31-hummingbirdsimple.apiary-mock.com/crops');
  }
 
  render() {
    const farm = this.state.farm;
    const fields = farm.fields;
    const crops = this.state.crops
    const selected = this.state.selectedField;
    const fieldCrop = selected !== null && fields[selected].crop ? fields[selected].crop.idx : "";
    const fieldYeild = selected !== null && fields[selected].crop ? fields[selected].crop.yield : "";
    const isSelected = this.state.isFieldSelected;
    return (farm.centre ? (
      <div>
        <header>
          <h3><span>{farm.name}</span> <span className="yield">Farm Yield Total: £{ Math.round( farmTotal(fields) ) }</span></h3>
        </header>
        <div className="layout">
          <Map
            ref={ref =>  this.map = ref }
            style={{ width: '500px', height: '500px' }}
            center={farm.centre.coordinates.reverse()}
            zoom={13}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {fields.map((field, idx) => (
              <GeoJSON key={field.name} data={field.boundary} onClick={this.ff_fieldClicked(field.name, idx)}>
                <Popup closeButton={false} onClose={this.ff_fieldPopupClosed(field.name, idx)}><span><h4>{field.name}</h4>{field.crop ? field.crop.name : ''}</span></Popup>
              </GeoJSON>
            ))}
          </Map>
          <div className="choose-crop">
            { crops && isSelected ? 
              (<CropForm field={fields[selected]} changeCrop={this.changeCrop} fieldCrop={fieldCrop} crops={crops} fieldYeild={fieldYeild}></CropForm>)  : 
              <div>Click on a field to set a crop</div>}
          </div>
        </div>

        
      </div>
    ) : (
      <div>loading...</div>
    ));
  }
}

export default App;
