import React from 'react';
import { shallow, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import FormatList from './FormatList';

test('FormatList properly render 3 Format components', () => {
  const formats = ['blu-ray', 'dvd', '4k'];
  const component = shallow(
    <FormatList formats={formats}/>
  );

  expect(component.find('Format').length).toEqual(3);
});