# ベースのイメージ
FROM node:20-slim

# アプリディレクトリ作成
WORKDIR /usr/src/app

# 従属性の設置
COPY package*.json ./
RUN npm install --only=production

# アプリコードコピー
COPY . .

# Cloud Run ポート
ENV PORT=8080

# アプリ実行
CMD [ "node", "server.js" ]
