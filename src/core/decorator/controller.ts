import { Router, Express } from "express";
import { Schema } from "joi";
import "reflect-metadata";

const CONTROLLER_KEY = "controller";

export function Controller(url: string) {
  console.log("Controller");

  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    // class Temp extends constructor {
    //   router = Router();
    //   prefix = url;
    // };

    class Temp extends constructor {
      prefix = url;
      constructor(...args: any[]) {
        super(...args)
        let express = args[0] as Express
        if(express) {
          express.use(url)
        }
      }
    }
    Reflect.defineMetadata(CONTROLLER_KEY, url, Temp);
    return Temp;
  };
}

export function Get(url: string) {
  //   console.log("Get");
  return (target: any, propertyKey: string, descriptor: any) => {
    const originalMethod = descriptor.value;
    console.log("GET", target.rotuer);
    //   console.log(this.router);
    const controller = Reflect.getMetadata(CONTROLLER_KEY, target);

    console.log(controller);

    const fullPatch = `${controller}/${url}`;

    Reflect.defineMetadata("GET", fullPatch, target, propertyKey);

    descriptor.value = function (...args: any[]) {
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

export function Validate(schema: Schema) {
  return (target: any, perpertyKey: string, descriptor: any) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function () {
      console.log("Validate");
      try {
        await schema.validateAsync({});
        // next();
      } catch (err) {
        // next(err);
      }
    };
  };
}




const ClassDecorator = (): any => {
  return (constructor: any) => {
    console.log('Constructor')  
  }
}

const methodDecorator = () => {
  return (target: any, propertyKey: string, descriptor: any) => {
    console.log('methodDecorator')
  }
}


@ClassDecorator()
class Demo {
  @methodDecorator() 
  demoMethod() {
    
  }
}