import React from 'react';
import { shallow } from 'enzyme';
import { PostBoxComponent } from './PostBox';

describe('Component PostBox', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostBoxComponent />);
    expect(component).toBeTruthy();
  });
});
