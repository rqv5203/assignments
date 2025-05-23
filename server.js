const { connectDB } = require('./db');
const app = require('./app');
const User = require('./models/User');

const PORT = process.env.PORT || 3000;

connectDB().then(async () => {
   // Create indexes for the users collection
   await User.createIndexes();
   
   app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
   });
});