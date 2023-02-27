/**
 *
 * @param data - Array of objects
 * @returns {void} Array of objects with incrementing ID
 */
const assignIncrementID = (data: any): any => {
  for (let i = 0; i < data.length; i++) {
    data[i].id = i + 1;
  }
  return data;
};
export default assignIncrementID;
