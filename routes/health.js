const express = require('express');
const router = express.Router();
const OFFICIAL_EMAIL = process.env.EMAIL;

try {
        router.get('/', (req, res) => {
                res.status(200).json({
                        is_success: true,
                        official_email: OFFICIAL_EMAIL
                });
        });
} catch (err) {
        console.error("API ERROR:", err);

        res.status(400).json({
                is_success: false,
                official_email: OFFICIAL_EMAIL,
                error: err.message || "Unknown server error"
        });
}

module.exports = router;
