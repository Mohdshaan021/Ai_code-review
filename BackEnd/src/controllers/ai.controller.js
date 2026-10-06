const aiService = require("../services/ai.service")


module.exports.getReview = async (req, res) => {
    const code = req.body?.code ?? req.query?.code;

    if (!code || typeof code !== 'string' || !code.trim()) {
        return res.status(400).send("Prompt is required");
    }

    try {
        const response = await aiService(code);
        return res.json({ review: response });
    } catch (error) {
        console.error('AI review error:', {
            status: error?.status,
            message: error?.message,
        });
        const isTemporarilyUnavailable =
            error?.status === 429 ||
            error?.status === 503 ||
            /timeout|abort/i.test(error?.message || '');
        return res.status(isTemporarilyUnavailable ? 503 : 502).json({
            message: isTemporarilyUnavailable
                ? 'Gemini is temporarily unavailable. Please try again shortly.'
                : 'Unable to generate a review. Check the Gemini API key and model configuration.',
        });
    }
}