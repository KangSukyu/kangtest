async function fetchBackendData() {
  // ★★★ バックエンドCloud RunのURLをここに入力してください ★★★
  const backendUrl = 'https://your-backend-service-url.a.run.app/api/data';
  const outputDiv = document.getElementById('response-output');
  
  outputDiv.textContent = 'バックエンドを呼び出し中...';

  // index.htmlで定義されたグローバル変数からJWTを取得
  if (!IAP_JWT) {
    outputDiv.textContent = 'エラー: JWTトークンが見つかりません。IAPが有効か確認してください。';
    return;
  }

  try {
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        // IAPから取得したJWTをAuthorizationヘッダーに含めて送信
        'Authorization': `Bearer ${IAP_JWT}`
      }
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`サーバーエラー: ${response.status} - ${JSON.stringify(responseData)}`);
    }
    
    // 成功した結果を整形して表示
    outputDiv.textContent = JSON.stringify(responseData, null, 2);

  } catch (error) {
    console.error('API呼び出し中にエラーが発生しました:', error);
    outputDiv.textContent = `エラー: ${error.message}`;
  }
}
