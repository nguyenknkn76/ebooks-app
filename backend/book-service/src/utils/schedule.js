const cron = require('node-cron');
const Book = require('../models/book');

const resetMonthly = () => {
  // Run at 00:00:01 on first day of each month
  cron.schedule('1 0 0 1 * *', async () => {
    try {
      await Book.updateMany(
        {},
        { monthly_views: 0 }
      );
      console.log('Monthly views reset successful');
    } catch (error) {
      console.error('Error resetting monthly views:', error);
    }
  });
};

module.exports = { resetMonthly };