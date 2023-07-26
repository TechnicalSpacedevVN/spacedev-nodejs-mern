import _ from "lodash";

export const initPlugin = async (collections) => {
  for (let i in collections) {
    let collection = collections[i]
    collection.paginate = async (...args) => {
      let searchKey = Object.keys(await collection.indexInformation())?.[1];
      let { page = 1, perPage = 10, sort, fields, ...query } = args?.[0] || {};

      let _query = query;
      if (searchKey && searchKey.includes("_text")) {
        searchKey = searchKey.replace("_text", "");
        _query = _.omit(query, searchKey);
      }

      if (searchKey && query[searchKey]) {
        _query.$text = { $search: query[searchKey] };
      }

      let count = await collection.countDocuments(_query);
      let data = await collection
        .find(_query)
        .limit(perPage)
        .skip((page - 1) * perPage)
        .toArray();
      let result = {
        total: count,
        totalPage: Math.ceil(count / perPage),
        currentPage: page,
        data,
      };

      return result;
    };
  }
};
