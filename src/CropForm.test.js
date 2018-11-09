import React from 'react';
// import ReactDOM from 'react-dom';
import CropForm from './CropForm';
import renderer from 'react-test-renderer';


test('Renders crop selection form correctly', () => {
  const component = renderer.create(
    <CropForm field={{name: 'test field'}} changeCrop={function () {}} fieldCrop={1} crops={[{name: 'Winter rice'},{name:'Summer oats'}]} fieldYeild={50}></CropForm>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});