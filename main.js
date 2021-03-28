const app = Vue.createApp({

    //pass in 'options' object - properties

    // longhand below
    // data: function() {
    data() {
        return {
            cart: 0,
            product: 'Socks',
            description: 'Pair of socks',
            // image: './assets/images/socks_green.jpg',
            selectedVariant: 0,
            url: 'https://google.com',
            // inStock: true
            // inventory: 1,
            // onSale: false,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50, onSale: true },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0, onSale: false },
            ],
            sizes: ['small', 'medium', 'large'],
            brand: 'Vue Mastery',
        }
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        removeFromCart() {
            if (this.cart > 0) {
                this.cart -= 1;
            }
        },
        // updateImage(variantImage) {
        //     this.image = variantImage;
        // },
        updateVariant(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inventory() {
            return this.variants[this.selectedVariant].quantity
        },
        onSale() {
            return this.variants[this.selectedVariant].onSale
        }

    }
})
