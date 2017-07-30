import React from 'react';

import {toHourMin} from './DurationFormatter';

test('toHourMin must convert a minute only value to [x]h[y]min', () => {
  expect(toHourMin(125)).toEqual('2h05');
});