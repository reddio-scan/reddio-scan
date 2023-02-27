/**
 *
 * @param epoch - epoch time in seconds
 * @returns UTC time in ISO format
 */
const epochToUTC = (epoch: number): string => {
  const UTCDate = new Date(epoch * 1000);
  const isoString = UTCDate.toISOString();
  const shortIsoString = isoString.substring(0, isoString.length - 8); // "2022-12-04T23:59"
  return shortIsoString;
};

export default epochToUTC;
