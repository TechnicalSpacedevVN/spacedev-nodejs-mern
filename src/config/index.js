import { dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
config()
export const __dirname = dirname(fileURLToPath(import.meta.url));

export const EMAIL = {
    USER: process.env.EMAIL_USERNAME,
    PASS: process.env.EMAIL_PASSWORD
}
