import React from 'react';
import { shallow } from 'enzyme';
import { ErrorComponent } from './Error';

describe('Component Error', () => {
  it('should render without crashing', () => {
    const component = shallow(<ErrorComponent />);
    expect(component).toBeTruthy();
  });
});
