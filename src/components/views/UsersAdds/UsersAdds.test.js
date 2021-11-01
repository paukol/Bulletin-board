import React from 'react';
import { shallow } from 'enzyme';
import { UsersAddsComponent } from './UsersAdds';

describe('Component UsersAdds', () => {
  it('should render without crashing', () => {
    const component = shallow(<UsersAddsComponent />);
    expect(component).toBeTruthy();
  });
});
