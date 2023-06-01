const items1 = [
  {
    name: "極品紅茶",
    price: "30",
    thumb: 0,
  },
  {
    name: "老欉鐵觀音",
    price: "35",
    thumb: 0,
  },
  {
    name: "三韻紅萱",
    price: "40",
    thumb: 1,
  },
  {
    name: "翡翠綠茶",
    price: "30",
    thumb: 0,
  },
  {
    name: "三十三茶王",
    price: "40",
    thumb: 1,
  },
  {
    name: "四季春清茶",
    price: "35",
    thumb: 1,
  },
  {
    name: "紅水烏龍",
    price: "40",
    thumb: 1,
  },
  {
    name: "蜂蜜四季春",
    price: "50",
    thumb: 0,
  },
];
const items2 = [
  {
    name: "冬瓜鮮乳",
    price: "65",
    thumb: 0,
  },
  {
    name: "紅烏鮮乳",
    price: "69",
    thumb: 1,
  },
  {
    name: "巧克鮮乳茶",
    price: "69",
    thumb: 1,
  },
  {
    name: "龜記濃乳茶",
    price: "65",
    thumb: 1,
  },
  {
    name: "小農鮮乳茶(紅茶/翡翠/鐵觀音)",
    price: "65",
    thumb: 0,
  },
];
const items3 = [
  {
    name: "秀水旺梨春",
    price: "65",
    thumb: 1,
  },
  {
    name: "阿源楊桃(紅茶/翡翠)",
    price: "55",
    thumb: 1,
  },
  {
    name: "楊桃雷夢",
    price: "60",
    thumb: 0,
  },
  {
    name: "冬瓜雷夢",
    price: "55",
    thumb: 0,
  },
  {
    name: "豆漿紅茶",
    price: "40",
    thumb: 0,
  },
  {
    name: "珍珠奶茶(紅茶/翡翠/鐵觀音)",
    price: "55",
    thumb: 0,
  },
  {
    name: "極品奶茶(紅茶/翡翠/鐵觀音)",
    price: "50",
    thumb: 0,
  },
];
const items4 = [
  {
    name: "紅柚翡翠",
    price: "75",
    thumb: 1,
  },
  {
    name: "金桔拜觀音",
    price: "55",
    thumb: 1,
  },
  {
    name: "鮮果百香(紅茶/翡翠)",
    price: "55",
    thumb: 0,
  },
  {
    name: "翡翠雷夢",
    price: "55",
    thumb: 0,
  },
  {
    name: "香柚雷夢綠",
    price: "69",
    thumb: 1,
  },
  {
    name: "柳丁翡翠",
    price: "55",
    thumb: 1,
  },
  {
    name: "蘋果紅萱",
    price: "59",
    thumb: 1,
  },
  {
    name: "紫葡蘆薈春",
    price: "60",
    thumb: 1,
  },
  {
    name: "蜂蜜雷夢",
    price: "65",
    thumb: 0,
  },
  {
    name: "雷夢蘆薈蜜",
    price: "65",
    thumb: 1,
  },
  {
    name: "玉荷包茶王",
    price: "80",
    thumb: 0,
  },
];
const items5 = [
  {
    name: "黑木耳鮮乳",
    price: "65",
    thumb: 1,
  },
  {
    name: "手作薑茶",
    price: "45",
    thumb: 0,
  },
  {
    name: "桂圓紅棗茶",
    price: "55",
    thumb: 0,
  },
  {
    name: "薑汁奶茶",
    price: "55",
    thumb: 0,
  },
  {
    name: "薑汁雷夢",
    price: "55",
    thumb: 0,
  },
  {
    name: "薑汁桂圓",
    price: "55",
    thumb: 0,
  },
  {
    name: "擂茶豆漿",
    price: "65",
    thumb: 0,
  },
];

const itemGroup = [
  {
    title: "醇粹",
    group: items1,
  },
  {
    title: "小農鮮乳坊",
    group: items2,
  },
  {
    title: "古早味",
    group: items3,
  },
  {
    title: "鮮調",
    group: items4,
  },
  {
    title: "冬季限定",
    group: items5,
  },
];

//檢查是否有收藏該品牌
window.onload = function checkSave() {
  const save2 = JSON.parse(localStorage.getItem("save2")) || [];
  if (save2 === document.querySelector("h1").innerHTML) {
    document.querySelector(".heart").style.fontVariationSettings = `"FILL" 1`;
  }
};

