# 合照姿勢素材

將圖片與音檔放在這個資料夾，並在 `src/features/group-photo-pose/poses.json` 填入標題與相對檔名。例如：

```json
{
  "id": "3-new",
  "people": 3,
  "title": "一起比愛心",
  "image": "3/new.jpg",
  "audio": "3/new.mp3"
}
```

對應檔案為 `public/group-photo-pose/3/new.jpg` 與 `public/group-photo-pose/3/new.mp3`。圖片建議 JPG、PNG 或 WebP；音檔建議 MP3。圖片預設完整顯示。`4-05` 另用 `crop` 設定，讓頁面只顯示原圖左側黑白漫畫（400 × 424）；`7-04` 只顯示下方隊員（原圖 y=287 起，375 × 246）；素材牆與大圖共用裁切設定，原始圖片檔案保留。

目前共有 32 組可抽選素材：3 人 3 組、4 人 11 組、5 人 6 組、6 人 5 組、7 人 4 組、8 人 3 組。已移除的素材不重用其 ID。

標題與圖片填妥即可進入抽選；音檔選填，尚未提供時保持 `"audio": ""`，不會播放音訊或顯示播放按鈕。目前 32 組素材皆已配對音檔。缺少標題或圖片的項目不會抽到。所有卡片只顯示人數，不顯示狀態小字。

「JOJO 埃及奢華旅遊團」已改為五人素材，保留原 ID `4-01` 與音檔路徑 `4/01.mp3`，讓既有 session 紀錄及音檔配對延續。

`id` 是不重複紀錄的依據，必須唯一且保持穩定，不要只因修改標題而更換。

路由是 `/group-photo-pose`；目前網站 base 是 `/engagement-party/`，完整路徑為 `/engagement-party/group-photo-pose`。

抽選動畫 1.8 秒，可略過。只有揭曉的結果才會寫入 `sessionStorage`，重新開始或重新整理不清除；抽完該人數後仍可繼續選擇，下一次會從該人數的全部素材開始新一輪；只重置該人數的紀錄，不影響其他人數。新一輪也只在揭曉時寫入，動畫中離開不會重置。紀錄以同一分頁的 page session 為範圍，不同步不同分頁或裝置。儲存空間不可用或紀錄損毀時暫停抽選，避免遺失紀錄而重複。

有提供音檔時，每次進入結果頁會嘗試自動播放一次，不循環播放；瀏覽器若阻擋自動播放，可按「播放音檔」。離開結果會停止音訊。活動前請在實際使用的手機／平板確認音量、自動播放、圖片與音檔載入。

## 素材牆

選人數頁提供「素材牆」入口，依 3～8 人由少到多分區，各區以響應式瀑布流（手機 2 欄、平板 3 欄、寬螢幕 4 欄）呈現全部素材，保留圖片比例與個別裁切設定。從小朋友區進入也會顯示全部素材。

點選卡片直接進入既有大圖結果頁，無抽選動畫；音檔存在時沿用自動播放與手動播放功能。「返回素材牆」回到剛才卡片並恢復焦點，「重新開始」回到一般人數選擇。單純瀏覽不寫入紀錄；點選大圖會記錄為已顯示，隨機抽選會避開它直到該輪抽完。素材牆仍允許手動重看，不會因此清除其他抽選紀錄。

## 小朋友區

目前共 7 組精選，涵蓋 3～7 人；8 人暫無精選素材，因此小朋友區的 8 人卡片停用，一般區仍可選擇。

選人數頁的「小朋友區」捷徑會切換至精選素材，再選合照總人數（含新人與大人）。重新開始會留在小朋友區，可按「返回全部姿勢」切回一般模式。兩區共用素材 ID 與 session 紀錄；一輪抽完後只重置當前區域、該人數的候選素材，不清除其他素材或其他人數。若該區該人數只有一組，下一輪仍會出現同一組。

依目前圖片的題材呈現、手勢難度與合照現場可操作性挑選，不是作品的年齡分級或全劇適齡判定。未指定孩子年齡，先採低門檻、可站穩完成的手勢；圖片中的道具、踩椅或抬腳動作不必照做。精選設定與結果提示在 `src/features/group-photo-pose/kids.ts`。

