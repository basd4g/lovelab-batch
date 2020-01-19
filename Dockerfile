FROM node:13-alpine

# lovelab-apiが立ち上がっていることを確認するwait-for-lovelab.shでcurlコマンドを使うため
# lovelab-apiが立ち上がっている => databaseが立ち上がっている && database上のテーブルが作成されている
RUN apk --update add curl

# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
# 可能であれば (npm@5+)
COPY package*.json ./

RUN npm install
# 本番用にコードを作成している場合
# RUN npm install --only=production

# アプリケーションのソースをバンドルする
COPY . .

CMD [ "npm", "start" ]
