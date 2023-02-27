import crypto from 'crypto';
/**
 *
 * @param jsonArray - array of json objects to be deduped
 * @returns array of deduped json objects
 */
const dedupeArray = (jsonArray: any[]): any[] => {
  const dedupedArray: any[] = [];
  const hashes = new Set();

  jsonArray.forEach((item) => {
    const hash = crypto
      .createHash('sha256')
      .update(JSON.stringify(item))
      .digest('hex');
    if (!hashes.has(hash)) {
      dedupedArray.push(item);
      hashes.add(hash);
    }
  });

  return dedupedArray;
};

export default dedupeArray;
