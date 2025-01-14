console.clear();

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}

let cartContainer = document.getElementById('cartContainer')

let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob,itemCounter)
{
    let boxDiv = document.createElement('div')
    boxDiv.id = 'box'
    boxContainerDiv.appendChild(boxDiv)

    let boxImg = document.createElement('img')
    boxImg.src = ob.preview
    boxDiv.appendChild(boxImg)

    let boxh3 = document.createElement('h3')
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter)
    boxh3.appendChild(h3Text)
    boxDiv.appendChild(boxh3)

    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode('Amount: ' + (ob.price / 90).toFixed(2) + " €")
    boxh4.appendChild(h4Text)
    boxDiv.appendChild(boxh4)

    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)

    return cartContainer
}

let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Total Amount')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount)
{
    let totalh4 = document.createElement('h4')
    let totalh4Text = document.createTextNode('Amount: ' + (amount / 90).toFixed(2) + " €")
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalDiv.appendChild(totalh4)
    totalDiv.appendChild(buttonDiv)
}

let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')
buttonDiv.appendChild(buttonTag)

let buttonText = document.createTextNode('Place Order')
buttonTag.appendChild(buttonText)

buttonTag.onclick = function() {
    createStripeCheckoutSession(items);
};

function createStripeCheckoutSession(items) {
    let lineItems = items.map((item, index) => ({
        'price_data[currency]': 'eur',
        'price_data[product_data][name]': item.name,
        'price_data[unit_amount]': (item.price / 90).toFixed(2) * 100, // Stripe expects the amount in cents
        'quantity': item.quantity,
    }));

    let formBody = lineItems.reduce((acc, item, index) => {
        acc.append(`line_items[${index}][price_data][currency]`, item['price_data[currency]']);
        acc.append(`line_items[${index}][price_data][product_data][name]`, item['price_data[product_data][name]']);
        acc.append(`line_items[${index}][price_data][unit_amount]`, item['price_data[unit_amount]']);
        acc.append(`line_items[${index}][quantity]`, item['quantity']);
        return acc;
    }, new URLSearchParams());

    formBody.append('payment_method_types[]', 'card');
    formBody.append('mode', 'payment');
    formBody.append('success_url', 'https://junecare-assurance.github.io/orderPlaced.html');
    formBody.append('cancel_url', 'https://junecare-assurance.github.io/cart.html');

    fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    })
    .then(response => response.json())
    .then(session => {
        window.location.href = session.url;
    })
    .catch(function(error) {
        console.error("Error:", error);
    });
}

// BACKEND CALL
let httpRequest = new XMLHttpRequest()
let totalAmount = 0
httpRequest.onreadystatechange = function()
{
    if(this.readyState === 4)
    {
        if(this.status == 200)
        {
            contentTitle = JSON.parse(this.responseText)

            let counter = Number(document.cookie.split(',')[1].split('=')[1])
            document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter)

            let item = document.cookie.split(',')[0].split('=')[1].split(" ")
            console.log(counter)
            console.log(item)

            let i;
            let totalAmount = 0
            let items = [];
            for(i=0; i<counter; i++)
            {
                let itemCounter = 1
                for(let j = i+1; j<counter; j++)
                {
                    if(Number(item[j]) == Number(item[i]))
                    {
                        itemCounter +=1;
                    }
                }
                let itemData = contentTitle[item[i]-1];
                totalAmount += Number(itemData.price) * itemCounter
                items.push({
                    name: itemData.name,
                    price: itemData.price,
                    quantity: itemCounter
                });
                dynamicCartSection(itemData, itemCounter)
                i += (itemCounter-1)
            }
            amountUpdate(totalAmount)

            // Store items globally for Stripe checkout
            window.items = items;
        }
    }
        else
        {
            console.log('call failed!');
        }
}

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true)
httpRequest.send()
