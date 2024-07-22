const express=require("express")
const mongoose=require("mongoose")
const Productrouter = require("./Routes/Products")
const cors=require('cors')
const path=require("path")
const dotenv=require("dotenv")
dotenv.config()
const cookieParser=require("cookie-parser")
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_KEY)

const { categoryRouter } = require("./Routes/Category")
const { userRouter } = require("./Routes/User")
const { CartRouter } = require("./Routes/Cart")
const { orderRouter } = require("./Routes/Order")
const { ordersModel } = require("./Model/Order")
database().catch(err=>console.log(err.message))
//middleware
const app=express()
app.use(cors())
app.use(express.static(path.resolve(__dirname,"build")))
app.use(cookieParser())
const endpointSecret = process.env.ENDPOINT_SECRET;

app.post('/webhook', express.raw({type: 'application/json'}), async(request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      const order=await ordersModel.findById(paymentIntentSucceeded.metadata.order_id)
      console.log(order)
      order.paymentstatus='received'
      await order.save()
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.use(express.json())
async function database(){
    await mongoose.connect(process.env.DB_URL)
    console.log("database connected successfully")
}
 app.post("/create-payment-intent",async(req,res)=>{
  const {amount,orderid} = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount*100),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata:{
      order_id:orderid
    }
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
 })

app.use("/products",Productrouter)
app.use("/category",categoryRouter)
app.use("/user",userRouter)
app.use("/cart",CartRouter)
app.use("/orders",orderRouter)
app.get('*', (req, res) =>
  res.sendFile(path.resolve('build', 'index.html'))
);
app.listen(8080,()=>{
    console.log("server is runnning")
})