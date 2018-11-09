import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {calcYeildValue, farmTotal} from './businessLogic';

it('calculates yeilds correctly', () => {
  expect( calcYeildValue(8,20,2,2,5) ).toBe(200);
});

it('calculates totals of all fields correctly', () => {
  expect( farmTotal([{crop: {yield: 172}},{crop: {yield: 303}}]) ).toBe(475);
});
