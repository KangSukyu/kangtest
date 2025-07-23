# ベースのイメージ
FROM node:20

# アプリディレクトリ作成
WORKDIR /usr/src/app

# 従属性の設置
COPY package*.json ./
RUN npm install

# アプリコードコピー
COPY . .

# Cloud Run ポート
ENV PORT=8080
EXPOSE 8080

# アプリ実行
CMD ["npm", "start"]
