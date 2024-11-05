const productCart = [];
let cartQuantity = 0; // Số lượng sản phẩm trong giỏ hàng

// Lắng nghe sự kiện click cho tất cả nút thêm vào giỏ hàng
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cart-btn').forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(e.target.closest('.product-card'));
        });
    });
});


// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productCard) {
    const title = productCard.querySelector('.title-div').innerText;
    const price = productCard.querySelector('.gia').innerText;

    // Thêm sản phẩm vào mảng productCart
    productCart.push({
        title,
        price
    });

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    cartQuantity = productCart.length;
    document.querySelector('.cart-quantity').innerText = cartQuantity;

    // Lưu dữ liệu vào localStorage
    localStorage.setItem('cart', JSON.stringify(productCart));

    console.log("Sản phẩm đã được thêm vào giỏ hàng:", productCart);
    updateCartUI();
}


function updateCartUI() {
    const cartPopup = document.querySelector('.cart-popup .cart-items');
    cartPopup.innerHTML = '';  // Clear previous items

    productCart.forEach(product => {
        const itemHTML = `
            <div class="cart-item">
                <img src="${product.productImage}" alt="${product.title}">
                <div class="cart-item-title">${product.title}</div>
                <div class="cart-item-price">${product.gia}</div>
            </div>
        `;
        cartPopup.innerHTML += itemHTML;
    });
    
    // Cập nhật sự kiện cho nút "Đến giỏ hàng"
    document.querySelector('.cart-link').addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
}
