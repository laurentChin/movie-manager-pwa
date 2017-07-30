import React from 'react';
import { shallow } from 'enzyme';

import Duration from './Duration';

test('Duration properly render the value passed in props', () => {
  const component = shallow(
    <Duration value="125"/>
  );

  expect(component.text()).toEqual('125m (2h05)');
});