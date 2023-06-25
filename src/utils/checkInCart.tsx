export const CheckInCart = (cart: ProductPorps, product: ProductPorps) => {
  return cart.find((c: ProductPorps) => c.name === product.name);
};