//
//產生平均分數
function generateAverageScore() {
  const historys = JSON.parse(localStorage.getItem("record")) || [];
  //取出item與rating存進新陣列
  const scorePair = historys.map((record) => {
    return {
      item: record.item,
      rating: record.rating,
    };
  });

  const result = scorePair.reduce((accumulator, obj) => {
    if (!accumulator[obj.item]) {
      accumulator[obj.item] = { sum: 0, count: 0 };
    }
    accumulator[obj.item].sum += parseInt(obj.rating); // 將字串轉換為整數
    accumulator[obj.item].count++;
    return accumulator;
  }, {});
  const averageRatings = {};
  for (const item in result) {
    const average = (result[item].sum / result[item].count).toFixed(1); // 保留一位小數
    averageRatings[item] = parseFloat(average);
  }
  for (const group of itemGroup) {
    for (const item of group.group) {
      item.score = averageRatings[item.name] || "-";
    }
  }
}
generateAverageScore();

//
//產生menuGroup
let menuGroup = document.querySelector(".menuGroup");

function generateMGHTML(target) {
  return target
    .map((itemGroup) => {
      return `<section class="menu"><h3 class="category">${itemGroup.title}</h3>
      <ul class="menuList"></ul></section>`;
    })
    .join("");
}
menuGroup.innerHTML = generateMGHTML(itemGroup);

//產生items
function generateItemHTML(target) {
  return target
    .map((item) => {
      const thumbHTML =
        item.thumb === 1
          ? '<span class="material-symbols-rounded thumb"> thumb_up </span>'
          : "";
      return `
        <li class="updateDetails">
          <div class="itemL">
            <h6>${item.name}</h6>
            ${thumbHTML}
          </div>

          <div class="itemR">
            <span class="price">${item.price}</span>
            <span>|</span>
            <div class="average">
            <span class="material-symbols-rounded star">
              star</span>
              <span id="averageScore">${item.score}</span>
          </div>
          </div>
        </li>`;
    })
    .join("");
}

let menuLists = document.querySelectorAll(".menuList");

//迴圈生成各組內items
itemGroup.forEach((group, index) => {
  let menuList = menuLists[index];
  menuList.innerHTML = generateItemHTML(group.group);
});

//
//item如果有紀錄會變成var(--secondary-color)
function checkHasItem() {
  const historys = JSON.parse(localStorage.getItem("record")) || []; //取得record
  const targetItem = document.querySelectorAll("h6");
  for (let i = 0; i < targetItem.length; i++) {
    const hasItem = historys.some((e) => {
      return e.item == targetItem[i].textContent; //巢狀迴圈
    });
    if (hasItem) {
      targetItem[i].style.color = "var(--darkSecondary-color)";
      targetItem[i].style.fontWeight = "bold";
    }
  }
}
checkHasItem();

//
//顯示dialog
const updateButton = document.querySelectorAll(".updateDetails");
const favDialog = document.getElementById("favDialog");
const myForm = document.getElementById("myForm");
const confirmBtn = favDialog.querySelector("#confirmBtn");
const cancelBtn = favDialog.querySelector(".cancel");

//dialog帶入brand, item, price
const brandArea = document.getElementById("inpBrand"); //取得要放html的位子
const itemArea = document.getElementById("inpItem"); //取得要放html的位子
const priceArea = document.getElementById("inpPrice"); //取得要放html的位子
const brandTitle = document.querySelector(".brandDesc");
const brandName = brandTitle.querySelector("h1").textContent;

//點擊list帶入資料
updateButton.forEach((e) => {
  e.addEventListener("click", (e) => {
    favDialog.showModal();
    document.body.style.overflow = "hidden";
    favDialog.scrollTop = 0;

    //預設帶入當下時間
    const currentDate = new Date();
    const dateInput = document.getElementById("inpDate");
    const timeInput = document.getElementById("inpTime");

    // 設定日期輸入框的值
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    dateInput.value = `${year}-${month}-${day}`;

    // 設定時間輸入框的值
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    timeInput.value = `${hours}:${minutes}`;

    const itemName = e.currentTarget.querySelector("h6").textContent;
    itemArea.value = itemName;

    const itemPrice = e.currentTarget.querySelector(".price").textContent;
    priceArea.value = itemPrice;
    brandArea.value = brandName;
  });
});

cancelBtn.addEventListener("click", () => {
  favDialog.close();
  document.body.style.overflow = "auto";
  ratingInput.value = "";
  ratingStars.forEach((star) => {
    star.classList.remove("active");
  });
  previewImage.style.display = "none";
  uploadArea.style.backgroundColor = "var(--grey100)";

  myForm.reset();
});

confirmBtn.addEventListener("click", () => {
  favDialog.close();
  document.body.style.overflow = "auto";
});

