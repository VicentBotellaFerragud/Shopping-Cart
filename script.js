class ShoppingCart {

    products = [];
    prices = [];
    quantities = [];


    addToCart(product, price, quantity) {
        let index = this.products.indexOf(product);
        if (index === -1) {
            this.products.push(product);
            this.prices.push(price);
            this.quantities.push(quantity);
        } else {
            this.quantities[index]++;
        }
        console.log(this.products, this.prices, this.quantities);
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
        console.log(this.products, this.prices, this.quantities);
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
        console.log(this.products, this.prices, this.quantities);
        this.displayShoppingCart();
    }

    calculateTotal() {
        let total = 0;
        for (let i = 0; i < this.prices.length; i++) {
            let price = this.prices[i];
            let quantity = this.quantities[i];
            total +=  price * quantity;
        }
        return total;
    }

    countProducts() {
        let count = 0;
        for (let i = 0; i < this.quantities.length; i++) {
            let quantity = this.quantities[i];
            count +=  quantity;
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
                <div>
                    <span>${product}</span>
                    <span>${price}</span>
                    <span>${quantity}</span>
                </div>
            `;
        }
        let totalPurchaseSection = document.getElementById('totalPurchaseSection');
        totalPurchaseSection.innerHTML = '';
        totalPurchaseSection.innerHTML = `
                <div>
                    <span>${this.calculateTotal()}</span>
                    <span>${this.countProducts()}</span>
                </div>
            `;
    }

}

let shoppingCart = new ShoppingCart();