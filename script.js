const salesInput = document.getElementById("sales-input");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("add-btn");
const items = document.getElementById("items");
const addSalesBtn = document.getElementById("add-sales-btn");
const salesCards = document.getElementById("sales-cards");
const inputGroups = document.querySelector(".input-groups");
const backBtn = document.querySelector(".back-btn");
const back = document.querySelector(".back");
const saveBtn = document.getElementById("save-btn");
const salesItems = document.getElementById("sales-items");
const salesModalOpen = document.getElementById("sales-modal-open");

const salesList = [];
const salesCardsList = JSON.parse(localStorage.getItem("salesCards")) || [];

/* ===== view transitions ===== */
function openSalesModal() {
  inputGroups.style.display = "flex";
  items.style.display = "block";
  salesCards.style.display = "none";
  addSalesBtn.style.display = "none";
  salesModalOpen.style.display = "none";
}

function goBack() {
  inputGroups.style.display = "none";
  salesCards.style.display = "block";
  addSalesBtn.style.display = "block";
  salesModalOpen.style.display = "none";
}

/* ===== add sale (input screen) ===== */
function addSales() {
  const salesValue = salesInput.value.trim();
  const amountValue = amount.value;

  if (!salesValue || !amountValue) return;

  salesList.push({
    description: salesValue,
    amount: amountValue,
  });

  salesInput.value = "";
  amount.value = "";
  salesInput.focus();

  let totalAmount = 0;
  for (const sale of salesList) {
    totalAmount += Number(sale.amount);
  }

  const salesItemsHtml = salesList
    .map(
      (item, index) => `
        <div class="item" key="${index}">
          <p style="display:flex; justify-content: space-between">
            ${index + 1}. ${item.description}
            <span style="font-weight:600; color:#1c5b78; margin-left:0.25rem;">
              ${item.amount.toLocaleString()}
            </span>
          </p>
        </div>
      `
    )
    .join("");

  items.innerHTML = `
    <p>${salesItemsHtml}</p>
    <p>₦${totalAmount.toLocaleString()}</p>
  `;
}

/* ===== render sales cards (list screen) ===== */
function renderSalesCardList() {
  salesCards.innerHTML = salesCardsList
    .map(
      (sales, index) => `
        <div class="sales-card" data-index="${index}">
          <p>🗓️ ${sales.date}</p>
          <p>${sales.amount}</p>
        </div>
      `
    )
    .join("");

  salesModalOpen.style.display = "none";
}

/* ===== save current sales list ===== */
function saveSalesList() {
  const date = new Date().toLocaleDateString("en-CA");

  if (salesList.length === 0) return;

  let totalAmount = 0;
  for (const sale of salesList) {
    totalAmount += Number(sale.amount);
  }

  salesCardsList.push({
    date,
    amount: totalAmount,
    sales: [...salesList],
  });

  salesList.length = 0;
  items.innerHTML = "";

  localStorage.setItem("salesCards", JSON.stringify(salesCardsList));
  renderSalesCardList();
  goBack();
}

/* ===== open a saved sales card (modal) ===== */
function openSalesList(e) {
  salesModalOpen.style.display = "flex";
  salesCards.style.display = "none";
  addSalesBtn.style.display = "none";

  const clickedIndex = e.target.closest(".sales-card").dataset.index;
  const date = salesCardsList[clickedIndex].date;
  const amount = salesCardsList[clickedIndex].amount;

  const saleItems = salesCardsList[clickedIndex].sales
    .map(
      (s, index) => `
        <div class="item" key="${index}">
          <p style="display:flex; justify-content: space-between">
            ${index + 1}. ${s.description}
            <span style="font-weight:600; color:#1c5b78; margin-left:0.25rem;">
              ${s.amount.toLocaleString()}
            </span>
          </p>
        </div>
      `
    )
    .join("");

  salesItems.innerHTML = `
    <p>🗓️ ${date}</p>
    <p>${saleItems}</p>
    <p>${amount.toLocaleString()}</p>
  `;
}

/* ===== event listeners ===== */
salesCards.addEventListener("click", openSalesList);
back.addEventListener("click", goBack);
backBtn.addEventListener("click", goBack);
addSalesBtn.addEventListener("click", openSalesModal);
addBtn.addEventListener("click", addSales);
saveBtn.addEventListener("click", saveSalesList);

salesInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addSales();
  }
});

amount.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addSales();
  }
});

/* ===== init ===== */
renderSalesCardList();