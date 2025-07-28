const express = require("express");
const { OAuth2Client } = require("google-auth-library");

const app = express();
const client = new OAuth2Client();

// IAPのJWTを検証し、メールアドレスを抽出する関数
async function validateIapJwt(iapJwt) {
  // 1. IAPの設定から「Audience」（対象）の値を見つける必要があります。
  // この値は、数字形式のプロジェクト番号とバックエンドのIDで構成されます。
  // 例: /projects/YOUR_PROJECT_NUMBER/apps/YOUR_PROJECT_ID
  const audience =
    "/projects/1084961019166/global/backendServices/4131424749835012836";

  const ticket = await client.verifyIdToken({
    idToken: iapJwt,
    audience: audience,
  });

  const payload = ticket.getPayload();
  // payloadの中には、「email」や「sub」（ユーザーID）などの情報が含まれています。
  return payload;
}

// APIのメインルート
app.get("/api/user", async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).send("Authorization header not found.");
    }

    // 「Bearer <JWT>」という形式から、JWTの部分のみを抽出します。
    const iapJwt = authHeader.split(" ")[1];
    if (!iapJwt) {
      return res.status(401).send("JWT not found in Authorization header.");
    }

    // JWTの検証とpayloadの抽出
    const payload = await validateIapJwt(iapJwt);

    // 検証に成功した場合、メールアドレスをレスポンスとして返します。
    res.status(200).json({
      message: "Successfully validated IAP JWT.",
      email: payload.email,
    });
  } catch (error) {
    console.error("JWT validation error:", error.message);
    res.status(401).send(`JWT validation failed: ${error.message}`);
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
