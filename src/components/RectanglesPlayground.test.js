import React from 'react';
import { shallow } from 'enzyme';
import RectanglesPlayground from './RectanglesPlayground';
import RectanglesControlForm from './RectanglesControlForm';
import Rectangle from './Rectangle';

describe('<RectanglesPlayground /> should ', () => {
  let wrapper;

  beforeEach(() => {
    if (!global.window.localStorage) {
      global.window.localStorage = {
        getItem() { return '{}'; },
        setItem() {}
      };
    };

    wrapper = shallow(<RectanglesPlayground />);
  });

  it('render <RectanglesControlForm /> component', () => {
    expect(wrapper.find(RectanglesControlForm).length).toBe(1);
  });

  it('render <Rectangle /> component if added', () => {
    wrapper.setState({rectangles: {0: {width: 100, height: 100, left: 10, top: 10}}});
    expect(wrapper.find(Rectangle).length).toBe(1);
  });

  it('not show more then 5 <Rectangle /> components', () => {
    const rectanglesConfigsMock = [
      {width: 100, height: 100, left: 10, top: 10},
      {width: 100, height: 100, left: 10, top: 10},
      {width: 100, height: 100, left: 10, top: 10},
      {width: 100, height: 100, left: 10, top: 10},
      {width: 100, height: 100, left: 10, top: 10},
      {width: 100, height: 100, left: 10, top: 10},
      {width: 100, height: 100, left: 10, top: 10}
    ];
    rectanglesConfigsMock.forEach(rectangle => wrapper.instance().createNewRectangle(rectangle));
    wrapper.setState(wrapper.instance().state);

    expect(Object.keys(wrapper.instance().state.rectangles).length).toBe(5);
    expect(wrapper.find(Rectangle).length).toBe(5);
  });
});
