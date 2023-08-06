// function identity(arg: number): number {
//   return arg;
// }

// let id1 = identity(234234);

// function identity(arg: any): any {
//   return arg;
// }

// let id2 = identity(234234);

// function identity(arg: string): string {
//   return arg;
// }

// let id2 = identity("234234");

// function identity<Type extends number | string>(arg: Type): Type {
//   return arg;
// }

// let id3 = identity('asdfasdf')
// let id4 = identity(123123)
// let id5 = identity(true)

// interface Todo {
//   title: string;
//   description: string;
// }

// let todo: Todo = {
//   description: "asdfasdf",
//   title: "asdfasdf",
// };

// let todo2: Partial<Todo> = {
//   description: "asdfasdf",
// };

// function updateTodo(todo: Todo, updateData: Partial<Todo>) {
//   return { ...todo, ...updateData };
// }

// updateTodo(todo, {
//   title: "asdfasdf",
// });

// interface Props {
//   a?: number;
//   b?: string;
// }

// const obj: Props = { a: 5 };

// const obj2: Required<Props> = { a: 5, b: "asdfasdf" };

// interface Todo {
//   title: string;
// }

// const todo: Readonly<Todo> = {
//   title: "Delete inactive users",
// };

// todo.title = "Hello";

// interface Todo {
//   title: number;
//   description?: string;
//   completed?: boolean;
//   startTime?: Date
//   endTime?: Date
// }

// type TodoPreview = Required<Omit<Todo, 'description'| 'completed'>>

// const todo: TodoPreview = {
//   title: 234,
//   endTime: new Date(),
//   startTime: new Date()
// };

// function sum(a: number, b: number) {
//     return a + b
// }

// let s: ReturnType<typeof sum>

// s = sum(1,2)

// let str = 'abc'

// // type StringType = 'abc' | 'def'

// // let a: StringType = 'def'

// let STR : Uppercase<typeof str> = 'WERWERWER'

interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

// let arrCat = {
//   miffy: {
//     age: 1,
//     breed: "asdfasdf",
//   },
//   boris: {
//     age: 1,
//     breed: "asdfasdf",
//   },
//   mordred: {
//     age: 1,
//     breed: "asdfasdf",
//   },
// };

const cats: Record<CatName, Partial<CatInfo>> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { breed: "asdfasdf" },
};

// let a: any ;
// a.toLowerCase();

// let b: unknown = "asdfasdfsadf";

// if (typeof b === "string") {
//   b.toLowerCase();
// }

// function error() {

//     while (true) {}

//   return 1
// }

// (() => {
//   try {
//     let a = error()

//     let b = 234234;
//   } catch (err) {
//     console.log(err);
//   }
// })();

// function demoVoid() {
//   return;
// }

// enum PrintMedia {
//   Newspaper,
//   Newsletter,
//   Magazine,
//   Book,
// }

// enum BookType {
//   Newspaper = 1,
//   Newsletter = "asdf",
//   Magazine = "asdfasdf",
//   Book = "asdfasdf",
// }

// const Newspaper = 0;
// const Newsletter = 1;
// const Magazine = 2;
// const Book = 3;

// let arrData = [
//   {
//     name: "Tập chí ....",
//     type: Newspaper,
//   },
//   {
//     name: "Tập chí ....",
//     type: Newsletter,
//   },
//   {
//     name: "Tập chí ....",
//     type: Magazine,
//   },
//   {
//     name: "Tập chí ....",
//     type: BookType.Magazine,
//   },
// ];

// let book = arrData.filter(e => e.type === Book)

// let n: BookType = BookType.Newsletter;

// let arr: number[] = [234234, 234234, 234, 2342, 34, 2342, 34];

// let arr2: [number, number] = [234234,234]


// function useState() {
//     return [234,234]
// }

// let [a,b] = useState()


let loop = function forever() {
    while (true) {
        console.log('Hello');
    }
}


let a = loop()