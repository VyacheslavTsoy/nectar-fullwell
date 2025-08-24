document.addEventListener('alpine:init', () => {

    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    Alpine.store('miniCart', {
      isOpen: false,
      cart: null,
      subscriptionItemsInCart: false,
      freeShippingCost: 4000,

      loadCart() {
        
        fetch(window.Shopify.routes.root + 'cart.js')
          .then(response => response.json())
          .then(data => {
            this.cart = data;
            this.subscriptionItemsInCart = this.cart?.items?.some(item => item.selling_plan_allocation);

            console.log(this.cart, 123123123)
          });
      },
      
     updateItem: debounce((item) => {
        console.log(item, 9999)
        let updates = {
            [item.id]: item.quantity
          };
          
          fetch(window.Shopify.routes.root + 'cart/update.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ updates })
          })
          .then(response => {
            Alpine.store('miniCart').loadCart();
            return response.json();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }, 300),

    formatMoney(price) {
        const newPrice = (price / 100).toFixed(2);
        return `$${newPrice}`;
    },

      addItem(items) {
        console.log(items, 123123123)
        let formData = {
            'items': items
           };
           
           fetch(window.Shopify.routes.root + 'cart/add.js', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(formData)
           })
           .then(response => {
             this.loadCart();
             this.isOpen = true;
             console.log(response, 22222)
             return response.json();
           })
           .catch((error) => {
             console.error('Error:', error);
           });
      },
  
      init() {
        this.loadCart();
      }
    });
  });