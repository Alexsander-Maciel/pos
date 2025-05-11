const express = require('express');
require('dotenv').config();
const authRoutes = require('./src/routes/login/authRoutes');
const userRoutes = require('./src/routes/administrativo/user/userRoutes');
const groupRoutes = require('./src/routes/administrativo/group/groupRoutes');
const menuRoutes = require('./src/routes/administrativo/menu/menuRoutes');



const app = express();
app.use(express.json());

app.use('/api/login/auth', authRoutes);
app.use('/api/admin/user', userRoutes);
app.use('/api/admin/group', groupRoutes);
app.use('/api/admin/menu', menuRoutes);






app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
