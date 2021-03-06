const ShoppingListService = {
  getAllItems(knex) {
    return knex.select("*").from("shopping_list");
  },
  getItemById(knex, id) {
    return knex
      .from("shopping_list")
      .select("*")
      .where("id", id)
      .first();
  },
  deleteItem(knex, id) {
    return knex("shopping_list")
      .where("id", id)
      .delete();
  },
  insertItem(knex, newItem) {
    return knex()
      .insert(newItem)
      .into("shopping_list")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  updateItem(knex, id, newContent) {
    return knex("shopping_list")
      .where({ id })
      .update(newContent);
  }
};

module.exports = ShoppingListService;
