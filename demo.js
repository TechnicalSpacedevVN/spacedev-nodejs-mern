// // // class Person {
// // //     constructor(name, age) {
// // //       this.name = name;
// // //       this.age = age;
// // //     }

// // //     getInfo() {
// // //       return `Name: ${this.name}, Age: ${this.age}`;
// // //     }
// // //   }

// // //   const person1 = new Person("Alice", 25);
// // //   const person2 = new Person("Bod", 30);

// // //   console.log(person1.getInfo()); // Output: Name: Alice, Age: 25
// // //   console.log(person2.getInfo()); // Output: Name: Alice, Age: 25

// // class Animal {
// //   speak() {
// //     console.log("Animal speaks");
// //   }

// //   run() {
// //     console.log("Run");
// //   }
// // }

// // class Dog extends Animal {
// //   speak() {
// //     console.log("Dog barks");
// //   }
// // }

// // class Cat extends Animal {
// //   speak() {
// //     console.log("Cat speak");
// //   }
// // }

// // const dog = new Dog();
// // dog.speak(); // Output: Dog barks
// // dog.run(); // Output: Dog barks

// // const cat = new Cat();
// // cat.speak();
// // cat.run();

// // Higher Order Function
// function hofLog(cb) {
//     return (...arg) => {
//         let result = cb(...arg)
//         console.log(result)
//         return result
//     }
// }

// function sum(a, b) {
//     return a + b
// }

// let sumLog = hofLog(sum)

// let s = sumLog(10, 5)
// let s1 = sumLog(11, 5)
// let s2 = sumLog(12, 5)
// let s3 = sumLog(13, 5)
// let s4 = sumLog(14, 5)
// let s5= sumLog(15, 5)

// console.log(s5)

function sum(c, d) {
  console.log(c, d);
  return this.a + this.b + c + d;
}

// context

// let sumFunc = sum.bind({ a: 10, b: 5, c: 234234 });

// console.log(sumFunc(2, 3));

console.log(sum.apply({ a: 10, b: 5 }, [3, 4]));

// call
// bind
// apply

// console.log(sum.b)