//點擊外部關閉
window.onclick = function (e) {
  if (e.target == favDialog) {
    favDialog.close();
    document.body.style.overflow = "auto";
    previewImage.style.display = "none";
    uploadArea.style.backgroundColor = "var(--grey100)";
  }
};

//
//rating
const ratingStars = myForm.querySelectorAll(".star");
const ratingInput = document.getElementById("rating");

// 評分按鈕點擊事件處理程序
ratingStars.forEach((star) => {
  star.addEventListener("click", (e) => {
    const selectedRating = e.target.getAttribute("data-rating");
    ratingInput.value = selectedRating;

    // 移除所有星星的 active class
    ratingStars.forEach((star) => {
      star.classList.remove("active");
    });

    // 將選取的星星以及之前的星星加上 active class
    for (let i = 0; i < selectedRating; i++) {
      ratingStars[i].classList.add("active");
    }
  });
});

//
//上傳圖片
const fileUploader = document.getElementById("file-uploader");
const previewImage = document.getElementById("preview-image");
const uploadArea = document.querySelector(".upload");
let fileData;

// 監聽文件選擇事件
fileUploader.addEventListener("change", function (event) {
  const file = event.target.files[0];
  previewImage.style.display = "block";
  uploadArea.style.backgroundColor = "black";

  // 使用 FileReader 將文件轉換為 Data URL
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // 預覽圖片
    previewImage.src = reader.result;

    // 將圖片數據 URL 存入 fileData
    fileData = {
      name: file.name,
      type: file.type,
      size: file.size,
      dataURL: reader.result, // 正確地將數據 URL 設置到 fileData.dataURL
    };
  });

  reader.readAsDataURL(file);
});

//
// 在提交表單時觸發的事件處理函式
myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // 從表單中獲取輸入值
  const brand = document.getElementById("inpBrand").value;
  const item = document.getElementById("inpItem").value;
  const size = document.getElementById("inpSize").value;
  const price = document.getElementById("inpPrice").value;
  const date = document.getElementById("inpDate").value;
  const time = document.getElementById("inpTime").value;
  const sugar = document.querySelector('input[name="sugar"]:checked').value;
  const ice = document.querySelector('input[name="ice"]:checked').value;
  const note = document.getElementById("inpNote").value;
  const rating = ratingInput.value;
  const image = fileData || [];
  let id = new Date();

  const existed = JSON.parse(localStorage.getItem("record")) || [];

  // 儲存到 LocalStorage
  const record = {
    id,
    brand,
    item,
    size,
    price,
    date,
    time,
    sugar,
    ice,
    rating,
    note,
    image,
  };

  if (existed !== null) {
    existed.push(record);
    localStorage.setItem("record", JSON.stringify(existed));
  } else {
    let newArr = [record];
    localStorage.setItem("record", JSON.stringify(newArr));
  }

  // 清空表單欄位並重置星星樣式
  ratingInput.value = "";
  ratingStars.forEach((star) => {
    star.classList.remove("active");
  });

  previewImage.style.display = "none";
  uploadArea.style.backgroundColor = "var(--grey100)";

  // 重設表單
  myForm.reset();
  fileData = [];

  generateAverageScore();
  const averageScoreElements = document.querySelectorAll("#averageScore");
  averageScoreElements.forEach((element) => {
    const itemName =
      element.parentNode.parentNode.parentNode.querySelector("h6").textContent;
    const item = itemGroup
      .flatMap((group) => group.group)
      .find((item) => item.name === itemName);
    element.textContent = item.score || "-";
  });

  //顯示新存取的收集結果
  checkHasItem();

  // 顯示成功訊息
  const snackbar = document.querySelector(".snackbar");
  setTimeout(() => {
    snackbar.style.display = "block";
  }, 10);
  setTimeout(() => {
    snackbar.style.display = "none";
  }, 2000);
});

//
//收藏品牌toggle並存入local storage
function fillIcon(e) {
  if (e.style.fontVariationSettings === "") {
    e.style.fontVariationSettings = `"FILL" 1`;
    localStorage.setItem("save2", JSON.stringify(brandName));
    const snackbar = document.querySelector(".snackbar.marked");
    setTimeout(() => {
      snackbar.style.display = "block";
    }, 10);
    setTimeout(() => {
      snackbar.style.display = "none";
    }, 2000);
  } else {
    e.style.fontVariationSettings = "";
    localStorage.removeItem("save2");
    const snackbar = document.querySelector(".snackbar.unmarked");
    setTimeout(() => {
      snackbar.style.display = "block";
    }, 10);
    setTimeout(() => {
      snackbar.style.display = "none";
    }, 2000);
  }
}
