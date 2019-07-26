export const addToCart = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    console.log(item);
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      count: 1
    });

    //Ignore redundant item from cart
    cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
      return cart.find(p => p._id === id);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};
