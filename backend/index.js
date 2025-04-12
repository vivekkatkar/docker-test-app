const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello from server");
})

app.get("/get-user", (req, res) => {
    const user = {
        name : "vivek",
        mobile : 9356907874
    };

    res.status(200).json({data : user});
});

app.listen(3000, ()=>{
    console.log("app is running on port 3000");
})