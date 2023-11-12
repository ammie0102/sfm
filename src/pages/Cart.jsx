import React from "react";
import Navbar from "../components/Navbar";

const Cart = () => {
  return (
    <>
      <Navbar />

      <div className="grid grid-cols-5 container mx-auto my-8 p-8 bg-white shadow-lg">
        <div>
          <h1>My Cart</h1>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkbox1"
            name="checkbox1"
            value="check1"
          />
          <label for="checkbox1"></label>
        </div>
        <div className="grid-col-1">
          <img
            src="https://th.bing.com/th?id=OIP.kTvs-fiEdCw7rldk41rhKwHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
            alt="Description of image"
            className="h-5 w-5"
          />
        </div>
        <div className="grid-col-1">
          <h1>Page Title</h1>{" "}
        </div>
        <div className="grid-col-1 flex justify-start gap-2">
          <button class="quantity-btn">-</button>
          <input type="text" value="1" className="w-5" />
          <button class="quantity-btn">+</button>
        </div>
        <div className="grid-col-1">
          <button class="edit bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Edit
          </button>
          <button class="delete bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Delete
          </button>
        </div>
        <div>
          <button
            type="submit"
            class="place-order-btn"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Settlement Amount:
          </button>
        </div>
      </div>

      <div class="container mx-auto my-8 p-8 bg-white shadow-lg">
        <h2 class="text-3xl font-bold mb-4">Order Summary</h2>

        <table class="w-full border-collapse border border-gray-300 mb-6">
          <thead>
            <tr>
              <th class="py-2 px-4 bg-gray-200">Product</th>
              <th class="py-2 px-4 bg-gray-200">Quantity</th>
              <th class="py-2 px-4 bg-gray-200">Price</th>
              <th class="py-2 px-4 bg-gray-200">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-4">Product 1</td>
              <td class="py-2 px-4">2</td>
              <td class="py-2 px-4">$20.00</td>
              <td class="py-2 px-4">$40.00</td>
            </tr>
            <tr>
              <td class="py-2 px-4">Product 2</td>
              <td class="py-2 px-4">1</td>
              <td class="py-2 px-4">$30.00</td>
              <td class="py-2 px-4">$30.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th class="py-2 px-4" colspan="3">
                Total
              </th>
              <td class="py-2 px-4">$70.00</td>
            </tr>
          </tfoot>
        </table>

        <button
          type="submit"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
    </>
  );
};

export default Cart;
