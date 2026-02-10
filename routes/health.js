const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
        try {
                res.status(200).json({
                        is_success: true,
                        official_email: OFFICIAL_EMAIL,
                });
        } catch (err) {
                console.error("API ERROR:", error);

                res.status(400).json({
                        is_success: false,
                        official_email: OFFICIAL_EMAIL,
                        error: error.message || "Unknown server error"
                });
        }
})

module.exports = router;