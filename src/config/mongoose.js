import mongoose from "mongoose";

const dbName = process.env.DATABASE_NAME;
const main = async () => {
  await mongoose.connect(`mongodb://127.0.0.1:27017`, {
    dbName,
    auth: {
      username: "root",
      password: "example",
    },
  });
  console.log("Connected to mongodb");

  mongoose.plugin((schema, options) => {
    // let indexs = schema.indexes();

    // indexs = indexs.filter((e) => e[0]).map((e) => Object.keys(e[0])[0]);

    schema.statics.paginate = async (query) => {
      let {
        page = 1,
        perPage = 10,
        sort,
        fields = "",
        ..._query
      } = query || {};

      page = parseInt(page || 1);

      if (fields) {
        fields = fields?.split(",");
      } else {
        fields = [];
      }

      let [sortBy = "_id", sortValue = "asc"] = sort?.split(",") || [
        "_id",
        "asc",
      ];

      if (searchKey && searchKey.includes("_text")) {
        searchKey = searchKey.replace("_text", "");
        _query = _.omit(_query, searchKey);
      }

      if (searchKey && query[searchKey]) {
        _query.$text = { $search: query[searchKey] };
      }

      let pipeline = [{ $match: _query }];

      if (relation) {
        pipeline.push(...relation);
      }

      if (fields.length > 0) {
        pipeline.push({
          $project: fields.reduce(
            (result, currentValue) => ({ ...result, [currentValue]: 1 }),
            {}
          ),
        });
      }
      let count = await collection.countDocuments(_query);
      let data = await collection
        .aggregate(pipeline)
        .limit(perPage)
        .skip((page - 1) * perPage)
        .sort({ [sortBy]: sortValue === "asc" ? 1 : -1 })
        .toArray();
      let result = {
        total: count,
        totalPage: Math.ceil(count / perPage),
        currentPage: page,
        data,
      };

      return result;
    };
  });
};

await main();
