
const cafe = [
    {
        id: 0,
        image: './img/caphe/capheculi.png',
        title: 'Cà phê Culi',
        price: 55,
        stock: "0"
    },
    {
        id: 1,
        image: './img/caphe/caphemoka.png',
        title: 'Cà phê Moka',
        price: 120,
        stock: "0"
    },
    {
        id: 2,
        image: './img/caphe/caphelatte.png',
        title: 'Cà phê Latte',
        price: 65,
        stock: "0"
    },
    {
        id: 3,
        image: './img/caphe/caphearabica.png',
        title: 'Cà phê Arabica',
        price: 150,
        stock: "0"
    },
    {
        id: 4,
        image: './img/caphe/caphearden.png',
        title: 'Cà phê đen',
        price: 15,
    },
    {
        id: 5,
        image: './img/caphe/caphesua.png',
        title: 'Cà phê sữa',
        price: 20,
        stock: "0"
    },
    {
        id: 6,
        image: './img/caphe/cappuchino.png',
        title: 'Cappuchino',
        price: 30,
        stock: "0"
    },
    {
        id :7,
        image: './img/caphe/americano.png',
        title: 'Americano',
        price: 44,
        stock: "0"
    },
    {
        id: 8,
        image: './img/caphe/espresso.png',
        title: 'Espresso',
        price: 50,
        stock: "0"
    },
];

const sinhto=[
    {
        id:9,
        image: './img/sinhto/sinhtobo.png',
        title: 'Sinh tố bơ',
        price: 45,
    },
    {
        id:10,
        image:'./img/sinhto/sinhtoxoai.jpg',
        title:'Sinh tố xoài',
        price:30,
    },
    {
        id:11,
        image:'./img/sinhto/sinhtomangcau.jpg',
        title:'Sinh tố mãng cầu',
        price:30,
    }
];



const bcafe = [...new Set(cafe.map((item) => item))];
let i = 0; // Chỉ số cho cà phê
document.getElementById('cafe').innerHTML = bcafe.map((item) => {
    const { image, title, price } = item;
    const html = `
        <div class='col-lg-4'>
            <div class='single-menu'>
                <div class='img-box'>
                    <img class='images' src=${image} alt="${title} image"></img>
                </div>
                <div class="title-div justify-content-between d-flex">  
                    <h4>${title}</h4>
                    <p class="price float-right">${formatPrice(price)}.000đ</p>
                </div>
                <button onclick='addtocart(${i}, "cafe")'>Mua</button>
            </div>
        </div>
    `;
    i++; // Tăng chỉ số sau mỗi sản phẩm
    return html; // Trả về HTML của sản phẩm
}).join('');


const bsinhto = [...new Set(sinhto.map((item) => item))];
let m = 0; // Chỉ số cho sinh tố
document.getElementById('sinhto').innerHTML = bsinhto.map((item) => {
    const { image, title, price } = item;
    const html = `
        <div class='col-lg-4'>
            <div class='single-menu'>
                <div class='img-box'>
                    <img class='images' src=${image} alt="${title} image"></img>
                </div>
                <div class="title-div justify-content-between d-flex"> 
                    <h4>${title}</h4>
                    <p class="price float-right">${formatPrice(price)}.000đ</p>
                </div>
                <button onclick='addtocart(${m}, "sinhto")'>Mua</button>
            </div>
        </div>
    `;
    m++; // Tăng chỉ số sau mỗi sản phẩm
    return html; // Trả về HTML của sản phẩm
}).join('');

let cart =[];

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function addtocart(a, type) {
    let product;
    if(type === 'cafe'){
        product = {...bcafe[a]};
    } else if (type === 'sinhto') {
        product = { ...bsinhto[a] };
    }
    

    console.log(product);

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1; // Tăng số lượng
    } else {
        product.quantity = 1; // Khởi tạo số lượng
        cart.push(product); // Thêm sản phẩm mới vào giỏ hàng
    }
    console.log(cart)
    displaycart();
}
function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

function increaseQuantity(index) {
    cart[index].quantity += 1;
    displaycart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        delElement(index); // Remove item if quantity is 1
    }
    displaycart();
}


function displaycart() {
    let total = 0;
    const totalQuantityElement = document.getElementById("totalQuantity");
    totalQuantityElement.innerHTML = cart.length;

    if (cart.length === 0) {
        document.getElementById('cartItem').innerText = "Bạn chưa mua sinh tố";
        document.getElementById("total").innerHTML = "0.000đ";
        totalQuantityElement.innerHTML = "0";
    } else {
        const cartItemsHTML = cart.map((items, index) => {
            const { image ,title, price, quantity } = items;
            total += price * quantity; // Accumulate total here
            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${image}>
                    </div>
                    <h3 style='font-size:12px;'>${title}</h3>
                    <h2 style='font-size: 15px;'>${formatPrice(price * quantity)}.000đ</h2>
                    <button onclick='increaseQuantity(${index})'>+</button>
                    <span>${quantity}</span>
                    <button onclick='decreaseQuantity(${index})'>-</button>
                    <i class='fa fa-trash' onclick='delElement(${index})'></i>
                </div>`
            );
        }).join('');
        document.getElementById("cartItem").innerHTML = cartItemsHTML;
        document.getElementById("total").innerHTML = `${formatPrice(total)}.000đ`;

        let totalQuantity = 0; // Khởi tạo lại
        cart.forEach(item => {
            totalQuantity += item.quantity; // Tính tổng
        });
        totalQuantityElement.innerHTML = totalQuantity;
    }
    document.querySelector('.mua').addEventListener('click', () => {
        window.location.href = 'hoadon.html';
    });
}

displaycart();

