class ShoppingCart {

    products = [];
    prices = [];
    quantities = [];

    /**
     * If the cart does not contain the passed-in product yet, this function adds it. If, on the other hand, the product is already in the 
     * cart, the function increases its quantity by one.
     * @param {string} product - This is the passed-in product.
     * @param {number} price - This is the passed-in price.
     * @param {number} quantity - This is the passed-in quantity.
     */
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
        
        this.displayShoppingCart(); //Updates the shopping cart.

    }

    /**
     * Removes the passed-in product from the cart if it's in the cart.
     * @param {string} product - This is the passed-in product.
     * @returns - nothing. The function just breaks if the passed-in product is no longer in the cart (in the products array).
     */
    removeFromCart(product) {

        let index = this.products.indexOf(product);

        if (index !== -1) {

            this.products.splice(index, 1);
            this.prices.splice(index, 1);
            this.quantities.splice(index, 1);

        } else {

            return;

        }
        
        this.displayShoppingCart(); //Updates the shopping cart.

    }

    /**
     * Decreases by one the quantity of the passed-in product in the cart.
     * @param {string} product - This is the passed-in product.
     * @returns - nothing. The function just breaks if the passed-in product is no longer in the cart (in the products array).
     */
    decreaseQuantityByOne(product) {

        let index = this.products.indexOf(product);

        if (index !== -1) {

            this.quantities[index]--;

            //If the quantity of the passed-in product becomes 0...
            if (this.quantities[index] === 0) {

                //The removeFromCart function is called so that the product is removed from the cart.
                this.removeFromCart(product);

            }

        } else {

            return;

        }
        
        this.displayShoppingCart(); //Updates the shopping cart.

    }

    /**
     * Calculates the total price of the order.
     * @returns - the total price of the order.
     */
    calculateTotal() {

        let total = 0;

        for (let i = 0; i < this.prices.length; i++) {

            let price = this.prices[i];
            let quantity = this.quantities[i];
            total += price * quantity; //It's very important not to forget to multiply each price by its corresponding quantity.

        }

        return total.toFixed(2);

    }

    /**
     * Counts the total amount of products in the cart.
     * @returns - the total amount of products in the cart.
     */
    countProducts() {

        let count = 0;

        for (let i = 0; i < this.quantities.length; i++) {

            let quantity = this.quantities[i];
            count += quantity;

        }

        return count;

    }

    /**
     * Displays, updates and hides the cart (its content) depending on the user's actions.
     */
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