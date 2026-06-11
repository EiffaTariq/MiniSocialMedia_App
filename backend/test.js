import express from 'express';
const app = express();
const PORT = 7000;
app.get('/', (req, res) => {
  res.send('Hello from test server');
});
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});