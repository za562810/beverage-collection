//index品牌
const brands = [
  {
    name: "龜記",
    logo: "./img/brands/01.png",
    url: "/brand2.html",
  },
  {
    name: "清心福全",
    logo: "./img/brands/02.png",
    url: "0",
  },
  {
    name: "可不可熟成紅茶",
    logo: "./img/brands/03.png",
    url: "0",
  },
  {
    name: "迷客夏 MilkSha",
    logo: "./img/brands/04.png",
    url: "/brand.html",
  },
  {
    name: "50嵐",
    logo: "./img/brands/05.png",
    url: "0",
  },
  {
    name: "一沐日",
    logo: "./img/brands/06.png",
    url: "0",
  },
  {
    name: "麻古茶坊",
    logo: "./img/brands/07.png",
    url: "0",
  },
  {
    name: "Tea Top",
    logo: "./img/brands/08.png",
    url: "0",
  },
  {
    name: "五桐號",
    logo: "./img/brands/09.png",
    url: "0",
  },
  {
    name: "茶湯會",
    logo: "./img/brands/10.png",
    url: "0",
  },
  {
    name: "珍煮丹",
    logo: "./img/brands/11.png",
    url: "0",
  },
  {
    name: "萬波",
    logo: "./img/brands/12.png",
    url: "0",
  },
  {
    name: "Coco",
    logo: "./img/brands/13.png",
    url: "0",
  },
  {
    name: "得正",
    logo: "./img/brands/14.png",
    url: "0",
  },
  {
    name: "七盞茶",
    logo: "./img/brands/15.png",
    url: "0",
  },
  {
    name: "再睡五分鐘",
    logo: "./img/brands/16.png",
    url: "0",
  },
  {
    name: "鮮茶道",
    logo: "./img/brands/17.png",
    url: "0",
  },
  {
    name: "水巷茶弄",
    logo: "./img/brands/18.png",
    url: "0",
  },
  {
    name: "大苑子",
    logo: "./img/brands/19.png",
    url: "0",
  },
  {
    name: "Comebuy",
    logo: "./img/brands/20.png",
    url: "0",
  },
];

const historys = JSON.parse(localStorage.getItem("record")) || []; //取得record

//search
function brandFilter(targetBrand, all = brands) {
  return all.filter((e) => {
    return e.name.includes(targetBrand);
  });
}

function sortByName() {
  brands.sort((a, b) => a.name.localeCompare(b.name, "zh-Hant"));
}

function renderBrands(targetHTML) {
  let brandList = document.querySelector(".grid");
  brandList.innerHTML = targetHTML;
}

function generateBrandHTML(targetBrands) {
  return targetBrands
    .map((brands) => {
      const isMatched = historys.some((e) => e.brand === brands.name);
      const logoStyle = isMatched ? 'style="filter: grayscale(0);" ' : "";

      return `<a href="${brands.url}" data-name="${brands.name}"><img class="brandList" src="${brands.logo}" alt="${brands.name}" ${logoStyle} /></a>`;
    })
    .join("");
}

//產生品牌logo
sortByName(); //預設以name sort
renderBrands(generateBrandHTML(brands));

const logoDiv = document.querySelectorAll("a");
const ConstructionModal = document.querySelector("#confirmationModal");
const closeBtn = ConstructionModal.querySelector("#closeBtn");
const overlay = document.querySelector(".overlay");

logoDiv.forEach((e, index) => {
  let logo = logoDiv[index];
  logo.addEventListener("click", (e) => {
    if (e.currentTarget.href[e.currentTarget.href.length - 1] == 0) {
      e.preventDefault();
      ConstructionModal.style.display = "block";
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  });
});

closeBtn.addEventListener("click", () => {
  ConstructionModal.style.display = "none";
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
});

//搜尋enter或是點擊icon
document.querySelector(".search").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    renderBrands(generateBrandHTML(brandFilter(e.target.value)));
  }
});
document.querySelector(".magnifier").addEventListener("click", (e) => {
  renderBrands(
    generateBrandHTML(
      brandFilter(document.querySelector(".search input").value)
    )
  );
});

//
//sort
const sortBtn = document.querySelector(".sort");
const dropDown = document.querySelector("#myDropdown");
sortBtn.addEventListener("click", (e) => {
  dropDown.classList.toggle("showDrop");
});

//點擊空白處關閉sort
document.addEventListener("click", (e) => {
  if (e.target === sortBtn || sortBtn.contains(e.target)) {
    return;
  }
  dropDown.classList.remove("showDrop");
});

const sortFavorite = document.querySelector("#sortByFavorite");
const sortName = document.querySelector("#sortByName");
const saved = JSON.parse(localStorage.getItem("save")) || [];
const saved2 = JSON.parse(localStorage.getItem("save2")) || [];
const allSort = dropDown.querySelectorAll("span");

sortName.addEventListener("click", () => {
  sortByName();
  renderBrands(generateBrandHTML(brands));
  const sortText = document.querySelector("#sortText");
  sortText.innerHTML = "Name";
  allSort.forEach((sort) => {
    sort.classList.remove("active");
  });
  sortName.classList.add("active");
});

//favorite排序
function sortByBrand() {
  brands.sort((a, b) => {
    if (a.name === saved || a.name === saved2) {
      return -1; // 將包含 'saved' 的物件排在前面
    } else if (b.name === saved) {
      return 1;
    } else {
      return 0; // 其他物件的順序不變
    }
  });
}

sortFavorite.addEventListener("click", () => {
  sortByBrand();
  renderBrands(generateBrandHTML(brands));
  const sortText = document.querySelector("#sortText");
  sortText.innerHTML = "Favorite";
  allSort.forEach((sort) => {
    sort.classList.remove("active");
  });
  sortFavorite.classList.add("active");
});
