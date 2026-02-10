const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const api = process.env.API_KEY;
const OFFICIAL_EMAIL = process.env.EMAIL;
const genAI = new GoogleGenerativeAI(api);


const getGCD = (a, b) => (!b ? a : getGCD(b, a % b));
const getLCM = (a, b) => (a === 0 || b === 0) ? 0 : Math.abs(a * b) / getGCD(a, b);

router.post('/', async (req, res) => {
        try {
                const body = req.body;
                const keys = Object.keys(body);

                if (keys.length !== 1) {
                        return res.status(400).json({
                                is_success: false,
                                official_email: OFFICIAL_EMAIL,
                                message: "Request must contain exactly one key: fibonacci, prime, lcm, hcf, or AI"
                        });
                }

                const key = keys[0];
                const input = body[key];
                let resultData;

                switch (key) {

                        case 'fibonacci':
                                if (typeof input !== 'number' || input < 0) {
                                        throw new Error("Input must be a non-negative integer");
                                }
                                let fib = [0, 1];
                                for (let i = 2; i < input; i++) {
                                        fib.push(fib[i - 1] + fib[i - 2]);
                                }
                                resultData = input === 0 ? [] : input === 1 ? [0] : fib.slice(0, input);
                                break;

                        default:
                                return res.status(400).json({
                                        is_success: false,
                                        message: "Invalid functional key"
                                });
                }

                res.status(200).json({
                        is_success: true,
                        official_email: OFFICIAL_EMAIL,
                        data: resultData
                });

        } catch (error) {

                console.error("API ERROR:", error);

                res.status(400).json({
                        is_success: false,
                        official_email: OFFICIAL_EMAIL,
                        error: error.message || "Unknown server error"
                });
        }
});

module.exports = router;
