app.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template:
        /*html*/
        `
        <!-- v-for LIST DIRECTIVE (standard for loop where detail below is alias for each element) -->
        <p>Product Details:</p>
        <ul>
            <li v-for='detail in details'>{{ detail }}</li>
        </ul>
        `
})