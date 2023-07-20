export const validate = (schema) => {
  return async (req, res, next) => {
    try {
        await schema.validateAsync(req.body)
        next()
    }catch (err) {
        next(err)
    }

    // let error = _validate(rules, req.body);
    // if (Object.keys(error).length === 0) {
    //   return next();
    // }

    // res.status(400).json({ error });
  };
};

// const _validate = (rules, data) => {
//     let errors = {}
//     for(let fieldName in rules) {
//         for(let rule of rules[fieldName]) {
//             if(rule.required && !data[fieldName]) {
//                 errors[fieldName] = 'Trường này là trường bắt buộc'
//             }
//         }
//     }
//     return errors
// };
