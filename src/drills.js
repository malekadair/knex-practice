const knex = require("knex");
require("dotenv").config();

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL
});

const getAllTextItems = searchTerm => {
  knexInstance
    .select()
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
};

const getPaginatedItems = pageNumber => {
  const limit = 6;
  const offset = limit * (pageNumber - 1);

  knexInstance
    .select()
    .from("shopping_list")
    .limit(limit)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
};

const getItemsByDate = daysAgo => {
  knexInstance
    .select()
    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => {
      console.log(result);
    });
};

const groupItemsByCategory = () => {
  knexInstance
    .select("category")
    .from("shopping_list")
    .sum("price AS sum")
    .groupBy("category")
    .orderBy([{ column: "sum", order: "ASC" }])
    .then(result => {
      console.log("The total cost is: ", result);
    });
};

groupItemsByCategory();
