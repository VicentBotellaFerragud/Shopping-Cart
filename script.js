class ShoppingCart {

    products = [];
    prices = [];
    quantities = [];


    addToCart(product, price, quantity) {

        let emptyCart = document.getElementById('emptyCart');
        emptyCart.classList.add('d-none');

        let index = this.products.indexOf(product);

        if (index === -1) {

            this.products.push(product);
            this.prices.push(price);
            this.quantities.push(quantity);

        } else {

            this.quantities[index]++;

        }
        
        this.displayShoppingCart();

    }

    removeFromCart(product) {

        let index = this.products.indexOf(product);

        if (index !== -1) {

            this.products.splice(index, 1);
            this.prices.splice(index, 1);
            this.quantities.splice(index, 1);

        } else {

            return;

        }
        
        this.displayShoppingCart();

    }

    decreaseQuantityByOne(product) {

        let index = this.products.indexOf(product);

        if (index !== -1) {

            this.quantities[index]--;

            if (this.quantities[index] === 0) {

                this.removeFromCart(product);

            }

        } else {

            return;

        }
        
        this.displayShoppingCart();

    }

    calculateTotal() {

        let total = 0;

        for (let i = 0; i < this.prices.length; i++) {

            let price = this.prices[i];
            let quantity = this.quantities[i];
            total += price * quantity;

        }

        return total.toFixed(2);

    }

    countProducts() {

        let count = 0;

        for (let i = 0; i < this.quantities.length; i++) {

            let quantity = this.quantities[i];
            count += quantity;

        }

        return count;

    }

    displayShoppingCart() {

        let addedProductsSection = document.getElementById('addedProductsSection');
        addedProductsSection.innerHTML = '';

        for (let i = 0; i < this.products.length; i++) {

            let product = this.products[i];
            let price = this.prices[i];
            let quantity = this.quantities[i];

            addedProductsSection.innerHTML += `

                <div class="my-4 font-reduced-mobile">

                    <span>${product} - </span>
                    <span>${(price * quantity).toFixed(2)}€ x </span>
                    <span>${quantity}</span>
                    <button class="plus-btn" onclick="shoppingCart.addToCart('${product}', ${price}, 1);">+</button>
                    <button class="minus-btn" onclick="shoppingCart.decreaseQuantityByOne('${product}');">-</button>
                    <button class="remove-btn" onclick="shoppingCart.removeFromCart('${product}');">Remove</button>

                </div>

            `;

        }

        let totalPurchaseSection = document.getElementById('totalPurchaseSection');
        totalPurchaseSection.innerHTML = '';

        if (this.countProducts() === 0) {

            let emptyCart = document.getElementById('emptyCart');
            emptyCart.classList.remove('d-none');

            totalPurchaseSection.innerHTML = '';

        } else {

            totalPurchaseSection.innerHTML = `
                
                <span>Total amount of items: <b>${this.countProducts()}</b></span>
                <span>Total price: <b>${this.calculateTotal()}€</b></span>
                
            `;

        }
        
    }

}

let shoppingCart = new ShoppingCart();