
const port = process.env.PORT || 3000;
let app = require('./app');

app.listen(port, () => console.log(`Listening to port ${port}...`));