| 人數 | 精選素材 | 適合原因／模仿方式 |
| --- | --- | --- |
| 3 | 吉伊卡哇 節奏感小隊 | 可愛角色、胸前小手勢與表情，並排站立即可。 |
| 3 | 超級瑪利歐銀河電影版 | 舉手、抱胸，角色分工清楚；雙腳站地上，不踩椅子。 |
| 4 | 排球少年 | 運動小隊，叉腰或手放身側；不需球和其他道具。 |
| 4 | 寶可夢 火箭隊 | 俏皮角色與表情，站著伸手即可，不需蹲低。 |
| 5 | 名偵探柯南 少年偵探團 | 兒童團體，站穩後伸手、指向不同方向。 |
| 6 | 蠟筆小新 春日部防衛隊 | 玩具角色，站著伸手與張嘴即可，不需疊高或抬人。 |
| 7 | 數碼寶貝 | 模仿小隊員的招手、比讚與站姿。 |

其餘素材保留於一般區，未刪除。相對接近但未列入第一批的有「搖曳露營」（畫面含抬腳、單膝跪與高舉工具，幼童需較多簡化）、「齊木楠雄」（姿勢簡單但有坐桌邊與前後高低安排）、「派對咖孔明」（手勢可做，角色辨識與同步側身較需引導）。JOJO 系列、基紐特攻隊與黃金神威等素材動作或畫面較強烈；「相反的你和我」拼圖含倒立、躺地，不列入低門檻精選。「中華一番」與部分戰鬥題材的圖片有武器或持物姿勢；其他偏成人角色、道具依賴或站位不明顯的素材亦暫留一般區。

## 圖片來源

圖片已存入對應人數資料夾，頁面不依賴第三方圖片連線。

