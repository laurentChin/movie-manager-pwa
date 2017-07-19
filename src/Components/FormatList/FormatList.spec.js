import React from 'react';
import { shallow } from 'enzyme';

import FormatList from './FormatList';

test('FormatList properly render 3 Format components', () => {
  const formats = ['blu-ray', 'dvd', '4k'];
  const component = shallow(
    <FormatList formats={formats}/>
  );

  expect(component.find('Format').length).toEqual(3);
});