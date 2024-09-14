document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsInput = document.getElementById('cartItems'); 
    const totalCostElement = document.getElementById('totalCost'); 
    const cartItemsList = document.getElementById('cartItemsList');


    function updateCart() {
        cartItemsList.innerHTML = ''; 
        let totalCost = 0; 

    
        cart.forEach((item, index) => {
            const itemCost = item.price * item.quantity; 
            cartItemsList.innerHTML += `
                <div id="cart-item-${index}" class="cart-item">
                    <p>${item.name} x ${item.quantity} - ₹${itemCost.toFixed(2)}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            totalCost += itemCost; 
        });


        totalCostElement.textContent = totalCost.toFixed(2);
    }

    
    document.querySelectorAll('.add-to-items').forEach(button => {
        button.addEventListener('click', (event) => {
            const menuItem = event.target.closest('.menu-item'); 
            if (menuItem) {
                const itemId = menuItem.getAttribute('data-item-id'); 
                const itemName = menuItem.getAttribute('data-item-name'); 
                const itemPrice = parseFloat(menuItem.getAttribute('data-item-price')); 
                const quantityInput = menuItem.querySelector('.quantity-input'); 
                const quantity = parseInt(quantityInput.value, 10); 

                if (quantity <= 0 || isNaN(quantity)) {
                    alert('Please enter a valid quantity.'); 
                    return;
                }

                const existingItemIndex = cart.findIndex(item => item.id === itemId); 

                if (existingItemIndex > -1) {
                    cart[existingItemIndex].quantity += quantity; 
                } else {
                    cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: quantity }); 
                }

                updateCart(); 
            }
        });
    });

    
    cartItemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart(); 
        }
    });


    document.getElementById('orderForm').addEventListener('submit', (event) => {
        event.preventDefault(); 

        if (cart.length === 0) {
            alert('Please add items to your cart before placing an order.'); 
            return;
        }

        cartItemsInput.value = JSON.stringify(cart);
        event.target.submit();
    });
});
