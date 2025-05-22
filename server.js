const { connectDB } = require('./db');
const app = require('./app');

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
   app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
   });
});