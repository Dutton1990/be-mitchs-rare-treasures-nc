 const { lookupObject } = require('../utils/utils');

describe('lookupObject', () => {
  it('should return an object', () => {
    expect(lookupObject([])).toEqual({})
  });
  it('if one shop item passed in, correctly returns the shop name as key and shop id as value', () => {
      const data = [{ shop_id: 1, shop_name: 'asda' }]
      const result = { asda: 1 }
      expect(lookupObject(data)).toEqual(result)
  });
  it('if two shops passed in, correctly returns the shop names as keys and shop ids as values', () => {
    const data = [{ shop_id: 1, shop_name: 'asda' }, { shop_id: 2, shop_name: 'morrisons'}]
    const result = { asda: 1, morrisons: 2 }
    expect(lookupObject(data)).toEqual(result)
});
it('original data hasn\'t been mutated', () => {
    const data = [{ shop_id: 1, shop_name: 'asda' }, { shop_id: 2, shop_name: 'morrisons'}]
    const data2 = [{ shop_id: 1, shop_name: 'asda' }, { shop_id: 2, shop_name: 'morrisons'}]
    lookupObject(data)
    expect(data).toEqual(data2)
});  
it('shop object in array has different reference to original shop object', () => {
    const shops = [
      {
        shop_id: 1,
        shop_name: 'asda',
      },
    ];
    lookupObject(shops)
    expect(lookupObject(shops)[0]).not.toBe(shops[0])

    

});

});
