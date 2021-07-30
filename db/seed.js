const db = require('./');
const format = require('pg-format');
const { lookupObject, formatTreasureData } = require('../utils/utils');

const seed = ({ shopData, treasureData }) => {
  return db
    .query(`DROP TABLE IF EXISTS treasures;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS shops;`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE shops (
        shop_id SERIAL PRIMARY KEY,
        shop_name VARCHAR(255) NOT NULL,
        slogan TEXT
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE treasures (
        treasure_id SERIAL PRIMARY KEY,
        treasure_name VARCHAR(255) NOT NULL,
        colour VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        cost_at_auction REAL NOT NULL,
        shop_id INT REFERENCES shops(shop_id)
      );`);
    })
    .then(() => {
      const shopDataToAdd = format(
        `INSERT INTO shops 
        (shop_name, slogan) 
        VALUES %L 
        RETURNING*;`,
        shopData.map((shop) => [shop.shop_name, shop.slogan])
      );
      return db.query(shopDataToAdd);
    })
    .then((result) => {
      const keyFinder = lookupObject(result.rows);
      const formattedTreasureData = formatTreasureData(keyFinder, treasureData)
      const treasureDataToAdd = format(
        `INSERT INTO treasures
        (treasure_name, colour, age, cost_at_auction, shop_id)
        VALUES %L
        RETURNING *;`,
        formattedTreasureData
      );
      return db.query(treasureDataToAdd)
    });
};

module.exports = seed;
