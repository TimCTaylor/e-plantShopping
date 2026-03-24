# IBM Developer Skills course

## Developing Front-End Apps with React

Part of **Full Stack Developer Professional Certification**

This is the graded final project of the course, and it's a simple introduction to some common
React patterns, particularly the use of the Redux store to manage state.

I've addded comments inline where I think there are points that are useful for me to remind myself
of the key patterns.

The most significant is that we define a React slicer to handle the state of the shopping cart. 
Both the CartItem and ProductList components use the useSelector() hook to attach themselves to
the Redux store. We have multiple UI elements that React re-renders automatically when the state
within the Cart slice changes.

For example, the 'Add to cart' button greys out, the cost and quantity totals on the cart page update,
and the 'count of items in the cart' number inside the shopping cart image also updates automatically.

Take, for example, the delete product button on the cart page (implemented in CartItem.jsx). If I click this,
it will update the UI on the Plant page (implemented in ProductList.jsx) by re-enabling the 'Add to cart' button.
CartItem has no knowledge of ProductList's existence. This is possible because the state of the cart items
is managed by the Redux store and so React will automatically re-render all the hooked in elements.

*Tim Taylor - March 2026*