const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const api = process.env.API_KEY;
const OFFICIAL_EMAIL = process.env.EMAIL;
const genAI = new GoogleGenerativeAI(api);

const isPrime = (num) => {
        if (num <= 1) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
                if (num % i === 0) return false;
        }
        return true;
};

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

                        case 'prime':
                                if (!Array.isArray(input)) {
                                        throw new Error("Input must be an array of integers");
                                }
                                resultData = input.filter(n => typeof n === 'number' && isPrime(n));
                                break;

                        case 'lcm':
                                if (!Array.isArray(input) || input.length === 0) {
                                        throw new Error("Input must be a non-empty array");
                                }
                                resultData = input.reduce((acc, curr) => getLCM(acc, curr));
                                break;

                        case 'hcf':
                                if (!Array.isArray(input) || input.length === 0) {
                                        throw new Error("Input must be a non-empty array");
                                }
                                resultData = input.reduce((acc, curr) => getGCD(acc, curr));
                                break;

                        case 'AI':
                                try {
                                        const model = genAI.getGenerativeModel({
                                                model: "models/gemini-2.0-flash"
                                        });

                                        const prompt = `Answer this question in exactly one single word and don't fluff around : ${input}`;

                                        const result = await model.generateContent(prompt);

                                        const responseText =
                                                result?.response?.text?.() 
                                                ? await result.response.text()
                                                : "";

                                        if (!responseText) {
                                                throw new Error("Empty AI response");
                                        }

                                        resultData = responseText
                                                .trim()
                                                .split(/\s+/)[0]
                                                .replace(/[^\w]/g, '');

                                } catch (aiError) {
                                        if (aiError.message?.includes("429")) {  // Too Many Requests
                                                throw new Error("AI quota exceeded. Please try again later.");
                                        }

                                        if (aiError.message?.includes("401") || aiError.message?.includes("403")) {  //unauthorized or forbidden
                                                throw new Error("AI authentication failed. Check API key or permissions.");
                                        }

                                        if (aiError.message?.includes("404")) { //Not found
                                                throw new Error("AI model not found or deprecated.");
                                        }

                                        throw new Error("AI processing failed: " + aiError.message);
                                }
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
