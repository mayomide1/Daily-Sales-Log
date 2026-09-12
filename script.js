const salesInput = document.getElementById("sales-input");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("add-btn");
const items = document.getElementById("items");
const addSalesBtn = document.getElementById("add-sales-btn");
const salesCards = document.getElementById("sales-cards");
const inputGroup = document.querySelector(".input-group");
const inputGroups = document.querySelector(".input-groups");
const backBtn = document.querySelector(".back-btn");

addSalesBtn.addEventListener("click", openSalesModal)
addBtn.addEventListener("click", addSales);
backBtn.addEventListener("click", goBack)

function openSalesModal(){
    inputGroups.style.display = "flex";
    items.style.display = "block";
    salesCards.style.display= "none"
    addSalesBtn.style.display = "none";
}

const salesCardsList = [
    {id: 1, date: "2026-09-01", amount: "20,000"},
    {id: 2, date: "2026-09-02", amount: "20,000"},
    {id: 3, date: "2026-09-03", amount: "20,000"},
    {id: 4, date: "2026-09-04", amount: "20,000"},
    {id: 5, date: "2026-09-05", amount: "20,000"},
    {id: 6, date: "2026-09-06", amount: "20,000"},
    {id: 7, date: "2026-09-07", amount: "20,000"},
    {id: 8, date: "2026-09-08", amount: "20,000"},
    {id: 9, date: "2026-09-09", amount: "20,000"},
    {id: 10, date: "2026-09-10", amount: "20,000"},
    {id: 11, date: "2026-09-11", amount: "20,000"},
    {id: 12, date: "2026-09-12", amount: "20,000"},
]

salesCards.innerHTML = salesCardsList.map((sales, index ) => 
    `
    <div class="sales-card" key=${index}>
    <p>${sales.date}</p>
    <p>${sales.amount}</p>
    </div>
    `
).join("")

function goBack(){
    inputGroups.style.display = "none"
    salesCards.style.display= "block"
    addSalesBtn.style.display = "block";
}

const salesList = [];

function addSales() {
  const salesValue = salesInput.value.trim();
  const amountValue = amount.value;

  if (!salesValue || !amountValue) {
    return;
  }

  const saleInput = {
    description: salesValue,
    amount: amountValue,
  };

  salesList.push(saleInput);

  salesInput.value = "";
  amount.value = "";
  salesInput.focus();

  let totalAmount = 0;
  for (const sale of salesList) {
    totalAmount += Number(sale.amount);
  }

  const salesItems = salesList
    .map(
      (item, index) =>
        `
                <div class="item" key=${index}>
                <p style="display:flex; justify-content: space-between">
                ${index + 1}. ${item.description} 
                <span style="font-weight:600; color:#1c5b78; margin-left:0.25rem;">
                ${item.amount.toLocaleString()}
                </span>
                </p>
                </div>
                `,
    )
    .join("");

  items.innerHTML = `
            <p>${salesItems}</p>
            <p>₦${totalAmount.toLocaleString()}</p>
            `;
}
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