- `3/01.jpg`：吉伊卡哇 節奏感小隊 — https://www.twdreamlife.com/wp-content/uploads/2026/09/%E7%AF%80%E5%A5%8F%E6%84%9F%E5%B0%8F%E9%9A%8A.jpg
- `3/03.jpg`：JOJO 監獄風雲 — https://cdn.ttv.com.tw/summernotefiles/News/31974362-7743-438d-a3f9-49ae8bf1514b.jpg
- `3/04.webp`：超級瑪利歐銀河電影版 — https://media.nownews.com/nn_media/thumbnail/2026/03/1774712954064-bb11e0ff8e86424f8d02a84eaa8f9298-925x663.webp?unShow=false
- `5/jojo-egypt.jpg`：JOJO 埃及奢華旅遊團 — https://p2.bahamut.com.tw/HOME/creationCover/66/0005480266_B.JPG
- `4/02.jpg`：黃金神威 斯千卡 — https://pbs.twimg.com/media/EkIOSOzUwAEDbYw.jpg
- `4/03.png`：排球少年 — https://d2k0ho18x753k7.cloudfront.net/upload/img_up/3176f/648/bf0ce1c27b1112acb08a7889c0893d49.png
- `4/04.jpg`：為美好的世界獻上祝福！ — https://p2.bahamut.com.tw/B/2KU/64/fc526f81d0eb81cd090b3ec31d1d1y05.JPG
- `4/05.jpg`：路人超能 100 — https://cdn-origin.cool-style.com.tw/cool/2022/12/IMG_2155.jpg
- `4/06.jpg`：BEASTARS — https://img.4gamers.com.tw/ckfinder/images/Katy/comic%20animation/beastars194.jpg?versionId=qkxzw7Zs3Cd9iQ3GxhqXRJtmYarUnTlC
- `4/07-v2.jpg`：火影忍者 — https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiUjbXqs6h236YMvIoGypAZr4Az3m733VD2DXcbArcrcITOj27j3Y7_FdUfqbQXvMMOt1NbaZr2mzPZH_oZu3kcOQ0y8WjAIZ4uUKJKRrqJ_BlDli9Rf_4KAzdATjY6kO4UD9SDvnLQhFs/s1600/6647734_140146_1+%25281%2529.jpg
- `4/08-v2.jpg`：獵人 — https://www.domorenovel.com/wp-content/uploads/2024/10/egdm50v0i4q71.jpg
- `4/09.webp`：東島丹三郎想成為假面騎士 — https://img.vocus.cc/P4OESnFy20-vqModGE4Q02vkwuqcySya28IttoXEt0g/w:740/f:webp/plain/https://images.vocus.cc/b28a67ef-db63-49cc-9fbc-ff5b8613ad5e.jpg
- `4/10.jpg`：迷宮飯 — https://cdn.hk01.com/di/media/images/dw/20240720/891337179937116160982546.jpeg/mhturwwFIInaIkxbVEdPu7Bl6ReFF5uH67vMMuu7zDI
- `5/01.jpg`：輝夜姬想讓人告白 — https://i.kfs.io/playlist/global/73540184v2/cropresize/600x600.jpg
- `5/02.jpg`：搖曳露營 — https://img.4gamers.com.tw/news-image/736d3fc8-7730-487c-9581-16e500c6f111.jpg
- `5/03.jpg`：七龍珠 基紐特攻隊 — https://truth.bahamut.com.tw/s01/201901/ca9a0b88f8055a811893f088ba15f07a.JPG
- `6/01.jpg`：JOJO 義大利牛郎團 — https://p2.bahamut.com.tw/B/2KU/78/132119f2126dde48839c2163a2119q65.JPG
- `6/02.webp`：失憶投捕 — https://img.vocus.cc/ub0rBHt8-LIke-wCLHOn_QUVR8eiUe6Krr7PJ4Udsow/w:740/f:webp/plain/https://images.vocus.cc/e7e96a91-5966-47ca-9824-8ce280f569a3.jpg
- `7/01.jpg`：齊木楠雄的Ψ難 — https://pieayu.wordpress.com/wp-content/uploads/2018/01/saikikusuo2.jpg
- `7/02.webp`：工作細胞 — https://static.wikia.nocookie.net/vocuschinese/images/5/58/%E5%B7%A5%E4%BD%9C%E7%BB%86%E8%83%9E%EF%BC%9A%E7%BB%86%E8%83%9E%E5%A4%A7%E4%BD%9C%E6%88%98.jpg/revision/latest?cb=20240626015644&path-prefix=zh
- `7/03.jpg`：佐賀偶像是傳奇 — https://occ-0-4666-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABTcId3w9X8lT3W-acoaswwvTw2jnoQlqdpDrDjYbUBfZszpxNgWmNS7qUHYG4aLUsnplpj2_sfl5OuBnmOldfkpGNUp_oucCAcNY.jpg?r=589
- `8/01.jpg`：進擊的巨人 心臓を捧げよ — https://storage.moegirl.org.cn/moegirl/commons/c/c1/%E5%BF%83%E8%87%93%E3%82%92%E6%8D%A7%E3%81%92%E3%82%88.jpg!/fw/800/watermark/url/L21vZWdpcmwvd2F0ZXJtYXJrLnBuZw==/align/southeast/margin/10x10/opacity/50?v=20241219080731
- `8/02.jpg`：JOJO 日本哥譚市 — https://img.linetv.tw/large/drama/12384-p_220526.jpg
- `8/03.jpg`：相反的你和我 — https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaPqb36M6g810LFlS86Rpq1T1aFVwjrBiZabbLWqxzkMRFPZb7lSBVFb_f&s=10
- `4/11.jpg`：寶可夢 火箭隊 — https://megapx-assets.dcard.tw/images/416436a4-ecec-4695-8d0d-538f5305d7e8/640.jpeg
- `5/07.jpg`：名偵探柯南 少年偵探團 — https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnYw7ClzKBCNuO3K2CKcY2Jp19Qay1tvwjfZMUfY5hHWa1Ijh9_m0_12ut&s=10
- `5/08.png`：派對咖孔明 — https://static.popdaily.com.tw/u/202207/751aa3d0-a0fc-4580-8168-6a2d2adec4e0.png
- `6/04.png`：中華一番 — https://i.imgur.com/8hdp2Y2.png
- `6/05.jpg`：蠟筆小新 春日部防衛隊 — https://img.toy-people.com/member/167962731112.jpg
- `6/06.jpg`：黃金神威 陸軍第七馬戲團 — https://i.imgur.com/L1wwYhY.jpg
- `7/04.jpg`：數碼寶貝 — https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT72w8wmSmtaucCcyXPirWF5ADHijvPlGlXkXw-b4OT3W9tZP3K70ZfHQdm&s=10
- `4/12.jpg`：在沖繩喜歡上的女孩方言講得太過令人困擾 — https://image.tmdb.org/t/p/original/k6XhgD7ae9dsOJ5GiGvejdn3gxy.jpg

