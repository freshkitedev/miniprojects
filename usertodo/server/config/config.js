import dot from "dotenv"

dot.config()

const config = {
    port:process.env.PORT || 3000,
    db:process.env.MONGO,
    jwtSecret:process.env.JWT_SECRET
}
export default config