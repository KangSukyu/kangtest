const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// 'public' ディレクトリ内の静的ファイル（main.jsなど）を提供
app.use(express.static('public'));

app.get('/', (req, res) => {
  // ① IAPからJWTヘッダーを取得
  const iapJwt = req.header('X-Goog-IAP-JWT-Assertion');

  // ② index.htmlファイルを読み込む
  const htmlPath = path.join(__dirname, 'public', 'index.html');
  fs.readFile(htmlPath, 'utf8', (err, html) => {
    if (err) {
      return res.status(500).send('Error reading HTML file.');
    }

    // ③ 読み込んだHTMLのプレースホルダーを実際のJWTに置き換えて送信
    // これで、ブラウザ側でJWTが使えるようになります。
    const modifiedHtml = html.replace('__IAP_JWT__', iapJwt || '');
    res.send(modifiedHtml);
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Frontend App listening on port ${PORT}`);
});
