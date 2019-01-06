const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app.use('/client', express.static('./client'));
app.use('/models', express.static('./models'));

app.get('/', (req, res) => {
  res.write
  res.redirect('/client');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
})
