// export const demo = (): any => {
//   console.log(`demo() factory evaluted`);
//   return (
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDecorator
//   ): any => {
//     // console.log("demo(): called");
//     let temp = descriptor;
//     // return descriptor;
//   };
// };

// function sealed(constructor: Function) {
//   Object.seal(constructor);
//   Object.seal(constructor.prototype);
// //   console.log('aaaaa')
// }

// @sealed
// class Example {
//   type = "report";
//   title: string;
//   demo = 'asdfasdf'

//   constructor(t: string) {
//     this.title = t;
//   }

//   @demo()
//   method() {
//     // console.log("method");
//   }
// }

// let a = new Example('title');
