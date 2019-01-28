/**
 * converts a minutes based value into [x]h[x]min
 * @param rawValue
 * @returns {string}
 */
const toHourMin = rawValue => {
  const hour = Math.trunc(rawValue / 60);
  const min = rawValue % 60 < 10 ? `0${rawValue % 60}` : rawValue % 60;
  return `${hour}h${min}`;
};

export { toHourMin };
