export function variantSelect() {
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', function() {
          const productId = this.dataset.productId;
          const variantInput = document.querySelector(`input[name="variant-${productId}"]:checked`);

          if (variantInput) {
              const variantId = variantInput.value;
              addToCart(variantId);
          } else {
              console.warn(`No variant selected for product ${productId}`);
          }
      });
  });
}

function addToCart(variantId) {
  console.log(`Added variant ${variantId} to cart.`);
}
