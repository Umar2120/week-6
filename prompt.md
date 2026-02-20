i'm building a multi-page E-Commerce frontend where users can browse products, view details, and manage a shopping cart without the page reloading.
can give me this functionalities :-
1. Setup Routes: Create a BrowserRouter with:
 
   a. / (Home Page - A welcome banner). 
   b. /shop (Shop Page - A grid of products fetched from the API).
   c./contact (Contact Page - A static form).
 
2.Dynamic Routing: Clicking on a product in the Shop should take me to /product/:id.
 
3.Product Details: On the Product Page, use the useParams() hook to get the ID, fetch that specific product's data, and display it (Image, Title, Price, Description).

, Global State (The Cart).
 
  1.Context API: Create a CartContext. This must wrap your entire application.
 
  2.Add to Cart: Add a button on the Product Page. Clicking it adds the item to your Global Cart state.
 
  3.Navbar Badge: The Navbar should appear on every page. It must show a "Cart Icon" with a number badge (e.g., (3)) that updates instantly when you add an item.
 
  4.Cart Page: Create a route /cart that lists all selected items and calculates the Total Price.

,Auth & Persistence.
 
  1.Persistent Cart: If I refresh the page, my Cart should not disappear. Sync your Context state with localStorage.
 
  2.Fake Authentication: Create a simple Login page (/login).
 
    a. Button: "Login as Guest".
 
    b.Set a user state to true.
 
  3.Protected Routes:
 
    a.The /checkout page should be protected.
 
    b.If a user tries to go to /checkout without logging in, automatically redirect them to /login.

   hey , add a admin login in which only admin can add products through the website , authenticate and store sign up info and use when the user login for authentications.
   add an advertisement banner moving linear in 3 sec also add a button to move next banner.
   add a search bar filter by which finding products gone easier.
   
 
