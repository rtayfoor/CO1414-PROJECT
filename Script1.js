// array
const tshirts = [
    ['Legacy T-Shirt', 'Red', '\u00A37.99', 'good-stock', 'tshirt1.jpg', 'Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
    ['Legacy T-Shirt', 'Green', '\u00A37.99', 'last-few', 'tshirt2.jpg', 'Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
    ['Legacy T-Shirt', 'Blue', '\u00A37.99', 'out-of-stock', 'tshirt3.jpg', 'Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
    ['Legacy T-Shirt', 'Cyan', '\u00A37.99', 'good-stock', 'tshirt4.jpg', 'Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
    ['Legacy T-Shirt', 'Magenta', '\u00A37.99', 'out-of-stock', 'tshirt5.jpg', 'Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
    ['Legacy T-Shirt', 'Yellow', '\u00A37.99', 'last-few', 'tshirt6.jpg', 'Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
    ['Legacy T-Shirt', 'Black', '\u00A37.99', 'out-of-stock', 'tshirt7.jpg', 'Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
    ['Legacy T-Shirt', 'Grey', '\u00A37.99', 'good-stock', 'tshirt8.jpg', 'Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
    ['Legacy T-Shirt', 'Burgundy', '\u00A37.99', 'last-few', 'tshirt9.jpg', 'Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
];
// product display in products.html
if (document.getElementById('listshirts')) {
    document.getElementById('listshirts').classList.add("tshirtgrid");
    tshirts.forEach((product, index) => {
        const stockstatus = product[3];
        let stocktext = '';
        let stockcolor = '';
        let stockdisplayed = '';
        if (stockstatus === 'good-stock') {
            stocktext = 'In Stock';
            stockcolor = '#339933';
        } else if (stockstatus === 'last-few') {
            stocktext = 'Last Few Left';
            stockcolor = '#F2BE1A';
        } else { // when out of stock, the customer should not be able to add the product in cart
            stocktext = 'Out of Stock';
            stockcolor = '#BE1622';
            stockdisplayed = 'disabled';
        }
        const productdiv = document.createElement('div');
        productdiv.classList.add('tshirtdisplay');
        const productcont = `
            <div style="padding:10px; margin:20px;">
                <a href="item.html?id=${index}">
                    <img src="${product[4]}" alt="${product[0]} - ${product[1]}" class="tshirtimg">
                    <h3>${product[0]} - ${product[1]}</h3>
                </a>
                <p style="color:${stockcolor}; font-weight:bold;">${stocktext}</p>
                <p>${product[5]}</p>
                <p>Price: ${product[2]}</p>
                <button id="addtocart-btn-${index}" ${stockdisplayed}>
                    Add to Cart
                </button>
            </div>
        `;
        productdiv.innerHTML = productcont;
        document.getElementById('listshirts').appendChild(productdiv);
        if (!stockdisplayed) {
            document.getElementById(`addtocart-btn-${index}`).addEventListener('click', function () {
                addtocart(index);
            });
        }
    });
}
// here is where items are added to cart
function addtocart(productIndex) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [] ;

    if (!cart) {
        cart =[];
    }
    cart.push({
        name: tshirts[productIndex][0],
        color: tshirts[productIndex][1],
        price: tshirts[productIndex][2],
        image: tshirts[productIndex][4],
        description: tshirts[productIndex][5]
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${tshirts[productIndex][0]} - ${tshirts[productIndex][1]} has been added to your cart!`);
}
// this is used for removing items from cart
function removefromcart(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();
}
// this is to empty all products in cart
function emptycart() {
    localStorage.removeItem('cart');
    displaycart();
}
// this is for cart.html
function displaycart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!document.getElementById('cartitems')) return;
    if (cart.length > 0) {
        let total = 0;

        document.getElementById('cartitems').innerHTML = '';
        cart.forEach((item, index) => {
            document.getElementById('cartitems').innerHTML += `
        <div class="cartitem">
            <img src="${item.image}" width="90">
            <p>${item.name} (${item.color}) - ${item.price}</p>

            <button 
                onclick="removefromcart(${index})"
                style="padding:8px 1px;">
                Remove
            </button>
        </div>
    `;
            total += parseFloat(item.price.replace('\u00A3', '')); // using parseFloat which converts the string into doule to calculate total 
        });
        document.getElementById('cartitems').innerHTML += `<h3>Total: \u00A3${total.toFixed(2)}</h3>`;
        document.getElementById('cartitems').innerHTML += `<button onclick="emptycart()" style="margin-top:10px; padding:10px 15px;">Empty Cart</button>`;
    } else {
        document.getElementById('cartitems').innerHTML = '<p>Your cart is empty.</p>';
    }
}

if (document.getElementById('cartitems')) {
    displaycart();
}
// this is for the item.html 
if (window.location.pathname.includes('item.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const productIndex = urlParams.get('id');
    if (productIndex !== null && tshirts[productIndex]) {
        const product = tshirts[productIndex];
        const productDetailDiv = document.getElementById('productDetail');
        productDetailDiv.innerHTML = `
            <div style="border:1px solid #ccc; padding:10px; margin:10px; text-align:center;">
                <img src="${product[4]}" alt="${product[0]} - ${product[1]}" class="tshirtimg" style="max-width: 300px;">
                <h3>${product[0]} - ${product[1]}</h3>
                <p>${product[5]}</p>
                <p>Price: ${product[2]}</p>
                <button onclick="addtocart(${productIndex})">Add to Cart</button>
            </div>
        `;
    } 
}




