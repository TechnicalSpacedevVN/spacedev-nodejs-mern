import mongoose, { Schema } from "mongoose";

// class Shape {
//   draw() {
//     console.log("Drawing circle");
//   }
// }

// class Circle extends Shape{
//   draw() {
//     console.log("Drawing circle");
//   }
// }

// class Square extends Shape{
//   draw() {
//     console.log("Drawing square");
//   }
// }

// let shapes: Shape[] = [];

// shapes.push(new Circle());
// shapes.push(new Square());

// shapes.push(new Square());

class Car {
  make: string;
  model: string;
  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }

  displayInfo() {
    console.log(`Car: ${this.make} ${this.model}`);
  }
}

const car = new Car("Toyota", "Camry");
car.displayInfo(); // Output: Car: Toyota Camry

let schema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

let Model = mongoose.model('demo', schema)

