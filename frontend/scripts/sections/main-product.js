document.addEventListener('alpine:init', () => {
  Alpine.data('productCard', (sectionId, product) => ({
    sectionId,
    mainProduct: product || {},
    mode: null, // one-time | subscribe
    showSubscription: false,
    discount: 0,
    regularPrice: 0,
    discountedPrice: 0,
    actualPrice: 0,
    isLoading: false,
    sellingPlanGroups: undefined,
    sellingPlanId: null,
    sellingPlansMap: [],
    selectedPlanId: null,
    selectedPlan: {},
    selectedProduct: null,
    quantity: 1,

    init() {
      if (!this.mainProduct || !this.mainProduct.price) {
        console.error('mainProduct or its price is missing');
        return;
      }

      const tabElement = this.$el.querySelector('.tabs-product-selector');
      this.sellingPlanGroups = this.mainProduct.selling_plan_groups;

      if (this.sellingPlanGroups?.length > 0) {
        const firstGroup = this.sellingPlanGroups[0];
        if (firstGroup?.selling_plans?.length > 0) {
          this.sellingPlanId = firstGroup.app_id;
          this.sellingPlansMap = firstGroup.selling_plans;
          this.selectedPlanId = this.sellingPlansMap[0].id;
          this.selectedPlan = this.sellingPlansMap.find((plan) => plan.id === this.selectedPlanId);
          this.discount = this.selectedPlan.price_adjustments[0].value;
        }
      }
      // console.log('Selling plan:', this.mainProduct);
      // console.log('Selling plan:', this.sellingPlanGroups[0]);
      // console.log('Selling plan:', this.sellingPlansMap);
      // console.log('Selling plan:', this.selectedPlan);

      if (tabElement) {
        this.tab1Selected = JSON.parse(tabElement.getAttribute('data-tab1-selected'));
        this.tab2Selected = JSON.parse(tabElement.getAttribute('data-tab2-selected'));
        this.mode = tabElement.getAttribute('data-tab-selected');
      }

      this.showSubscription = this.mode === 'subscribe';
      this.updateActualPrice();
    },

    initNewProduct(product) {
      this.mainProduct = product;
      // this.updateActualPrice();
      this.$nextTick(() => {
        console.log('Product initialized:', this.mainProduct);
        this.updateActualPrice();
      });
    },

    formatPrice(price) {
      const formattedPrice = price.toFixed(2);
      return `$${formattedPrice}`;
    },

    updateActualPrice() {
      this.regularPrice = this.mainProduct.price / 100;
      if (this.mode === 'subscribe' && this.discount > 0) {
        this.discountedPrice = this.regularPrice - (this.regularPrice * this.discount / 100);
        this.actualPrice = this.discountedPrice;
        // console.log('this.actualPrice:', this.actualPrice);
      } else {
        this.actualPrice = this.regularPrice;
      }
    },

    switchTab(tab) {
      this.mode = tab;
      this.showSubscription = (tab === 'subscribe');
      this.updateActualPrice();
    },

    addToCartPDP(quantity) {
      const variantId = this.$el.getAttribute('data-first-variant');
      const product = {
        variantId,
        quantity,
        sellingPlanId: this.selectedPlanId,
        properties: {},
      };
      Alpine.store('cart').addToCart(product);
      this.quantity = 1;
    },

    loadProduct(productHandle) {
      const url = `/products/${productHandle}?sections=${this.sectionId}`;
      const productUrl = `/products/${productHandle}.js`

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log('Product details:', response);
          return response.json();
        })
        .then((product) => {
          if (!product[this.sectionId]) {
            console.error('Product section not found');
            return;
          }
          const container = document.createElement('div');
          container.innerHTML = product[this.sectionId];
          const productDetails = container.querySelector('#MainProduct-' + this.sectionId);
          if (this.$refs.productCardRef) {
            this.$refs.productCardRef.replaceWith(productDetails);
          } else {
            console.error('Reference to productCardRef not found');
          }
          return fetch(productUrl);
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch product data');
          }
          return response.json();
        })
        .then((productData) => {
          // this.mainProduct = productData;
          // this.init();
          // this.updateActualPrice();
          this.initNewProduct(productData);
          window.history.pushState({ urlPath: productHandle }, '', productHandle);
        })
        .catch((error) => {
          console.error('Error loading product:', error);
        });
      }
  }));
});
