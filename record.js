const filterList = [
  {
    name: "All brands",
  },
  {
    name: "龜記",
  },
  {
    name: "清心福全",
  },
  {
    name: "可不可熟成紅茶",
  },
  {
    name: "迷客夏 MilkSha",
  },
  {
    name: "50嵐",
  },
  {
    name: "一沐日",
  },
  {
    name: "麻古茶坊",
  },
  {
    name: "Tea Top",
  },
  {
    name: "五桐號",
  },
  {
    name: "茶湯會",
  },
  {
    name: "珍煮丹",
  },
  {
    name: "萬波",
  },
  {
    name: "Coco",
  },
  {
    name: "得正",
  },
  {
    name: "七盞茶",
  },
  {
    name: "再睡五分鐘",
  },
  {
    name: "鮮茶道",
  },
  {
    name: "水巷茶弄",
  },
  {
    name: "大苑子",
  },
  {
    name: "Comebuy",
  },
];

function renderBrands(targetHTML) {
  const brandList = document.getElementById("brand-list");
  brandList.innerHTML = targetHTML;
}
//產生品牌List
function generateBrandHTML(targetBrands) {
  return targetBrands
    .map((filterList) => {
      return `<option value="${filterList.name}">${filterList.name}</option>`;
    })
    .join("");
}

renderBrands(generateBrandHTML(filterList));

//預設monthPicker當月
function setDefaultMonth() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const formattedDate = `${currentYear}-${currentMonth}`;
  document.querySelector("#monthPicker").value = formattedDate;
}
setDefaultMonth();

//
//呈現historylist
function renderHistoryList(historys) {
  const historyGroup = document.querySelector(".historyGroup");
  const historysHTML = historys
    .map((record) => {
      if (record.image.dataURL == undefined) {
        record.image.dataURL = "/img/noImage.svg";
      }
      let ratingHTML =
        record.rating == 0
          ? ""
          : `<span>${record.rating}</span>
      <span class="material-symbols-rounded"> star </span>`;

      return `
  <div class="history" data-id="${record.id}">
  <img src=${record.image.dataURL} />
  <div class="recordInfo">
    <div class="dateTime">
      <span class="dateDis">${record.date}</span>
      <span class="timeDis">${record.time}</span>
    </div>
    <div class="drinkInfo">
      <span>${record.item}</span>
      <span>|</span>
      <span>${record.sugar}${record.ice}</span>
      <div class="rating">
      ${ratingHTML}
      </div>
    </div>
    <h5 class="brandName">${record.brand}</h5>
  </div>
</div>
  `;
    })
    .join("");
  historyGroup.innerHTML = historysHTML;

  //點擊historylist產生dialog
  const editButton = document.querySelectorAll(".history");
  editButton.forEach((e, index) => {
    let editList = editButton[index];
    editList.addEventListener("click", (e) => {
      const history = JSON.parse(localStorage.getItem("record"));
      let id = e.currentTarget.getAttribute("data-id");
      targetDialog = history.find((record) => record.id === id);
      renderDialog(targetDialog); //帶入用id抓出來的local storage資料
    });
  });
}

//
//用物件存取目前所有篩選與排序的狀態
//產生初始historylist，預設篩選當月、排序日期最新
let filterState = {
  month: document.querySelector("#monthPicker").value,
  brand: null,
  sort: "newest",
};
applyFiltersAndSort();

