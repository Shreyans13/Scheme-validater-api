var Ajv = require('ajv').default
var ajv = new Ajv({allErrors: true})

module.exports = {
    validater: (req,res,next) => {
        const userSchema = {
            title: "userSchema",
            type: "object",
            properties: {
                name: {
                    type: "string",
                    default : "John",
                    enum: ["John", "Roshan", "Doe"]
                },
                phone: {
                    type: "number",
                },
                address: {
                    type: "object",
                    properties: {
                        contactName: {
                            type: "string",
                            description: "Contact Name",
                        },
                        pin: {
                            type: "number",
                            description: "Pin Code of the address",
                        },
                        country: {
                            type: "string",
                            description: "Country",
                        },
                        detailAddress: {
                            $schema: "http://json-schema.org/draft-04/schema#",
                            title: "detailAddressSchema",
                            type: "object",
                            properties: {
                                line1: {
                                    type: "string",
                                    description: "Address Line 1",
                                },
                                line2: {
                                    type: "string",
                                    description: "Address Line 1",
                                },
                                line3: {
                                    type: "string",
                                    description: "Address Line 1",
                                },
                            },
                            required: ["line1", "line2", "line3"],
                        },
                    },
                    required: ["contactName", "pin", "country", "detailAddress"],
                },
                cart: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string",
                            },
                            count: {
                                type: "number",
                            },
                        },
                        required: ["id", "count"],
                    },
                },
            },
            required: ["name", "phone", "address", "cart"],
        };

        

        let validate = ajv.compile(userSchema);

        try {
            let valid = validate(json);
            if (valid) {
                return next()
            } else {
                throw validate.errors;
            }
        } catch (err) {
            let errors = []
            for (i of err) {
                errors.push("data " + i.dataPath + " " + i.message)
            }
            JSON.stringify(errors)
            res.status(400).send(JSON.stringify(errors))
        }
    }
}