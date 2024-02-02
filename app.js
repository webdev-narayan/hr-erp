import initializer from "./src/utils/initializer.js"
import { app } from "./server.js"
import RBAC from './src/middlewares/RBAC.js';
import notFoundHandler from './src/middlewares/notFoundHandler.js';



app.get("/", (req, res) => {
    return res.status(200).send("Home page")
})


// app.use(RBAC)
// app.use(notFoundHandler)
import './src/utils/routes.js';


initializer()

app.listen(4567, () => {
    console.log("Server started | http://localhost:4567 |")
})