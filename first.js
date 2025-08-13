const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"; 


const drop=document.querySelectorAll(".drop select");
 const btn =document.querySelector("form button");
 const fromCurr =document.querySelector(".from select");
  const toCurr =document.querySelector(".to select");
  const msg=document.querySelector(".msg");
 
for(let select of drop){
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText =currCode;
    newOption.value=currCode;
    if(select.name==="from" && currCode ==="INR") {
        newOption.selected ="selected";
    } else if(select.name==="to" && currCode ==="USD") {
     newOption.selected ="selected";
    } 
    select.append(newOption);
  }

select.addEventListener("change",(evt) => {
    updateFlag(evt.target) ;
});}

 const updateExchangeRate = async() => {
let amount=document.querySelector(".amount input");
let amtVal=amount.value;
if( amtVal === "" || amtVal < 1) {
    amtVal=1;
    amount.value="1";
}
//console.log(fromCurr,toCurr)

const URL =`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
try {
let response = await fetch(URL);
let data =await response.json();
let rate=data[fromCurr.value.toLowerCase()];
 rate=rate[toCurr.value.toLowerCase()];

//console.log(rate);
let finalAmount = amtVal * rate;
msg.innerText =`${amtVal} ${fromCurr.value}= ${finalAmount.toFixed(2)} ${toCurr.value}`;
} catch (error) {
  msg.innerText="something went wrong!";
  console.error ("ERROR",error)
}
};
const updateFlag =(element) => {
    let currCode = element.value;
    let countryCode =countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
let img =element.parentElement.querySelector("img");
    img.src=newSrc;
};
btn.addEventListener("click",  (evt) => {
evt.preventDefault();
updateExchangeRate();
});
window.addEventListener("load",() => {
 updateExchangeRate();
 });
 