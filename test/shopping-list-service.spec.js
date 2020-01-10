const knex = require("knex");
const ShoppingListService = require("../src/shopping-list-service");

describe("Shopping List Service Object", () => {
  let db;
  let testItems = [
    {
      id: 1,
      name: "snail",
      price: "1.23",
      category: "Main",
      checked: false,
      date_added: new Date("2029-01-22T16:28:32.615Z")
    },
    {
      id: 2,
      name: "meow",
      price: "3.43",
      category: "Snack",
      checked: true,
      date_added: new Date("2020-01-22T16:28:32.615Z")
    },
    {
      id: 3,
      name: "gary",
      price: "4.32",
      category: "Breakfast",
      checked: false,
      date_added: new Date("2029-01-22T16:28:32.615Z")
    },
    {
      id: 4,
      name: "sponge",
      price: "0.98",
      category: "Breakfast",
      checked: true,
      date_added: new Date("2029-01-22T16:28:32.615Z")
    }
  ];

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.SHOPPING_TEST_DB_URL
    });
  });

  before(() => db("shopping_list").truncate());

  afterEach(() => db("shopping_list").truncate());
  after(() => db.destroy());

  context("shopping list is populated", () => {
    beforeEach(() => db.into("shopping_list").insert(testItems));
    it("should return all items", () => {
      return ShoppingListService.getAllItems(db).then(actual => {
        expect(actual).to.eql(testItems);
      });
    });
    it("should return item by id", () => {
      const secondId = 2;
      const secondItem = testItems[secondId - 1];

      return ShoppingListService.getItemById(db, secondId).then(actual => {
        expect(actual).to.eql({
          id: secondId,
          name: secondItem.name,
          price: secondItem.price,
          category: secondItem.category,
          checked: secondItem.checked,
          date_added: secondItem.date_added
        });
      });
    });
    it("should delete item by id", () => {
      const itemId = 3;
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          const expected = testItems.filter(item => item.id !== itemId);
          expect(allItems).to.eql(expected);
        });
    });
    it("should update item by id", () => {
      const itemId = 2;
      const newItemData = {
        name: "gerry",
        price: "2.34",
        category: "Main",
        checked: true,
        date_added: new Date("2029-01-22T16:28:32.615Z")
      };
      const originalItem = testItems[itemId - 1];

      return ShoppingListService.updateItem(db, itemId, newItemData)
        .then(() => ShoppingListService.getItemById(db, itemId))
        .then(item => {
          expect(item).to.eql({
            id: itemId,
            ...originalItem,
            ...newItemData
          });
        });
    });
  });

  context("shopping list is empty", () => {
    it(`should return an empty array`, () => {
      return ShoppingListService.getAllItems(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });
    it("inserts new item into empty array", () => {
      const newItem = {
        name: "Nara",
        price: "5.05",
        category: "Snack",
        checked: true,
        date_added: new Date("2020-01-01T00:00:00.000Z")
      };
      return ShoppingListService.insertItem(db, newItem).then(actual => {
        expect(actual).to.eql({
          id: 1,
          name: newItem.name,
          price: newItem.price,
          category: newItem.category,
          checked: newItem.checked,
          date_added: new Date(newItem.date_added)
        });
      });
    });
  });
});
