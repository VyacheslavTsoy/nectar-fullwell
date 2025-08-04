document.addEventListener('alpine:init', () => {
  Alpine.data('buildBox', function (maxItems = 12, minItems = 6) {
    return {
      minItems,
      maxItems,
      middleValue: Math.floor((maxItems + minItems) / 2),
      build_box_items: this.$persist([]),
      build_box_total_quantity: this.$persist(0),

      updateTotalQuantity() {
        const totalQuantity = this.build_box_items.reduce((acc, item) => acc + item.quantity, 0);
        this.build_box_total_quantity = totalQuantity;
      },
      isOutOfRange() {
        return this.build_box_total_quantity < this.minItems || this.build_box_total_quantity > this.maxItems;
      },

      addItem(productId, productName, productImage) {
        const existingItem = this.build_box_items.find((item) => item.id === productId);

        if (this.build_box_total_quantity >= this.maxItems) {
          console.warn('buildBox: You have reached the maximum number of items.');
          return;
        }

        if (existingItem) {
          this.increaseQuantity(productId);
          return;
        }

        this.build_box_items.push({ id: productId, name: productName, image: productImage, quantity: 1 });
        this.updateTotalQuantity();
      },

      removeItem(productId) {
        const existingItem = this.build_box_items.find((item) => item.id === productId);

        if (existingItem) {
          this.build_box_items = this.build_box_items.filter((item) => item.id !== productId);
          this.updateTotalQuantity();
          return;
        }

        console.error(`buildBox: Product with ID ${productId} not found.`);
      },

      decreaseQuantity(productId) {
        const existingItem = this.build_box_items.find((item) => item.id === productId);

        if (!existingItem) {
          console.error(`buildBox: Product with ID ${productId} not found.`);
          return;
        }

        if (existingItem.quantity > 0) {
          existingItem.quantity -= 1;
        }

        if (existingItem.quantity === 0) {
          this.removeItem(productId);
        }

        this.updateTotalQuantity();
      },

      increaseQuantity(productId) {
        const existingItem = this.build_box_items.find((item) => item.id === productId);

        if (!existingItem) {
          console.error(`buildBox: Product with ID ${productId} not found.`);
          return;
        }

        if (this.build_box_total_quantity >= this.maxItems) {
          console.warn('buildBox: You have reached the maximum number of items.');
          return;
        }

        existingItem.quantity += 1;
        this.updateTotalQuantity();
      },

      getQuantity(productId) {
        const existingItem = this.build_box_items.find((item) => item.id === productId);

        return existingItem ? existingItem.quantity : 0;
      },

      clearBox() {
        this.build_box_items = [];
        this.build_box_total_quantity = 0;
      },

      addBoxItemsToCart() {
        this.$store.cart.addMultiplyToCart(
          this.build_box_items.map((item) => ({ id: item.id, quantity: item.quantity })),
        );
        this.clearBox();
      },

      updateProgressBar() {
        const progressBar = this.$refs.progressBar;
        const notEnoughItems = this.build_box_total_quantity < this.minItems;
        // const progress = (this.build_box_total_quantity / this.maxItems) * 100;

        // minItems should be the minimum number of items required to build the box
        // maxItems should be the maximum number of items that can be added to the box
        // progress should be calculated based on the minItems and maxItems values and from 0 to minItems the progress should calculate from 0 to 33% and from minItems to maxItems the progress should calculate from 33% to 100%
        // const progress = (this.build_box_total_quantity / this.maxItems) * 100;
        const progress = this.calculateProgress();
        progressBar.classList.toggle('bg-[#FF1E1E]', notEnoughItems);
        progressBar.classList.toggle('bg-[#AEE1FF]', !notEnoughItems);
        progressBar.style.width = `${progress}%`;
      },

      calculateProgress() {
        const currentItems = this.build_box_total_quantity;

        if (currentItems <= this.minItems) {
          // From 0 to 33%
          return (currentItems / this.minItems) * 33;
        }

        if (currentItems <= this.middleValue) {
          // From 33% to 66%
          const range = this.middleValue - this.minItems;
          return 33 + ((currentItems - this.minItems) / range) * 33;
        }

        if (currentItems <= this.maxItems) {
          // From 66% to 100%
          const range = this.maxItems - this.middleValue;
          return 66 + ((currentItems - this.middleValue) / range) * 34; // 34 to cover 100% precisely
        }

        // If currentItems exceeds maxItems, cap at 100%
        return 100;
      },

      init() {
        this.updateProgressBar();

        this.$watch('build_box_total_quantity', () => {
          this.updateProgressBar();
        });
      },
    };
  });
});
