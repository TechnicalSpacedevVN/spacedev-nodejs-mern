import { ApolloServer } from "@apollo/server";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  graphql,
} from "graphql";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { TaskModel, taskSchema } from "./models/task.model";
import { CategoryModel, categorySchema } from "./models/category.model";
import { UserModel, userSchema } from "./models/user.model";

const typeDefs = `#graphql
  ${taskSchema}
  ${categorySchema}
  ${userSchema}

  type Query {
    hello: String
  }
  type Query {
    tasks: [Task]
    categories: [Category]
    users: [User]
  }
  
`;

const resolvers = {
  Query: {
    hello: () => "worldddd",
    tasks: async (parent: any, args: any) => {
      return await TaskModel.find(args);
    },
    categories: async (parent: any, args: any) => {
      return await CategoryModel.find(args);
    },
    users: async (parent: any, args: any) => {
      console.log(parent);
      return await UserModel.find();
    },
  },
  Task: {
    category: async (parent: any) => {
      console.log('Category')
      return await CategoryModel.findOne({ _id: parent.category });
    },
    users: async (parent: any) => {
      return await UserModel.find({ _id: { $in: parent.users } });
    },
  },
};

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});
