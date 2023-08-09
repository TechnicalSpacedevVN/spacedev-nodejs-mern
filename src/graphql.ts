import { ApolloServer } from "@apollo/server";
import { TaskModel, taskSchema } from "./models/task.model";
import axios from "axios";
import { GraphQLScalarType, Kind } from "graphql";
import { omit } from "lodash";
import { CategoryModel, categorySchema } from "./models/category.model";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (typeof value === "string") {
      return new Date(value).getTime();
      //   return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "string") {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(ast.value);
    }

    return "asdfasdfasdf";
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

const authors = [
  {
    id: 1,
    name: "Đặng Thuyền Vương",
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
  },
];

const books = [
  {
    title: "The Awakening",
    author: 1,
  },
  {
    title: "City of Glass",
    author: 2,
  },
  {
    title: "Nhà giả kim",
    author: 2,
  },
];

const typeDefs = `#graphql
    scalar Date
    ${taskSchema}
    ${categorySchema}
    type Author {
        id: Int
        name: String
    }

    type Book {
        title: String
        author: Author
    }

    type Post {
        createdAt: Date
        title: String
        content: String
        short_description: String
        id: Int
    }

    type Query {
        books: [Book]
        authors: [Author]
        book: Book
        tasks(title: String, page: Int): [Task]
        posts: [Post]
        categories: [Category]
    }


`;

// Database
// File
// Thứ 3
// Redis

const resolvers = {
  Date: dateScalar,
  Book: {
    author: (parent: any, args: any, context: any) => {
      let { author } = parent;
      return authors.find((e) => e.id === author);
    },
  },
  Task: {
    category: async (parent: any, args: any, context: any) => {
      let { category } = parent;
      console.log('category')
      return await CategoryModel.findOne({ _id: category });
    },
  },
  Query: {
    book: () => {
      return books[0];
    },
    books: () => {
      return books;
    },
    authors: () => {
      return authors;
    },
    tasks: async (parent: any, args: any) => {
      let _query = omit(args, "page");
      let { page = 1 } = args;
      console.log('tasks')
      return await TaskModel.find(args).skip(page);
    },
    posts: async () => {
      let results = await axios.get(
        "https://61cedbf665c32600170c7dd9.mockapi.io/posts"
      );
      return results.data;
    },
    categories: async (_: any, args: any) => {
      return await CategoryModel.find(args);
    },
  },
};

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});


// TaskModel.find().populate('category')