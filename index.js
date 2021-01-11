let mongoose = require('mongoose')
let express = require('express')
let morgan = require('morgan')
let bodyParser = require('body-parser')
let middleware = require('./middleware')

const app = express()
const PORT = 8000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

mongoose.connect('mongodb://localhost/things_go_social_v2').then(() => {
	console.log('connected to Local database')
})

let jsonSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        address: {
            contactName: {
                type: String,
                required: true
            },
            detailAddress: {
                line1: {
                    type: String,
                    required: true
                },
                line2: {
                    type: String,
                    required: true
                },
                line3: {
                    type: String,
                    required: true
                }
            },
            pin: {
                type: Number,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        },
        cart: [
            {
                id: {
                    type: String,
                    required: true
                },
                count: {
                    type: Number,
                    required: true
                }
            }
        ]
})

let jsonModel = new mongoose.model('jsonModel', jsonSchema)

// to remove all data
// jsonModel.remove({}, err => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log("data cleared")
//     }
// })
app.use(morgan("dev"))

app.get('/', (req, res) => {
    res.send(`
    <h1>Api details</h1>
    <p>GET  /schema - to get the schema</p>
    <p>POST /validate-data - to validate data and save it to MONGODB Database</p>
    <p>GET /data - to get all data from the database </p>
    <p><a target="_blank" href="https://shreyans13.github.io/CLI-Portfolio/">Visit my portfolio </a></p>
    <p><a target="_blank" href="https://github.com/shreyans13">Visit my Github </a></p>
    <p><a target="_blank" href="https://www.linkedin.com/in/shreyans13/">Visit my Linkedin </a></p>
    <p> <h2> Made by Shreyans Jain</h2></p>
    `)
})
app.get('/schema', (req, res) => {
    res.json({
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
    })
})

app.post('/validate-data',middleware.validater ,(req, res) => {
    jsonModel.create(req.body.data,(err, data) => {
        if (err) console.log(err)
        else data.save();
    })
})

app.get('/data', (req,res) => {
    jsonModel.find({},(err, data) => {
        console.log("find")
        if (err) console.log(err)
        else res.send(data)
    })
})


app.listen(PORT, () => {
    console.log(`Server running at PORT = ${PORT}`)
})