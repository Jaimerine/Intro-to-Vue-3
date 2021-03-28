app.component('product-display', {
    //specify props passed
    props: {
        //prop called "premium" -> can add validation below, note type is capitalized
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: 
    //html below is needed to activate syntax highlighting
    /*html*/
    `<div class="product-display">
        <div class="product-container">
            <div class="product-image">
    
<!-- v-bind is a BINDING DIRECTIVE that will reactively update when source changes, add the name (similar to product as the source) -->
                <!-- <img v-bind:src="image" alt=""> -->
<!-- shorthand is to remove v-bind and just add colon: -->
                <img :src="image" :alt="description" :class="[inventory == 0 ? 'out-of-stock-img' : '']">
            </div>
            
            <div class="product-info">
<!-- expression to REFERENCE DATA OBJECT -->
                <!-- <h1>{{ product }}</h1> -->

<!-- COMPUTED PROPERTIES (i.e. title below) are cached leading to performance benefits as only re-calculate if dependencies in calc change -->
                <h1>{{ title }}</h1>

                <a :href="url">Click here for more info.</a>

<!-- v-show CONDITIONAL DIRECTIVE, toggles visibility (display: none) given boolean value -->
                <p v-show="onSale">{{ title }} are on sale</p>

<!-- v-if CONDITIONAL DIRECTIVE, add v-else-if and/or v-else only if applicable -->
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>

<!-- adding COMPONENT binding details -->
                <product-details :details="details"></product-details>
                
<!-- v-for LIST DIRECTIVE -->
                <!-- give each DOM element a unique key with :key (v-bind:key) - tells Vue how the html elements relate to the data -->
                <div
                    v-for='(variant, index) in variants'
                    :key='variant.id'
                    @mouseover="updateVariant(index)"
                    class=color-circle
                    :style="{ 'background-color': variant.color }">
                </div>
<!-- above, add STYLE BINDING setting the CSS background color property (JS casing: backgroundColor or CSS casing 'background-color' with quotes) -->

                <!--<ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul> -->

<!-- EVENT LISTENER with v-on directive (or @)-->
                <!-- <button class="button" v-on:click="cart += 1">Add to Cart</button> -->

<!-- above with instruction or below using a method... -->
<!-- :class CLASS BINDING applies class if subsequent condition is true as below:
    :class="{ disabledButton: !inStock }"
or using tiernary operator like below
-->
                <button
                    class="button"
                    v-on:click="addToCart">
                    <!--:class="[inventory > 0 ? disabledButton : '']"
                    :disabled="!inStock" -->
                    Add to Cart
                </button>

                <!-- note @click used below as shorthand for v-on:
                v-if="cart > 0"-->
                <button
                    class="button"
                    @click="removeFromCart"
                    >
                    Remove Item
                </button>
                
            </div>
        </div>
        <!-- add reviews + review form component -->
        <review-list v-if="reviews.length":reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>`,
    // longhand below
    // data: function() {
    data() {
        return {
            product: 'Socks',
            description: 'Pair of socks',
            selectedVariant: 0,
            url: 'https://google.com',
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50, onSale: true },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0, onSale: false },
            ],
            sizes: ['small', 'medium', 'large'],
            brand: 'Vue Mastery',
            reviews: []
        }
    },
    methods: {
        addToCart() {
            //method called via event listener on add to cart button above
            //EMIT EVENT via $emit will bubble this event 'add-to-cart' to parent, parent (index.html) will listen to event and call function in main.js (the variants id is the payload transmitted)
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        // updateImage(variantImage) {
        //     this.image = variantImage;
        // },
        updateVariant(index) {
            this.selectedVariant = index;
        },
        addReview(review) {
            this.reviews.push(review);
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
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }

    }
})