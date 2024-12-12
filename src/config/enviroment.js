import dotenv from "dotenv";

dotenv.config();

const ENVIROMENT= {
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_USER: process.env.EMAIL_USER,
    API_KEY_INTERN: process.env.API_KEY_INTERN
}

export default ENVIROMENT