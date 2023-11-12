import React, { useState } from "react";
import FoodModal from "../components/FoodModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faLocationDot,
    faSquarePlus,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AddressModal from "../components/AddressModal";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Menu = () => {
    const [foods, setFoods] = useState([]);
    const [foodPrices, setFoodPrices] = useState([]);
    const [selectedFood, setSelectedFood] = useState({});
    const [foodModal, setFoodModal] = useState(false);
    const [cart, setCart] = useState([]);
    const [addressModal, setAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({});
    const [address, setAddress] = useState([]);
    const [customerID, setCustomerID] = useState("");

    const [branchLocation, setBranchLocation] = useState([]);

    const [rider, setRider] = useState([]);

    useEffect(() => {
        setCustomerID(localStorage.getItem("userID"));

        const fetchData = async () => {
            try {
                const responseFood = await fetch("http://localhost:7722/food");
                const dataFood = await responseFood.json();

                const responseFoodPrice = await fetch(
                    "http://localhost:7722/food/price"
                );
                const dataFoodPrice = await responseFoodPrice.json();

                const responseRider = await fetch(
                    "http://localhost:7722/rider"
                );
                const dataRider = await responseRider.json();
                setRider(dataRider);

                const responseBranchLocation = await fetch(
                    "http://localhost:7722/branch"
                );
                const dataBranchLocation = await responseBranchLocation.json();
                setBranchLocation(dataBranchLocation);

                setFoods(dataFood);
                setFoodPrices(dataFoodPrice);

                setBranchSelectKey((prevKey) => prevKey + 1); // Increment the key

                if (localStorage.getItem("userID") !== null) {
                    const responseCart = await fetch(
                        "http://localhost:7722/cart/" +
                            localStorage.getItem("userID")
                    );
                    const dataCart = await responseCart.json();
                    setCart(dataCart);

                    const responseAddresses = await fetch(
                        "http://localhost:7722/address/" + customerID
                    );
                    const dataAddresses = await responseAddresses.json();
                    setAddress(dataAddresses);

                    const defaultAddress = dataAddresses.find(
                        (address) => address.customeraddressdefault === true
                    );
                    if (defaultAddress) {
                        setSelectedAddress(defaultAddress);
                    } else {
                        setSelectedAddress(dataAddresses[0]);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [customerID]);

    const deleteFromCart = async (cartID) => {
        try {
            const response = await fetch(
                "http://localhost:7722/cart/delete/" + cartID,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                const updatedCart = cart.filter(
                    (item) => item.cartid !== cartID
                );
                setCart(updatedCart);
            } else {
                console.error("Error deleting item from cart");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [nearestBranch, setNearestBranch] = useState("");
    const [branchSelectKey, setBranchSelectKey] = useState(0);

    const findNearestBranch = (customerLatitude, customerLongitude) => {
        console.log(customerLatitude, customerLongitude);
        let nearestBranchID = null;
        let minDistance = Infinity;

        branchLocation.forEach((branch) => {
            const branchLatitude = parseFloat(branch.branchlatitude);
            const branchLongitude = parseFloat(branch.branchlongitude);

            const dLat = ((branchLatitude - customerLatitude) * Math.PI) / 180;
            const dLon =
                ((branchLongitude - customerLongitude) * Math.PI) / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos((customerLatitude * Math.PI) / 180) *
                    Math.cos((branchLatitude * Math.PI) / 180) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = 6371 * c; // Radius of the Earth in km

            if (distance < minDistance) {
                minDistance = distance;
                nearestBranchID = branch.branchid;
            }
        });

        setNearestBranch(nearestBranchID);
    };

    useEffect(() => {
        if (selectedAddress) {
            findNearestBranch(
                // selectedAddress.customerlatitude to number
                parseFloat(selectedAddress.addresslatitude),

                // selectedAddress.customerlongitude to number
                parseFloat(selectedAddress.addresslongitude)
            );
        }
    }, [selectedAddress]);

    const submitOrder = async () => {
        console.log(selectedAddress, customerID);
        if (customerID === "") {
            alert("Please select an address");
            return;
        }
        const order = {
            customerorderid: Math.random().toString(36).substr(2, 9),
            customerid: localStorage.getItem("userID"),
            customeraddressid: selectedAddress.customeraddressid,
            customerorderdate: new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
            customerorderstatus: "Pending",
            customerordertotalprice: cart.reduce(
                (total, item) =>
                    parseFloat(total) +
                    parseFloat(
                        foodPrices.find(
                            (price) =>
                                price.foodmenupriceid === item.foodmenupriceid
                        ).foodmenuprice
                    ),
                0
            ),
            customerorderpaymentmethod: "Cash",
            customerorderpaymentstatus: "Pending",
            deliverypersonid: rider[0].deliverypersonid,
        };
        console.log(order);
        try {
            const response = await fetch("http://localhost:7722/order/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });

            if (response.ok) {
                cart.forEach(async (item) => {
                    const orderItem = {
                        customerorderitemid: Math.random()
                            .toString(36)
                            .substr(2, 9),
                        customerorderid: order.customerorderid,
                        foodmenuid: item.foodmenuid,
                        foodmenupriceid: item.foodmenupriceid,
                        customerorderitemquantity: item.quantity,
                        customerorderitemtotalprice:
                            item.quantity *
                            foodPrices.find(
                                (price) =>
                                    price.foodmenupriceid ===
                                    item.foodmenupriceid
                            ).foodmenuprice,
                    };

                    console.log(orderItem);
                    try {
                        const response = await fetch(
                            "http://localhost:7722/order/item/add",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(orderItem),
                            }
                        );

                        if (response.ok) {
                            console.log("Order item added");
                        } else {
                            console.error("Error adding order item");
                        }
                    } catch (error) {
                        console.error(error);
                    }
                });

                try {
                    const responseDeleteCart = await fetch(
                        "http://localhost:7722/customer/cart/delete/" +
                            customerID,
                        {
                            method: "DELETE",
                        }
                    );

                    if (responseDeleteCart.ok) {
                        console.log("Cart deleted");
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {foodModal ? (
                <FoodModal
                    showModal={foodModal}
                    setShowModal={setFoodModal}
                    selectedFood={selectedFood}
                    foodPrices={foodPrices}
                />
            ) : null}
            {addressModal ? (
                <AddressModal
                    showModal={addressModal}
                    setShowModal={setAddressModal}
                    address={address}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                />
            ) : null}
            <Navbar />
            <section className="menu-section relative">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-full">
                    <div className="flex flex-row h-full">
                        <div className="food-menu-container border border-red-500 h-full w-[64%] p-4 overflow-y-auto">
                            {/* Banner */}
                            <div className="santa-fe-banner bg-gray-200 h-[12rem]"></div>
                            {/* Search Bar */}
                            <div className="search-container mt-4">
                                <form>
                                    <label
                                        htmlFor="food-search"
                                        className="mb-2 text-sm font-medium text-gray-900 sr-only"
                                    >
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-gray-500"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="food-search"
                                            name="food-search"
                                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Search Foods and Products"
                                        />
                                        <button className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="filter-container mt-4">
                                <ul className="flex flex-row justify-start items-center space-x-2">
                                    <li className="px-2 py-1 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg">
                                        All
                                    </li>
                                    <li className="px-2 py-1 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg">
                                        Chicken
                                    </li>
                                    <li className="px-2 py-1 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg">
                                        Pork
                                    </li>
                                    <li className="px-2 py-1 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg">
                                        Drinks
                                    </li>
                                    <li className="px-2 py-1 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg">
                                        Best Seller
                                    </li>
                                </ul>
                            </div>
                            <div className="menu-container mt-4">
                                <ul className="grid grid-cols-2 gap-4">
                                    {foods && foodPrices
                                        ? foods.map((food) => (
                                              <li
                                                  key={food.foodmenuid}
                                                  className="food-menu-item rounded-lg"
                                                  data-modal-target="foodModal"
                                                  data-modal-toggle="foodModal"
                                                  onClick={() => {
                                                      setSelectedFood(food);
                                                      setFoodModal(true);
                                                  }}
                                              >
                                                  <div className="food-menu-image-container h-[12rem]">
                                                      <img
                                                          src={`../src/assets/foods/${food.foodmenuimage}`}
                                                          alt={
                                                              food.foodmenuname
                                                          }
                                                          className="object-cover w-full h-full rounded-t-lg"
                                                      />
                                                  </div>
                                                  <div className="food-menu-info-container p-4">
                                                      <div className="food-menu-name-container">
                                                          <h3 className="text-lg font-medium text-gray-900">
                                                              {
                                                                  food.foodmenuname
                                                              }
                                                          </h3>
                                                      </div>
                                                      <div className="food-menu-description-container">
                                                          <p className="text-sm text-gray-500">
                                                              {
                                                                  food.foodmenudescription
                                                              }
                                                          </p>
                                                      </div>
                                                      <div className="food-menu-price-container">
                                                          {foodPrices
                                                              .filter(
                                                                  (price) =>
                                                                      price.foodmenuid ===
                                                                      food.foodmenuid
                                                              )
                                                              .map((price) => (
                                                                  <div
                                                                      key={
                                                                          price.foodmenupriceid
                                                                      }
                                                                  >
                                                                      <p className="text-sm text-gray-500">
                                                                          Php{" "}
                                                                          {
                                                                              price.foodmenuprice
                                                                          }{" "}
                                                                          /{" "}
                                                                          {
                                                                              price.foodmenucuttype
                                                                          }
                                                                      </p>
                                                                  </div>
                                                              ))}
                                                      </div>
                                                  </div>
                                              </li>
                                          ))
                                        : null}
                                </ul>
                            </div>
                        </div>
                        <div className="order-container border border border-red-500 h-full w-[36%] p-4">
                            <div className="order-header">
                                <h3 className="text-2xl font-medium text-gray-900">
                                    Order Summary
                                </h3>
                            </div>
                            <hr className="my-2 border-b-1 border-gray-300" />
                            <div className="order-address-container">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className="mr-2"
                                    />
                                    Delivery Address
                                </h3>
                                <div className="order-address-body">
                                    {selectedAddress &&
                                    localStorage.getItem("userID") !== null ? (
                                        <>
                                            <p className="text-sm font-medium text-gray-900">
                                                {
                                                    selectedAddress.customerfullname
                                                }
                                            </p>
                                            <div className="flex flex-row justify-between items-center space-x-2">
                                                <p className="text-sm text-gray-500">
                                                    {selectedAddress.customerstreet +
                                                        ", " +
                                                        selectedAddress.customerbarangay +
                                                        ", " +
                                                        selectedAddress.customercity}
                                                </p>
                                                {selectedAddress.customeraddressdefault ? (
                                                    <p className="text-gray-500 border border-blue-500 p-1 bg-blue-100 text-[10px]">
                                                        Default
                                                    </p>
                                                ) : null}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {
                                                    selectedAddress.customercontactnumber
                                                }
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            No address selected
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-row justify-between items-center space-x-2 mt-2">
                                    {address.length > 0 ? (
                                        <button
                                            className="border-2 border-red-500 border-dashed text-red-500 hover:bg-red-500 hover:text-white px-2 py-2 rounded-lg text-sm mt-2 w-full transition duration-150 ease-in-out"
                                            data-modal-target="addressModal"
                                            data-modal-toggle="addressModal"
                                            onClick={() =>
                                                setAddressModal(true)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faEdit} />{" "}
                                            Change Address
                                        </button>
                                    ) : null}
                                    <Link
                                        className="border-2 border-red-500 border-dashed text-red-500 hover:bg-red-500 hover:text-white px-2 py-2 rounded-lg text-sm mt-2 w-full transition duration-150 ease-in-out text-center"
                                        to="/address"
                                    >
                                        <FontAwesomeIcon icon={faSquarePlus} />{" "}
                                        Add New Address
                                    </Link>
                                </div>
                            </div>
                            <hr className="my-2 border-b-1 border-gray-300" />

                            <div className="order-branch-container">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className="mr-2"
                                    />
                                    Choose Branch
                                </h3>
                                <div className="input-group">
                                    <select
                                        key={branchSelectKey} // Add key to the select element
                                        name="branch"
                                        id="branch"
                                        className="w-full border-2 border-yellow-300 border-dashed rounded-lg px-4 py-2 text-sm text-gray-500"
                                    >
                                        {branchLocation.map((location) => (
                                            <option
                                                key={location.branchid}
                                                value={location.branchid}
                                                selected={
                                                    location.branchid ===
                                                    nearestBranch
                                                        ? true
                                                        : false
                                                }
                                            >
                                                {location.branchname}{" "}
                                                {location.branchid ===
                                                nearestBranch
                                                    ? "(Suggested nearest branch)"
                                                    : null}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <hr className="my-2 border-b-1 border-gray-300" />

                            <div className="order-items-container mt-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Order Items
                                </h3>
                                <div className="order-items-body">
                                    {cart.length === 0 ? (
                                        <p className="text-sm text-gray-500 text-center border border-gray-300 p-4 rounded-lg">
                                            No items in cart
                                        </p>
                                    ) : (
                                        <ul className="space-y-2">
                                            {cart.map((item) => (
                                                <li
                                                    key={item.cartid}
                                                    className="flex flex-row justify-between items-center"
                                                >
                                                    <div className="flex flex-row justify-start items-center space-x-2">
                                                        <p className="text-sm text-gray-500">
                                                            {item.quantity} x
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {
                                                                foods.find(
                                                                    (food) =>
                                                                        food.foodmenuid ===
                                                                        item.foodmenuid
                                                                ).foodmenuname
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row justify-end items-center space-x-2">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            Php{" "}
                                                            {item.quantity *
                                                                foodPrices.find(
                                                                    (price) =>
                                                                        price.foodmenupriceid ===
                                                                        item.foodmenupriceid
                                                                ).foodmenuprice}
                                                        </p>
                                                        <button
                                                            className="text-red-500 hover:bg-red-500 hover:text-white px-2 py-2 rounded-lg text-sm transition duration-150 ease-in-out"
                                                            onClick={() => {
                                                                deleteFromCart(
                                                                    item.cartid
                                                                );
                                                            }}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                            />
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Subtoal and Delivery Fee */}
                                    <hr className="my-2 border-b-1 border-gray-300" />
                                    <div className="flex flex-row justify-between items-center mt-4">
                                        <p className="text-sm text-gray-500">
                                            Subtotal
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                            Php{" "}
                                            {cart.reduce(
                                                (total, item) =>
                                                    parseFloat(total) +
                                                    parseFloat(
                                                        foodPrices.find(
                                                            (price) =>
                                                                price.foodmenupriceid ===
                                                                item.foodmenupriceid
                                                        ).foodmenuprice
                                                    ) *
                                                        item.quantity,
                                                0
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between items-center mt-4">
                                        <p className="text-sm text-gray-500">
                                            Delivery Fee
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                            Php 50.00
                                        </p>
                                    </div>
                                    {/* Total */}
                                    <hr className="my-2 border-b-1 border-gray-300" />
                                    <div className="flex flex-row justify-between items-center mt-4">
                                        <p className="text-sm text-gray-500">
                                            Total
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                            Php{" "}
                                            {cart.reduce(
                                                (total, item) =>
                                                    parseFloat(total) +
                                                    parseFloat(
                                                        foodPrices.find(
                                                            (price) =>
                                                                price.foodmenupriceid ===
                                                                item.foodmenupriceid
                                                        ).foodmenuprice
                                                    ) *
                                                        item.quantity,
                                                50
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm mt-4 transition duration-150 ease-in-out">
                                            View Cart
                                        </button>
                                        <button
                                            className="text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm mt-2 transition duration-150 ease-in-out"
                                            onClick={submitOrder}
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Menu;
