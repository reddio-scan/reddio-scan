import getReddioCollections, { ReddioCollection } from './getReddioCollections';
test('getReddioCollections', async () => {
  const result: ReddioCollection[] | undefined = await getReddioCollections();
  expect(result?.length).not.toBeNull();
});
