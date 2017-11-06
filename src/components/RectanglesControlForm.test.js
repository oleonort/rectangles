import React from 'react';
import { shallow } from 'enzyme';
import RectanglesControlForm from './RectanglesControlForm';

describe('<RectanglesControlForm /> should ', () => {
  it('show Add New button', () => {
    const wrapper = shallow(<RectanglesControlForm numberOfRectangles={1} onSubmit={()=>{}}/>);
    expect(wrapper.find('.add-new').length).toBe(1);
  });

  it('not show Add New button if number of rectangles equals 5', () => {
    const wrapper = shallow(<RectanglesControlForm numberOfRectangles={5} onSubmit={()=>{}}/>);
    expect(wrapper.find('.add-new').length).toBe(0);
  });

  it('show Delete button if rectangle is selected', () => {
    const mockedConfig = {width: 100, height: 100, left: 10, top: 10};
    const wrapper = shallow(<RectanglesControlForm numberOfRectangles={2} currentConfig={mockedConfig} onSubmit={()=>{}}/>);

    expect(wrapper.find('.delete').length).toBe(1);
    expect(wrapper.find('.add-new').length).toBe(0);
  });
});
