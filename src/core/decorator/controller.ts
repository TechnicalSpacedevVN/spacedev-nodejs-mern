import { Router, Express, Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import "reflect-metadata";

const ROUTER_KEY = "metadata:routers";
const VALIDATE_KEY = "metadata:validate";

export function Controller(prefix: string) {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    class Temp extends constructor {
      constructor(...args: any[]) {
        super(...args);
        let express = args[0] as Express;
        let routers = Reflect.getMetadata(ROUTER_KEY, constructor);

        if (express && Array.isArray(routers) && routers.length > 0) {
          let router: any = Router();

          for (let i in routers) {
            let { method, url, handler, propertyKey } = routers[i];

            let handlers = [
              async (req: Request, res: Response, next: NextFunction) => {
                try {
                  let result = await handler(req, res, next);
                  res.json(result);
                } catch (err) {
                  next(err);
                }
              },
            ];

            let validateMiddleware = Reflect.getMetadata(
              `metadata:${propertyKey}:validate`,
              constructor
            );

            if (validateMiddleware) {
              handlers.unshift(validateMiddleware);
            }

            router[method](url, ...handlers);
          }
          express.use(prefix, router);
        }
      }
    }
    return Temp;
  };
}

// export function Get(url: string) {
//   //   console.log("Get");
//   return (target: any, propertyKey: string, descriptor: any) => {
//     let routers = Reflect.getMetadata(ROUTER_KEY, target.constructor) || [];

//     routers.push({
//       method: "get",
//       url,
//       handler: descriptor.value,
//     });

//     Reflect.defineMetadata(ROUTER_KEY, routers, target.constructor);
//   };
// }

export function Validate(schema: Schema) {
  return (target: any, propertyKey: string, descriptor: any) => {
    Reflect.defineMetadata(
      `metadata:${propertyKey}:validate`,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await schema.validateAsync({ ...req.query, ...req.body });
          next();
        } catch (err) {
          next(err);
        }
      },
      target.constructor
    );
  };
}

const ClassDecorator = (): any => {
  return (constructor: any) => {
    console.log("Constructor");
  };
};

const methodDecorator = () => {
  return (target: any, propertyKey: string, descriptor: any) => {
    console.log("methodDecorator");
  };
};

@ClassDecorator()
class Demo {
  @methodDecorator()
  demoMethod() {}
}

const generateRouteMethod = (method: string) => {
  return (url: string) => {
    return (target: any, propertyKey: string, descriptor: any) => {
      let routers = Reflect.getMetadata(ROUTER_KEY, target.constructor) || [];

      routers.push({
        method,
        url,
        handler: descriptor.value,
        propertyKey,
      });

      Reflect.defineMetadata(ROUTER_KEY, routers, target.constructor);
    };
  };
};
export const Get = generateRouteMethod("get");
export const Post = generateRouteMethod("post");
export const Put = generateRouteMethod("put");
export const Patch = generateRouteMethod("patch");
export const Delete = generateRouteMethod("delete");
export const All = generateRouteMethod("all");

export const Resource = () => {};
