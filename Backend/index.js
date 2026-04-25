let express=require("express");
let dotenv=require("dotenv");
let cors=require("cors");
let cookieParser=require("cookie-parser");

dotenv.config();
let app=express();
app.use(cors({
  origin: "https://tasskfloww.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let { task } = require("./dbconnection");
app.use("/",require('./router'));
const PORT=process.env.PORT;
app.listen(PORT,()=>
{
    console.log(`server is running on ${PORT}`);
}
)
