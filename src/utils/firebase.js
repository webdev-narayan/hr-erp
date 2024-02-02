// const serviceAccount = require("../config/web-push-559b6-firebase-adminsdk-8ruqy-5670e6b148.json");
import serviceAccount from "../../config/web-push-559b6-firebase-adminsdk-8ruqy-5670e6b148.json";
import { initializeApp, credential as _credential } from "firebase-admin";

initializeApp({
    credential: _credential.cert(serviceAccount),
});

export default {
    firebaseAdmin
}

