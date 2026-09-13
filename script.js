const salesInput = document.getElementById("sales-input");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("add-btn");
const items = document.getElementById("items");
const addSalesBtn = document.getElementById("add-sales-btn");
const salesCards = document.getElementById("sales-cards");
const inputGroups = document.querySelector(".input-groups");
const backBtn = document.querySelector(".back-btn");
const saveBtn = document.getElementById("save-btn");
const sales = document.getElementById("sales");

function openSalesModal(){
    inputGroups.style.display = "flex";
    items.style.display = "block";
    salesCards.style.display= "none"
    addSalesBtn.style.display = "none";
}

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


const salesCardsList = JSON.parse(localStorage.getItem("salesCards")) || []

function renderSalesCardList(){

   salesCards.innerHTML = salesCardsList.map((sales, index ) => 
    `
    <div class="sales-card" data-index="${index}">
    <p>${sales.date}</p>
    <p>${sales.amount}</p>
    </div>
    `
).join("")
}

function saveSalesList(){
    const date = new Date().toLocaleDateString("en-CA")
    if (salesList.length === 0) return;

    let totalAmount = 0;
    for (const sale of salesList) {
        totalAmount += Number(sale.amount);
    }
    
    const salesListInput = {
        date: date,
        amount: totalAmount,
        sales: [...salesList]
    }
    salesCardsList.push(salesListInput)
    salesList.length = 0;
    items.innerHTML = ""
    localStorage.setItem("salesCards", JSON.stringify(salesCardsList))
    renderSalesCardList()
    goBack()
}

salesCards.addEventListener('click', openSalesList)

function openSalesList(e){
const clickedIndex =  e.target.closest(".sales-card").dataset.index
console.log(clickedIndex)
}




addSalesBtn.addEventListener("click", openSalesModal)
addBtn.addEventListener("click", addSales);
backBtn.addEventListener("click", goBack)
saveBtn.addEventListener('click', saveSalesList)
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

renderSalesCardList()
