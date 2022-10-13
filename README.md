# 我的餐廳清單 My Restaurant's List - 簡介

紀錄自己喜歡的餐廳清單，可以瀏覽餐廳、查看餐廳詳細資訊、連結餐廳地址到GOOGLE-MAP、新增餐廳、編輯餐廳資訊、刪除餐廳。

首頁圖
![Index page about Restaurant List](./public/image/v2_restaurantList.png)

餐廳詳細資訊圖
![Index page about Restaurant List](./public/image/v2_restaurantInfo.png)

## 功能列表

- 首頁可查看清單內所有的餐廳，有簡單資訊如店名、餐廳類型及評分
- 點擊餐廳圖片及Detail可瀏覽餐廳的詳細資訊，如地址、電話等
- 連結餐廳的地址到 Google 地圖
- 可以透過關鍵字或餐廳類型搜尋餐廳
- 可以新增餐廳
- 可以編輯清單內的餐廳
- 可以刪除餐廳
- 首頁可以依餐廳名字、類型、地區、評分等排序餐廳顯示順序

### 安裝與執行步驟

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 環境變數設置: 
   * Windows cmd： set "MONGODB_PATH=你的MongoDB連線字串"
   * MacOS terminal and git bash :  export MONGODB_PATH="你的MongoDB連線字串"
4. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```
   npm install  //安裝套件
   ```

5. 安裝完畢後，繼續輸入：

   ```
   npm run start  //執行程式
   ```

6. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```
   Listening on http://localhost:3000
   ```

7. 結束使用

   ```
   ctrl + c  //結束程式
   ```

### 開發工具

- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) 
- [Node.js](https://nodejs.org/en/)
- [Express 4.16.4](https://www.npmjs.com/package/express) -
- [Express-Handlebars 3.0.0](https://www.npmjs.com/package/express-handlebars)
- [Bootstrap 4.3.1](https://getbootstrap.com/docs/4.3/getting-started/download/)
- [Font-awesome 5.8.1](https://fontawesome.com/)
- [MongoDB](https://www.mongodb.com/try/download/community2)
- [Mongoose 5.9.7](https://www.npmjs.com/package/mongoose)