const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const jwt = req.header('X-Goog-IAP-JWT-Assertion');
  res.send(`
    <html>
      <body>
        <code>${jwt ? jwt : "No JWT header"}</code>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
