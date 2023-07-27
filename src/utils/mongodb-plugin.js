import _ from "lodash";

export const initPlugin = (collections) => {
  for (let i in collections) {
    let Collection = collections[i];
    Collection.paginate = async (query, pipeline) => {
      let { sort, fields, page = 1, perPage = 10, ..._query } = query;

      let indexs = await Collection.indexInformation();
      delete indexs._id_;
      let search = Object.keys(indexs)?.[0];

      if (search && search.includes("_text")) {
        search = search.replace("_text", "");
        if (query[search]) {
          _query = _.omit(_query, search);

          _query.$text = {
            $search: query[search],
          };
        }
      }

      page = parseInt(page);
      perPage = parseInt(perPage);

      let [sortBy = "_id", sortValue = "desc"] = sort?.split(",") || [];

      let skip = (page - 1) * perPage;

      let count = await Collection.countDocuments(_query);

      let totalPage = Math.ceil(count / perPage);
      let _pipeline = [
        {
          $match: _query,
        },
      ];

      if (pipeline) {
        _pipeline.push(...pipeline);
      }

      if (fields) {
        fields = fields.split(",");
        let project = fields.reduce((result, currentValue) => {
          if (currentValue.includes(".")) {
            let [name, value] = currentValue.split(".");
            return { ...result, [name]: parseInt(value) };
          }

          return { ...result, [currentValue]: 1 };
        }, {});
        pipeline.push({
          $project: project,
        });
      }

      let result = await Collection.aggregate(_pipeline)
        .limit(perPage)
        .skip(skip)
        .sort({
          [sortBy]: sortValue === "asc" ? 1 : -1,
        })
        .toArray();

      let response = {
        data: result,
        totalPage,
        currentPage: page,
        total: count,
      };

      if (page < totalPage) {
        response.nextPage = page + 1;
      }

      if (page > 1) {
        response.prevPage = page - 1;
      }

      return response;
    };
  }
};
