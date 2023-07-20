// Custom middleware to validate the date parameter
const validateDateParam = (req, res, next) => {
const { date } = req.params;
    // Regular expression to check if the date is in the format 'YYYY-MM-DD'
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!date || !dateRegex.test(date)) {
        return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD.' });
    }
    next(); 
};


module.exports = validateDateParam;