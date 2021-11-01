import React from 'react';
import { shallow } from 'enzyme';
import { SwitcherComponent } from './Switcher';

describe('Component Switcher', () => {
  it('should render without crashing', () => {
    const component = shallow(<SwitcherComponent />);
    expect(component).toBeTruthy();
  });
});