function applyFiltersAndSort() {
  let historys = JSON.parse(localStorage.getItem("record")) || [];
  if (filterState.month) {
    historys = historys.filter((e) => e.date.slice(0, 7) == filterState.month);
  }
  if (filterState.brand && filterState.brand !== "All brands") {
    historys = historys.filter((e) => e.brand === filterState.brand);
  }
  if (filterState.sort === "highest") {
    historys.sort((a, b) => b.rating - a.rating);
  } else if (filterState.sort === "lowest") {
    historys.sort((a, b) => a.rating - b.rating);
  } else if (filterState.sort === "newest") {
    historys.sort((a, b) => {
      if (b.date > a.date) {
        return 1;
      } else if (b.date < a.date) {
        return -1;
      } else {
        if (b.time > a.time) {
          return 1;
        } else if (b.time < a.time) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  } else if (filterState.sort === "oldest") {
    historys.sort((a, b) => {
      if (b.date > a.date) {
        return 1;
      } else if (b.date < a.date) {
        return -1;
      } else {
        if (b.time > a.time) {
          return 1;
        } else if (b.time < a.time) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    historys.reverse();
  }
  renderHistoryList(historys);
}

//篩選日期
function filterMonth(picker) {
  filterState.month = picker.value;
  applyFiltersAndSort();
}

//篩選品牌
function filterBrand(selectList) {
  const selectedIndex = selectList.selectedIndex;
  const selectedBrand = selectList.options[selectedIndex].value;
  filterState.brand = selectedBrand;
  applyFiltersAndSort();
}

// sort
const dropDown = document.querySelector("#myDropdown");
const sortBtn = document.querySelector(".sort");
sortBtn.onclick = (e) => {
  dropDown.classList.toggle("showDrop");
};

//點擊空白處關閉sort
document.addEventListener("click", (e) => {
  if (e.target === sortBtn || sortBtn.contains(e.target)) {
    return;
  }
  dropDown.classList.remove("showDrop");
});

const sortNew = document.querySelector("#sortByNew");
const sortOld = document.querySelector("#sortByOld");
const sortHigh = document.querySelector("#sortByHigh");
const sortLow = document.querySelector("#sortByLow");
const allSort = document.querySelectorAll("#myDropdown span");

//rating評分排序
sortHigh.onclick = (e) => {
  filterState.sort = "highest";
  applyFiltersAndSort();

  const sortText = document.querySelector("#sortText");
  sortText.innerHTML = "Highest";
  allSort.forEach((sort) => {
    sort.classList.remove("active");
  });
  sortHigh.classList.add("active");
};

sortLow.onclick = (e) => {
  filterState.sort = "lowest";
  applyFiltersAndSort();

  const sortText = document.querySelector("#sortText");
  sortText.innerHTML = "Lowest";
  allSort.forEach((sort) => {
    sort.classList.remove("active");
  });
  sortLow.classList.add("active");
};

//日期排序
sortNew.onclick = (e) => {
  filterState.sort = "newest";
  applyFiltersAndSort();

  const sortText = document.querySelector("#sortText");
  sortText.innerHTML = "Newest";
  allSort.forEach((sort) => {
    sort.classList.remove("active");
  });
  sortNew.classList.add("active");
};

sortOld.onclick = (e) => {
  filterState.sort = "oldest";
  applyFiltersAndSort();

  const sortText = document.querySelector("#sortText");
  sortText.innerHTML = "Oldest";
  allSort.forEach((sort) => {
    sort.classList.remove("active");
  });
  sortOld.classList.add("active");
};

//
//產生dialog
const dialogFrame = document.getElementById("editDialog");
let targetDialog; //點擊到的local storage資料

//生成dialog內容並帶入紀錄
function renderDialog(target) {
  const editDialog = document.querySelector(".form");
  let imgHTML = `<img id="preview-image" src="" style="display: none" />`;
  let uploadBackground = "";
  if (target.image.dataURL && target.image.dataURL != "/img/noImage.svg") {
    imgHTML = `<img id="preview-image" src="${target.image.dataURL}"/>`;
    uploadBackground = `style="background-color: black"`;
  }

  editDialog.innerHTML = `
    <input type='hidden' name='id' value='${target.id}'/>
    <div class="upload" ${uploadBackground}>
    <input
      type="file"
      class="file"
      id="file-uploader"
      data-target="file-uploader"
      accept="image/png, image/jpeg"
      multiple="multiple"
    />
    ${imgHTML}
    <span class="material-symbols-rounded"> cloud_upload </span>
    <p>Drag & Drop here<br />or<br />Click to Upload</p>
    </div>

  <div class="diaInput">
    <p>
      <label for="inpBrand">Brand</label>
      <input
        type="text"
        id="inpBrand"
        value="${target.brand}"
        name="inpBrand"
        disabled
      />
    </p>
    <p>
      <label for="inpItem">Item</label>
      <input
        type="text"
        id="inpItem"
        value="${target.item}"
        name="inpItem"
        disabled
      />
    </p>
    <p>
      <label for="inpSize">Size</label>
      <select id="inpSize" name="inpSize">
        <option value="l">L</option>
        <option value="s">S</option>
      </select>
    </p>
    <p>
      <label for="inpPrice">Price</label>
      <input type="text" id="inpPrice" name="inpPrice" value="${
        target.price
      }" disabled />
    </p>
    <p>
      <label for="inpDate">Date</label>
      <input type="date" id="inpDate" name="inpDate" value="${target.date}"/>
    </p>
    <p>
      <label for="inpTime">Time</label>
      <input type="time" id="inpTime" name="inpTime" value="${target.time}"/>
    </p>

    <div class="inpRadio">
      <p>Sugar</p>
      <div class="radioGroup">
        <p>
          <input
            type="radio"
            name="sugar"
            id="inpSugar0"
            value="無糖"
            ${target.sugar === "無糖" ? 'checked="checked"' : ""}
          />
          <label for="inpSugar0">無糖</label>
        </p>
        <p>
          <input
            type="radio"
            name="sugar"
            id="inpSugar10"
            value="一分糖"
            ${target.sugar === "一分糖" ? 'checked="checked"' : ""}
          />
          <label for="inpSugar10">一分糖</label>
        </p>
        <p>
          <input
            type="radio"
            name="sugar"
            id="inpSugar30"
            value="微糖"
            ${target.sugar === "微糖" ? 'checked="checked"' : ""}
          />
          <label for="inpSugar30">微糖</label>
        </p>
        <p>
          <input
            type="radio"
            name="sugar"
            id="inpSugar50"
            value="半糖"
            ${target.sugar === "半糖" ? 'checked="checked"' : ""}

          />
          <label for="inpSugar50">半糖</label>
        </p>
        <p>
          <input
            type="radio"
            name="sugar"
            id="inpSugar70"
            value="少糖"
            ${target.sugar === "少糖" ? 'checked="checked"' : ""}

          />
          <label for="inpSugar70">少糖</label>
        </p>
        <p>
          <input
            type="radio"
            name="sugar"
            id="inpSugar100"
            value="全糖"
            ${target.sugar === "全糖" ? 'checked="checked"' : ""}
          />
          <label for="inpSugar100">全糖</label>
        </p>
      </div>
    </div>
    <div class="inpRadio">
      <p>Ice</p>
      <div class="radioGroup">
        <p>
          <input
            type="radio"
            name="ice"
            id="inpIce0"
            value="常溫"
            ${target.ice === "常溫" ? 'checked="checked"' : ""}

          />
          <label for="inpIce0">常溫</label>
        </p>
        <p>
          <input type="radio" name="ice" id="inpIce10" value="去冰" ${
            target.ice === "去冰" ? 'checked="checked"' : ""
          }
          />
          <label for="inpIce10">去冰</label>
        </p>
        <p>
          <input type="radio" name="ice" id="inpIce30" value="微冰"
          ${target.ice === "微冰" ? 'checked="checked"' : ""}
          />
          <label for="inpIce30">微冰</label>
        </p>
        <p>
          <input type="radio" name="ice" id="inpIce50" value="半冰"
          ${target.ice === "半冰" ? 'checked="checked"' : ""}
          />
          <label for="inpIce50">半冰</label>
        </p>
        <p>
          <input type="radio" name="ice" id="inpIce70" value="少冰"
          ${target.ice === "少冰" ? 'checked="checked"' : ""}
          />
          <label for="inpIce70">少冰</label>
        </p>
        <p>
          <input type="radio" name="ice" id="inpIce100" value="正常"
          ${target.ice === "正常" ? 'checked="checked"' : ""}
          />
          <label for="inpIce100">正常</label>
        </p>
      </div>
    </div>

    <div class="inpRating">
      <p>Rating</p>
      <div class="rateGroup">
        <span class="material-symbols-rounded star" data-rating="1">
          star
        </span>
        <span class="material-symbols-rounded star" data-rating="2">
          star
        </span>
        <span class="material-symbols-rounded star" data-rating="3">
          star
        </span>
        <span class="material-symbols-rounded star" data-rating="4">
          star
        </span>
        <span class="material-symbols-rounded star" data-rating="5">
          star
        </span>
      </div>
      <input type="hidden" id="rating" name="rating" value="${target.rating}" />
    </div>
    <div class="inpArea">
      <p>Note</p>
      <textarea
        name="inpNote"
        id="inpNote"
        cols="30"
        rows="3"
        value="${target.note}"
      >${target.note}</textarea>
    </div>
  </div>`;
  const myForm = document.getElementById("myForm");
  const ratingStars = myForm.querySelectorAll(".star");
  const ratingInput = document.getElementById("rating");

  for (let i = 0; i < target.rating; i++) {
    ratingStars[i].classList.add("active");
  }
  //rating
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

  //上傳圖片
  const fileUploader = document.getElementById("file-uploader");
  const previewImage = document.getElementById("preview-image");
  const uploadArea = document.querySelector(".upload");

  // 監聽文件選擇事件
  fileUploader.addEventListener("change", (event) => {
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

  dialogFrame.showModal();
  document.body.style.overflow = "hidden";
  dialogFrame.scrollTop = 0;
}

let fileData;

//
//delete
const deleteBtn = document.querySelector(".delete");
const deleteModal = document.querySelector("#confirmationModal");
const confirmDelete = document.querySelector(
  "#confirmationModal #confirmDelete"
);
const cancelDelete = document.querySelector("#confirmationModal #cancelDelete");
const overlay = document.querySelector("#editDialog .overlay");

//開啟防呆modal
deleteBtn.onclick = (e) => {
  deleteModal.style.display = "block";
  overlay.style.display = "block";
  dialogFrame.style.overflow = "hidden";
};

//確認刪除
confirmDelete.onclick = (e) => {
  deleteModal.style.display = "none";
  overlay.style.display = "none";
  dialogFrame.close();

  //delete historyList
  let historys = JSON.parse(localStorage.getItem("record"));
  const id =
    e.currentTarget.parentNode.parentNode.parentNode.querySelector(
      'input[name="id"]'
    ).value;
  const index = historys.findIndex((record) => record.id === id);
  const deleteItem = document.querySelector(`[data-id="${id}"]`);
  deleteItem.remove();

  //delete from local storage
  historys.splice(index, 1);

  localStorage.setItem("record", JSON.stringify(historys));
  dialogFrame.style.overflow = "auto";
  document.body.style.overflow = "auto";

  // 顯示成功訊息
  const snackbar = document.querySelector(".snackbar");
  snackbar.innerHTML = `${targetDialog.brand} ${targetDialog.item} deleted`;
  setTimeout(() => {
    snackbar.style.display = "block";
  }, 10);
  setTimeout(() => {
    snackbar.style.display = "none";
  }, 2000);
};

cancelDelete.onclick = (e) => {
  deleteModal.style.display = "none";
  overlay.style.display = "none";
  dialogFrame.style.overflow = "auto";
};

//
//監聽表單的提交事件
myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // 獲取原始資料
  let historys_ = JSON.parse(localStorage.getItem("record"));
  const id = e.currentTarget.querySelector('input[name="id"]').value;
  const index = historys_.findIndex((item) => item.id === id);

  // 檢查圖片是否有變更
  let updatedImage = targetDialog.image;
  if (fileData && fileData.dataURL !== targetDialog.image.dataURL) {
    updatedImage = fileData;
  }

  // 獲取表單中被編輯的資料
  const editedData = {
    brand: document.getElementById("inpBrand").value,
    item: document.getElementById("inpItem").value,
    size: document.getElementById("inpSize").value,
    price: document.getElementById("inpPrice").value,
    date: document.getElementById("inpDate").value,
    time: document.getElementById("inpTime").value,
    sugar: document.querySelector('input[name="sugar"]:checked').value,
    ice: document.querySelector('input[name="ice"]:checked').value,
    rating: document.getElementById("rating").value,
    note: document.getElementById("inpNote").value,
    image: updatedImage || [],
  };

  // 將編輯後的資料更新到該筆記錄

  Object.assign(historys_[index], editedData);
  // 將更新後的資料存回 local storage
  localStorage.setItem("record", JSON.stringify(historys_));

  const firstSixChars = document
    .querySelector("#monthPicker")
    .value.slice(0, 7);
  historys_ = historys_.filter((e) => e.date.slice(0, 7) === firstSixChars);

  historys_.sort((a, b) => {
    if (b.date > a.date) {
      return 1; // b.date 晚於 a.date，b 應排在 a 之後
    } else if (b.date < a.date) {
      return -1; // b.date 早於 a.date，b 應排在 a 之前
    } else {
      // 日期相同，比較時間
      if (b.time > a.time) {
        return 1; // b.time 晚於 a.time，b 應排在 a 之後
      } else if (b.time < a.time) {
        return -1; // b.time 早於 a.time，b 應排在 a 之前
      } else {
        return 0; // 日期和時間相同，保持原有順序
      }
    }
  });

  renderHistoryList(historys_);
  dialogFrame.close();
  document.body.style.overflow = "auto";

  // 顯示成功訊息
  const snackbar = document.querySelector(".snackbar");
  setTimeout(() => {
    snackbar.style.display = "block";
  }, 10);
  setTimeout(() => {
    snackbar.style.display = "none";
  }, 1500);
});

document.querySelector("#editDialog .cancel").onclick = (e) => {
  dialogFrame.close();
  document.body.style.overflow = "auto";
};

//點擊外部關閉
window.onclick = function (e) {
  if (e.target == dialogFrame) {
    dialogFrame.close();
    document.body.style.overflow = "auto";
  }
};

//
//chart.js
function generateCharts() {
  const brandCounts = {};
  const itemCounts = {};
  let historys = JSON.parse(localStorage.getItem("record"));
  historys.forEach((e) => {
    const brand = e.brand;
    brandCounts[brand] = (brandCounts[brand] || 0) + 1;
    const item = e.item;
    itemCounts[item] = (itemCounts[item] || 0) + 1;
  });

  //將物件轉換成陣列，並根據出現次數進行排序
  const sortedBrands = Object.entries(brandCounts).sort((a, b) => b[1] - a[1]);
  const sortedItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]);

  //取出前 6 個出現次數最多的
  const topBrands = sortedBrands.slice(0, 6).map((entry) => entry[0]);
  const topData1 = sortedBrands.slice(0, 6).map((entry) => entry[1]);
  const topItems = sortedItems.slice(0, 6).map((entry) => entry[0]);
  const topData2 = sortedItems.slice(0, 6).map((entry) => entry[1]);

  //產生bar chart
  const ctx1 = document.getElementById("brandChart");
  const ctx2 = document.getElementById("itemChart");

  new Chart(ctx1, {
    type: "bar",
    data: {
      labels: topBrands,
      datasets: [
        {
          label: "Brand",
          data: topData1,
          backgroundColor: "#f3a243",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1, // 設定刻度的固定距離為 1，確保刻度為整數
            maxTicksLimit: 5, //最大刻度數量
          },
        },
      },
    },
  });

  new Chart(ctx2, {
    type: "bar",
    data: {
      labels: topItems,
      datasets: [
        {
          label: "Item",
          data: topData2,
          backgroundColor: "#9d9cd4",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1, // 設定刻度的固定距離為 1，確保刻度為整數
            maxTicksLimit: 8, //最大刻度數量
          },
        },
      },
    },
  });
}
generateCharts();
