import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import RectanglesPlayground from './components/RectanglesPlayground';

describe('<App /> should ', () => {
  it('render without crashing', () => {
    shallow(<App />);
  });

  it('render <RectanglesPlayground /> component', () => {
    expect(shallow(<App />).find(RectanglesPlayground).length).toBe(1);
  });
});
