const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require('dotenv').config()
const axios = require("axios");
const IntaSend = require('intasend-node');
const Stripe = require('stripe');



const app = express()

app.use(cors())
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 8080;

//MONGODB CONNECTION
/* console.log(process.env.MONGODB_URL) */
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected to Database'))
.catch((err) => console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
})

const userModel = mongoose.model("user", userSchema)


//API
app.get("/", (req,res) => {
    res.send("Server is running")
})

{/* API SIGNUP */}
{ /* The findOne call back was deprecieted in mongodb hence we use async/await function */ }
app.post("/signup", async (req, res) => {
    console.log(req.body);
    
    try {
        console.log(req.body);
        const { email } = req.body;

        // Check if the email already exists in the database
        const result = await userModel.findOne({ email: email });     
        if (result) {
            return res.status(400).json({ message: "Email already exists", alert: false })
        }

        // Create a new user document
        const newUser = new userModel(req.body);

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: "Successful sign up", alert: true })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
});

/* app.post("/signup", async (req,res) => {
    console.log(req.body)
    const {email} = req.body

    userModel.findOne({email : email}, (err, result) => {
        console.log(result);
        console.log(err);
    })
}) */


// API LOGIN
app.post('/login', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email exists in the database
        const user = await userModel.findOne({ email });

        if (user) {
            // Additional security check (e.g., compare passwords if applicable)

            // Construct a simplified user object to send in the response
            const userData = {
                _id: user._id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,
                image: user.image,
            };

            console.log(userData);

            // Send a success response
            res.json({ message: "Login is successful", alert: true, data: userData });
        } else {
            // Send an error response for invalid login attempt
            res.status(401).json({ message: "Invalid email or password", alert: false });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error", alert: false });
    }
});


/* app.post('/login', (req, res) => {
    console.log(req.body)
    const {email} = req.body
    userModel.findOne({email: email}, (err, result) => {
        if (result) {
            console.log(result);
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                middleName: result.middleName,
                lastName: result.lastName,
                email: result.email, 
                image: result.image,
            }
            console.log(dataSend)
            res.send({message: "Login is successful", alert: true, data: dataSend})
        } else {
            res.send({message: "Invalid email or password", alert: false})
        }
    })
}) */



// product section
// schema
const schemaProduct = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
})

const productModel = mongoose.model("product", schemaProduct)

// Save product on db
// API
app.post('/uploadProduct', async (req, res) => {
    console.log(req.body)
    const data = await productModel(req.body)
    await data.save();
    res.send({message: 'Uploaded successfully'})
})

// API for fetching productData from db
app.get('/product', async (req, res) => {
    const productData = await productModel.find({})
    res.send(JSON.stringify(productData))
})


/* payment gateway */
/* console.log(process.env.STRIPE_SECRET_KEY) */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
app.post('/checkout-payment', async(req, res) => {
    console.log(req.body)

    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [{ shipping_rate: 'shr_1OncV9AdwMMQJ3VsJiqQR2FJ'}],

            line_items: req.body.map((item) => {
                return{
                    price_data: {
                        currency: "KES",
                        product_data: {
                            name: item.name,
                            /* images: [item.image] */
                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.qty
                }
            }),

            success_url:`${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        }
    
        const session = await stripe.checkout.sessions.create(params)
        res.status(200).json(session.id)
        /* res.send({ message: 'payment gateway', success: true }) */
    } catch(err) {
        res.status(err.statusCode || 500).json(err.message)
    }
})



// MPESA API
// STEP 1: GENERATING ACCESS TOKEN

/* app.get("/token", (req, res) => {
  getAccessToken();
}); */

const getAccessToken = async (req, res, next) => {
    const key = process.env.MPESA_CONSUMER_KEY;
    const secret = process.env.MPESA_CONSUMER_SECRET;
    const auth = new Buffer.from(`${key}:${secret}`).toString("base64");
  
    await axios
      .get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      )
      .then((resp) => {  
        /* console.log(resp.data.access_token); */
        token = resp.data.access_token;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  //STEP 2 //stk push
  app.post("/stk", getAccessToken, async (req, res) => {
    const phone = req.body.phone.substring(1); //formated to 72190........
    const amount = req.body.amount;
  
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
  
      
    const shortCode = process.env.MPESA_PAYBILL;
    const passkey = process.env.MPESA_PASSKEY;
  
    const callbackurl = process.env.CALLBACK_URL;
  
    const password = new Buffer.from(shortCode + passkey + timestamp).toString("base64");
  
    await axios
      .post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {
          BusinessShortCode: shortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: `254${phone}`,
          PartyB: 174379,
          PhoneNumber: `254${phone}`,
          CallBackURL: callbackurl,
          AccountReference: `254${phone}`,
          TransactionDesc: "Customer Payment Test",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => {
        res.json(resp.data);
        /* const data = resp.data; */
        console.log(resp.data);
      })
      .catch((err) => {
        res.json(err);
        console.log(err.message);
      });
  });
  
  //STEP 3 callback url
  const callback_route = process.env.CALLBACK_ROUTE;
  app.post(`/${callback_route}`, (req, res) => {
    if (!req.body.Body.stkCallback.CallbackMetadata) {
      console.log(req.body.Body.stkCallback.ResultDesc);
      res.status(200).json("ok");
      return;
    }
  
    const amount = req.body.Body.stkCallback.CallbackMetadata.Item[0].Value;
    const code = req.body.Body.stkCallback.CallbackMetadata.Item[1].Value;
    const phone1 =
      req.body.Body.stkCallback.CallbackMetadata.Item[4].Value.toString().substring(
        3
      );
    const phone = `0${phone1}`;
    // saving the transaction to db
    console.log({
      phone,
      code,
      amount,
    });
    const transaction = new Transaction();
  
    transaction.customer_number = phone;
    transaction.mpesa_ref = code;
    transaction.amount = amount;
  
    transaction
      .save()
      .then((data) => {
        console.log({ message: "transaction saved successfully", data });
      })
      .catch((err) => console.log(err.message));
  
    res.status(200).json("ok");
  });
  
  app.post("/stkpushquery", getAccessToken, async (req, res) => {
    const CheckoutRequestID = req.body.CheckoutRequestID;
  
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
    const shortCode = process.env.MPESA_PAYBILL;
    const passkey = process.env.MPESA_PASSKEY;
  
    const password = new Buffer.from(shortCode + passkey + timestamp).toString(
      "base64"
    );
  
    await axios
  
      .post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
        {
          BusinessShortCode: shortCode,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: CheckoutRequestID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response)
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json(err);
      });
  });
  
  app.get("/transactions", (req, res) => {
    Transaction.find({})
      .sort({ createdAt: -1 })
      .exec(function (err, data) {
        if (err) {
          res.status(400).json(err.message);
        } else {
          res.status(201).json(data);
          // data.forEach((transaction) => {
          //   const firstFour = transaction.customer_number.substring(0, 4);
          //   const lastTwo = transaction.customer_number.slice(-2);
  
          //   console.log(`${firstFour}xxxx${lastTwo}`);
          // });
        }
      });
  });
  
  


//server is running
app.listen(PORT, () => console.log("Server is running on the port " + PORT))