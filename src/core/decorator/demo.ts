import 'reflect-metadata'
// Decorator cho phương thức
// function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//   const originalMethod = descriptor.value;
//   console.log(descriptor);
//   descriptor.value = function (...args: any[]) {
//     console.log(
//       `Calling ${propertyKey} with arguments: ${JSON.stringify(args)}`
//     );
//     const result = originalMethod.apply(this, args);
//     console.log(`Result: ${result}`);
//     return result;
//   };

//   return descriptor;
// }

// class Calculator {
//   @log
//   add(a: number, b: number): number {
//     return a + b;
//   }

//   @log
//   div(a: number, b: number): number {
//     return a / b;
//   }
// }

// const calc = new Calculator();
// calc.add(5, 7); // Output will show logs before and after method execution
// calc.div(10, 2); // Output will show logs before and after method execution

// function addPrefix(prefix: string) {
//   return function (target: any) {
//     return class extends target {
//       name: string;

//       constructor(name: string) {
//         super();
//         this.name = `${prefix} ${name}`;
//       }
//     };
//   };
// }

// target: class
function addPrefix(prefix: string) {
  return function (target: any) {
    return class extends target {
      name: string;

      constructor(name: string) {
        super();
        this.name = `${prefix} ${name}`;
      }
    };
  };
}

// Factory

@addPrefix("Mr.")
class MrPerson {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}


@addPrefix("Ms.")
class MsPerson {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}


// const mrPerson = new MrPerson("Alice");
// console.log(mrPerson.name); // Output: Mr. Alice


// const msPerson = new MsPerson("Alice");
// console.log(msPerson.name); // Output: Mr. Alice

// class A {
//   a: number;
//   constructor(a: number) {
//     this.a = a;
//   }
// }

// class B extends A {
//   name: string;
//   constructor(name: string) {
//     super(19);
//     this.name = name;
//   }
// }

// let b = new B("asdf");




// let person = {
//     name: 'Abc'
// }


// Reflect.defineMetadata('metadata', {a: true}, person)

// let metadata = Reflect.getMetadata('metadata', person)
// console.log(metadata)