const remfecart=(x,z)=>{
    console.log(x)
    x.classList.add("hidden")
    console.log(z)
    let total=parseInt(document.getElementById("total").innerText)
    console.log(total)
    const afttot=total-z
    console.log(afttot)
    // let a=k-z
  document.getElementById("total").innerText=afttot;
}
let price = 0
const disableactive=()=>{
    const btns=document.querySelectorAll(".btns")
    btns.forEach(x=>x.classList.remove("active"))
    
}
const addtocart=(x,y,z)=>{
    price+=y
    document.getElementById("cartinfo").innerHTML+=`<div id="p_${z}" class="bg-[#b3f3cc60] py-3 px-5 flex justify-between my-2">
    <div>
        <h1>${x}</h1>
        <h2>৳${y} <i class="fa-solid fa-pen"></i>x <span>1</span></h2>
   </div>
    <div><h1 onclick="remfecart(p_${z},${y})" class="text-2xl ">x</h1></div>
   </div>`
   document.getElementById("total").innerText=price;
}
const displayplantinfo=(y)=>{
    document.getElementById("trees").innerHTML=``
//    console.log(y)
   let treeinfo=``
   y.forEach(z=>{
    treeinfo+=`<div class="my-3 p-3 bg-white rounded-sm sm:my-0">
            <div>
                <img class="h-30 w-full" src=${z.image} alt="">
            </div>
            <div class="h-30">
            <h6 class="font-semibold text-[14px] py-1">${z.name}</h6>
            <h5 class="font-normal text-[12px] text-justify">${z.description}</h5>
            </div>
            <div class="flex justify-between py-2">
                <div class="text-center bg-[#DCFCE7] rounded-2xl">
                <h1 class="font-medium text-[#15803D] text-sm px-1 ">${z.category}</h1>
        </div>
            <h1>৳${z.price}</h1></div>
            <div class="text-center bg-[#15803D] rounded-2xl">
                <h1 onclick="addtocart('${z.name}',${z.price},${z.id})" class="font-medium text-white text-[16px] py-1">Add to Cart</h1>
        </div>
    </div>`
    // console.log(treeinfo)
})
document.getElementById("trees").innerHTML+=treeinfo
}
function displaytree(z)
{
console.log(z)
let url=`https://openapi.programming-hero.com/api/category/${z}`
console.log(url)
fetch(url)
.then(x=>x.json())
.then(y=>{
    disableactive()
    document.getElementById(`cat_${z}`).classList.add("active")
    displayplantinfo(y.plants)})
}
const displaycat=(x)=>
{
    let category=``;
    x.forEach(element => {
        category+=`<div onclick="displaytree(${element.id})">
            <h1 id="cat_${element.id}" class="btns p-2 text-base text-center sm:text-left hover:bg-slate-300 rounded">${element.category_name}</h1>
        </div>`
    });
    document.getElementById("Categories").innerHTML+=category
}
function categories(){
fetch("https://openapi.programming-hero.com/api/categories")
.then(x=>x.json())
.then(y=>displaycat(y.categories))
}
categories()