## 音檔配對

來源：`/Users/yuri.hh.tsai/婚婚合照`，依使用者確認的配對原檔複製，未裁切或轉碼。

| 人數 | 素材 | 原始音檔 | 網站音檔 |
| --- | --- | --- | --- |
| 3 | 吉伊卡哇 節奏感小隊 | 節奏感小隊.mp3 | `3/01.mp3` |
| 3 | JOJO 監獄風雲 | jojo 石之海.mp3 | `3/03.mp3` |
| 3 | 超級瑪利歐銀河電影版 | 耀西.mp3 | `3/04.mp3` |
| 5 | JOJO 埃及奢華旅遊團 | jojo 埃及旅行團.mp3 | `4/01.mp3` |
| 4 | 黃金神威 斯千卡 | 黃金神威.mp3 | `4/02.mp3` |
| 4 | 排球少年 | 排球少年.mp3 | `4/03.mp3` |
| 4 | 為美好的世界獻上祝福！ | 為美好世界獻上祝福.mp3 | `4/04.mp3` |
| 4 | 路人超能 100 | 路人超能100.mp3 | `4/05.mp3` |
| 4 | BEASTARS | beastars.mp3 | `4/06.mp3` |
| 4 | 火影忍者 | 火影忍者.mp3 | `4/07.mp3` |
| 4 | 獵人 | 獵人.mp3 | `4/08.mp3` |
| 4 | 東島丹三郎想成為假面騎士 | 東島丹三郎.mp3 | `4/09.mp3` |
| 4 | 迷宮飯 | 迷宮飯.mp3 | `4/10.mp3` |
| 4 | 寶可夢 火箭隊 | 寶可夢.mp3 | `4/11.mp3` |
| 4 | 在沖繩喜歡上的女孩方言講得太過令人困擾 | 沖繩方言.mp3 | `4/12.mp3` |
| 5 | 輝夜姬想讓人告白 | 輝夜想讓人告白.mp3 | `5/01.mp3` |
| 5 | 搖曳露營 | 搖曳露營.mp3 | `5/02.mp3` |
| 5 | 七龍珠 基紐特攻隊 | 七龍珠.mp3 | `5/03.mp3` |
| 5 | 名偵探柯南 少年偵探團 | 名偵探柯南.mp3 | `5/07.mp3` |
| 5 | 派對咖孔明 | 派對咖孔明.mp3 | `5/08.mp3` |
| 6 | JOJO 義大利牛郎團 | jojo 黃金之風.mp3 | `6/01.mp3` |
| 6 | 失憶投捕 | 失憶投捕.mp3 | `6/02.mp3` |
| 6 | 中華一番 | 中華一番.mp3 | `6/04.mp3` |
| 6 | 蠟筆小新 春日部防衛隊 | 蠟筆小新.mp3 | `6/05.mp3` |
| 6 | 黃金神威 陸軍第七馬戲團 | 黃金神威2.mp3 | `6/06.mp3` |
| 7 | 齊木楠雄的Ψ難 | 斉木楠雄のΨ難.mp3 | `7/01.mp3` |
| 7 | 工作細胞 | 工作細胞.mp3 | `7/02.mp3` |
| 7 | 佐賀偶像是傳奇 | 佐賀偶像是傳奇.mp3 | `7/03.mp3` |
| 7 | 數碼寶貝 | 數碼寶貝.mp3 | `7/04.mp3` |
| 8 | 進擊的巨人 心臓を捧げよ | 進擊的巨人.mp3 | `8/01.mp3` |
| 8 | JOJO 日本哥譚市 | jojo 不滅鑽石.mp3 | `8/02.mp3` |
| 8 | 相反的你和我 | 相反的你和我.mp3 | `8/03.mp3` |
