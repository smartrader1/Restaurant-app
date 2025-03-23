import { menuArray } from '/data.js'
const addedFoodsArr = []
const modal = document.getElementById('modal')
const order = document.getElementById('order-body')
const paymentForm = document.getElementById('payment-form')
const paymentProtal = document.getElementById('payment-portal')

document.addEventListener('click', (e) => {
    if(e.target.dataset.add){
        getFoodItem(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        removeFoodItem(e.target.dataset.remove)
    }
    else if(e.target.id === 'orderBtn'){
        summonPaymentModel()
    }
})
 

function findFoodById(foodId) {
    return menuArray.filter(food => food.id === Number(foodId))[0]
}

function showOrderSection() {
    const order = document.getElementById('order-body')
    order.style.display = 'flex'
}

function addFoodToOrder(food) {
    addedFoodsArr.push(food)
}

function getFoodItem(foodId) {
    const targetFoodObj = findFoodById(foodId)
    addFoodToOrder(targetFoodObj)
    showOrderSection()
    render()
}

function removeFoodItem(foodId) {
    const index = addedFoodsArr.findIndex(food => food.id === Number(foodId))
    if (index !== -1) {
        addedFoodsArr.splice(index, 1)
        render()
    }
}

function getTotalPrice(){
    return addedFoodsArr.length > 0
        ? '$' + addedFoodsArr.reduce((total, currentItem)=> total + currentItem.price, 0) : '$0'
}

function foodSelection(name, price, ingredients, id, emoji){
    return  `<div class='food-body'>
    <div class='food-inner'>
        <div class='food-descriptions'>
        <p class='food-item' >${emoji}</p>
            <div class='food-description-txt'>
                <p class='food-name'>${name}</p>
                <p class='ingredients'>${ingredients.join(', ')}</p>
                <p class='price'>$${price}</p>
            </div>
        </div>
            <div>
            <i class="fa-solid fa-plus add-food" data-add="${id}"></i>
            </div>
    </div>
</div> `
}

function createOrderItemHTML(name, price, id) {
    return `<div class='order-inner' id='order-inner'>
        <div class='foodremove'>
            <p class='order-big-txt'>${name}</p>
            <p class='order-small-txt' data-remove="${id}">remove</p>
        </div>
        <p>$${price}</p>
    </div>`
}

function renderFoods(){
    const eachFood = menuArray
        .map(food => foodSelection(
            food.name, 
            food.price, 
            food.ingredients, 
            food.id, 
            food.emoji))
        .join('')
    return eachFood
}

function renderEachOrder() {
    const orderItems = addedFoodsArr
        .map(food => createOrderItemHTML(
            food.name,
            food.price,
            food.id))
        .join('')
    return orderItems
}

function summonPaymentModel(){
    modal.style.display = ('flex');
}
 
function hideOrderElements(){
    order.style.display = ('none');
    modal.style.display = ('none');
}

function createConffirmationMessage(coustomerName){
   return `<div class="orderConfirmation" id="orderConfirmation">
        <h4>Thanks, ${coustomerName}! Your order is on its way!</h4>
    </div>`
}

function handlePaymentFormSumission(e){
    e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get('fullName')

    hideOrderElements()
    paymentProtal.innerHTML = createConffirmationMessage(fullName)
}

paymentForm.addEventListener('submit', handlePaymentFormSumission)
   

function render(){
    document.getElementById('app').innerHTML = renderFoods()
    document.getElementById('order-render').innerHTML = renderEachOrder()
    document.getElementById('total-price').innerHTML = getTotalPrice()
}

render() 