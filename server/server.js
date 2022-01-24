const express = require("express");
const app = express();
const port = 8000;

const faker = require('@faker-js/faker');
const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const randomCard = faker.helpers.createCard(); // random contact card containing many properties

class User {
    constructor() {
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.phoneNumber = faker.phone.phoneNumber();
        this.email = faker.internet.email();
        this.password = faker.internet.password();
    }
}

class Company {
    constructor() {
        this.name = faker.company.companyName();
        this.address = faker.address.streetAddress();
        this.street = faker.address.streetName();
        this.city = faker.address.cityName();
        this.zipCode = faker.address.zipCode();
        this.country = faker.address.country();
    }
}

// ***** MIDDLEWARE *****
// make sure these lines are above any app.get or app.post code blocks
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );





// ***** ROUTING *****

app.get("/api", (requestObject, responseObject) => {
    console.log("hello from server");
})

app.get("/api/hello", (req, res) => {
    // res.send("hello from server.js!")
    const myRes = {
        status: "cool",
        weather: "sunny"
    }
    res.json(myRes)
})



// we can hard code some users like this
// later on we will want to store users in a database
const users = [
    { firstName: "Reimu",  lastName: "Hakurei"    },
    { firstName: "Marisa", lastName: "Kirisame"   },
    { firstName: "Sanae",  lastName: "Kochiya"    },
    { firstName: "Sakuya", lastName: "Izayoi"     },
    { firstName: "Momiji", lastName: "Inubashiri" }
];
    
app.get("/api/users", (req, res) => {
    res.json( users );
});

// **** ACCESS URL VARIABLES ****
// **** GET ****

app.get("/api/users/new", (req, res) => {
    console.log(new User());
    const newUser = new User();
    res.json({
        newUser
    })
}) 

app.get("/api/company/new", (req, res) => {
    console.log(new Company());
    const newCompany = new Company();
    res.json({
        newCompany
    })
})

app.get("/api/user/company", (req, res) => {
    const newUser = new User();
    const newCompany = new Company();
    res.json({
        newUser,
        newCompany
    })
})

app.get("/api/users/:userID", (req, res) =>{
    console.log(req.params.userID);
    const {userID} = req.params
    res.json({
        your_id: req.params.userID,
        status: 200,
        user: users[userID]
    })
})


// **** POST ****
app.post("/api/users/new", (req, res) =>{
    //req.body will contain form data from post postman/react/etc
    console.log(req.body);

    users.push(req.body);

    res.json({status: "ok"});

})

// **** PUT ****

// **** DELETE ****


// ***** ALWAYS AT THE END *****
app.listen( port, () => console.log(`>>> Server started on port ${port} and is listening for REQuests to RESpond to <<<`))


