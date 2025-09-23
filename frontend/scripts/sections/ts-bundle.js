class TSBundle extends HTMLElement {
  constructor() {
    super();
    this.quantityOptions = this.querySelector("#TSBundleQuantityOptions");
    this.footer = this.querySelector("[data-footer]");
    this.currentQuantity = 0;
    this.requiredQuantity = 0;
    this.proceedButtonTemplate = "Select {quantity} More Pouches";
    this.proceedButtonTemplateSingle = "Select 1 More Pouch";
    this.proceedButton = this.footer.querySelector("button");
    this.sellingPlanTitle = "";
    this.pricePerItem = 0;
    this.comparePricePerItem = 0;

    this.onQuantityOptionChange();
    this.quantityOptions?.addEventListener("change", this.onQuantityOptionChange.bind(this));

    this.setOnClick();
  }

  onQuantityOptionChange() {
    const currentQuantityOption = this.quantityOptions.querySelector("input:checked");

    this.requiredQuantity = parseInt(currentQuantityOption.value);

    this.querySelectorAll("[data-gift-option]").forEach(giftOption => {
      const giftOptionRequirements = parseInt(giftOption.getAttribute("data-gift-requirements"));

      giftOption.toggleAttribute("disabled", giftOptionRequirements > this.requiredQuantity);
    });

    this.sellingPlanTitle = currentQuantityOption.getAttribute("data-selling-title");
    this.pricePerItem = parseInt(currentQuantityOption.getAttribute("data-price"));
    this.comparePricePerItem = parseInt(currentQuantityOption.getAttribute("data-compare"));
    
    this.footer.querySelector("[data-savings]").innerText = currentQuantityOption.dataset.savings;
    if (this.querySelector("[data-shipping]")) {
      this.querySelector("[data-shipping]").innerText = currentQuantityOption.dataset.shippingTitle;
    }

    this.updateProceedButton();
  }

  updateProceedButton() {
    const quantityDiff = this.requiredQuantity - this.currentQuantity;

    if (quantityDiff > 0) {
      if (quantityDiff == 1) {
        this.proceedButton.querySelector("[data-label]").innerText = this.proceedButtonTemplateSingle;
      } else {
        this.proceedButton.querySelector("[data-label]").innerText = this.proceedButtonTemplate.replace("{quantity}", quantityDiff);
      }
      this.proceedButton.setAttribute("disabled", true);
    } else {
      this.proceedButton.removeAttribute("disabled");
    }

    const currentQuantityOption = this.quantityOptions.querySelector("input:checked");
    const quantity = Math.max(this.currentQuantity, this.requiredQuantity);
    const discount = parseInt(currentQuantityOption.dataset.discount);
    
    let price = this.pricePerItem * quantity / 100;
    let compare = this.comparePricePerItem * quantity / 100;

    if (discount > 0) {
      price = ((this.comparePricePerItem * quantity) - discount) / 100;
    }

    this.footer.querySelector("[data-compare]").innerText = `$${compare.toFixed(2)}`;
    this.footer.querySelector("[data-price]").innerText = `$${price.toFixed(2)}`;
  }

  updateQuantity() {
    this.currentQuantity = 0;

    this.querySelectorAll("[name='option-quantity']").forEach(quantityInput => {
      this.currentQuantity += parseInt(quantityInput.value);
    })

    this.updateProceedButton();
  }

  addToCart() {
    const cartData = {items: []};
    const quantityOption = this.querySelector('[name="bundle-quantity"]:checked');

    this.querySelectorAll("[data-gift-option]:not([disabled])").forEach(giftOption => {
      const giftOptionId = giftOption.getAttribute("data-gift-option");

      if (giftOptionId !== "") {
        cartData.items.push({
          id: parseInt(giftOptionId),
          quantity: 1
        })
      }
    })

    this.querySelectorAll("[name='option-quantity']").forEach(quantityInput => {
      const controls = quantityInput.closest("[data-option-controls]");
      const productId = quantityInput.getAttribute("data-product");
      const quantityValue = parseInt(quantityInput.value);
      const sellingPlans = JSON.parse(controls.querySelector("[data-plans]").textContent);

      if (productId !== "" && quantityValue > 0) {
        const item = {
          id: parseInt(productId),
          quantity: quantityValue
        }

        if (sellingPlans.plans) {
          sellingPlans.plans.forEach(sellingPlan => {
            if (sellingPlan.name == this.sellingPlanTitle) {
              item["selling_plan"] = parseInt(sellingPlan.id);
            }
          })
        }
        
        cartData.items.push(item);
      }
    })

    fetch(window.Shopify.routes.root + 'cart/clear.js')
    .then(() => {
      fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      })
      .then(response => response.json())
      .then(response => {
        window.location.pathname = "/checkout";
      })
      .catch(error => console.error(error));
    })

  }

  setOnClick() {
    this.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-action")) {
        const controls = e.target.closest("[data-option-controls]");
        const quantityInput = controls?.querySelector("input") || false;

        switch (e.target.dataset.action) {
          case "add":
            if (controls && quantityInput) {
              controls.classList.remove("disabled");
              quantityInput.value = 1;
              this.updateQuantity();
            }
            break;
          case "increase":
            if (controls && quantityInput) {
              const value = parseInt(quantityInput.value);
              quantityInput.value = value + 1;
              this.updateQuantity();
            }
            break;
          case "decrease":
            if (controls && quantityInput) {
              const value = parseInt(quantityInput.value);
              quantityInput.value = value - 1;
              if (value === 1) {
                controls.classList.add("disabled");
              }
              this.updateQuantity();
            }
            break;
          case "proceed":
            this.addToCart();
            break;
        }
      }
    })
  }
}

customElements.define("ts-bundle", TSBundle);

