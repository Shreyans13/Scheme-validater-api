var Ajv = require('ajv').default
var ajv = new Ajv({allErrors: true})
let validater = (json) => {
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
            console.log("Data is valid");
        } else {
            throw validate.errors;
        }
    } catch (err) {
        for (i of err) {
            console.log("data " + i.dataPath + " " + i.message);
        }
    }
};
const json = {
    name: "Roshan",
    phone: 8210592314,
    address: {
        contactName: "Sunny",
        detailAddress: {
            line1: "Sector: 2/A",
            line2: "Q. No.: 3-018",
            line3: "Near Shopping Centre",
        },
        pin: 827001,
        country: "India",
    },
    cart: [
        {
            id: "newId",
            count: 2,
        },
    ],
};
validater(json)