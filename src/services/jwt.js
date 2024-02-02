import pkg from 'jsonwebtoken'
const { sign, verify } = pkg
const JWT_SECRET = process.env.JWT_SECRET
export function issue(payload) {
    try {
        const token = sign(payload, "JWT_SECRET", { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log(error);
        return { error };
    }
}
export function decode(req) {
    try {
        if (req.headers.hasOwnProperty("authorization")) {

            const token = req.headers.authorization.split(" ")[1];
            const data = verify(token, "JWT_SECRET");
            return data;
        } else {
            return { error: "No Bearer token pass in request" };
        }
    } catch (error) {
        console.log(error);
        return { error };
    }
}
