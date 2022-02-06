const lookupObject = (data) => {
  if (Object.keys(data) === 0) return {};

  const lookup = {};

  data.forEach((item) => {
    lookup[item.shop_name] = item.shop_id;
  });

  return lookup;
};

const formatTreasureData = (shopNameAndId, treasureData) => {


  const formattedData = treasureData.map((treasure) => [
        treasure.treasure_name,
        treasure.colour,
        treasure.age,
        treasure.cost_at_auction,
        shopNameAndId[treasure.shop]
  ])
  return formattedData;
  };

  const bubble = (pop) => {
    return pop * 2
  }
  

module.exports = { lookupObject, formatTreasureData };
