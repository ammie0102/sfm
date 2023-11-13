import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
const AddFoodModal = ({ showModal, setShowModal, setReload }) => {
    const [foodName, setFoodName] = useState("");
    const [foodMenuDescription, setFoodMenuDescription] = useState("");
    const [foodMenuCategory, setFoodMenuCategory] = useState("");
    const [foodMenuImage, setFoodMenuImage] = useState(
        "../src/assets/foods/im.jpg"
    );

    const [menuPrices, setMenuPrices] = useState([
        { foodMenuPrice: "", foodMenuCutType: "" },
    ]);

    const handleAddPrice = () => {
        setMenuPrices([
            ...menuPrices,
            { foodMenuPrice: "", foodMenuCutType: "" },
        ]);
    };

    useEffect(() => {
        console.log(foodName);
        console.log(foodMenuDescription);
        console.log(foodMenuCategory);
        console.log(foodMenuImage);

        console.log(menuPrices);
    }, [
        foodName,
        foodMenuDescription,
        foodMenuCategory,
        foodMenuImage,
        menuPrices,
    ]);

    const handleRemovePrice = (index) => {
        if (menuPrices.length === 1) return;
        const updatedPrices = menuPrices.filter((_, i) => i !== index);
        setMenuPrices(updatedPrices);
    };
    const handleChange = (index, field, value) => {
        const updatedPrices = [...menuPrices];
        updatedPrices[index][field] = value;
        setMenuPrices(updatedPrices);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("foodMenuID", Math.random(100000, 999999));
        formData.append("foodMenuImage", foodMenuImage);
        formData.append("foodMenuName", foodName);
        formData.append("foodMenuDescription", foodMenuDescription);
        formData.append("foodMenuCategory", foodMenuCategory);

        // const foodData = {
        //     foodMenuID: Math.random().toString(36).substr(2, 9),
        //     foodMenuName: foodName,
        //     foodMenuDescription: foodMenuDescription,
        //     foodMenuCategory: foodMenuCategory,
        //     foodMenuImage: foodMenuImage,
        // };
        // console.log(foodData);

        const response = fetch("https://santafetaguktukan.online/api/food/add", {
            method: "POST",

            body: formData,
        });

        console.log("Food added");
        menuPrices.forEach((price) => {
            let priceData = {
                foodMenuID: formData.get("foodMenuID"),
                foodMenuPrice: price.foodMenuPrice,
                foodMenuCutType: price.foodMenuCutType,
            };
            console.log(priceData);
            const response = fetch("https://santafetaguktukan.online/api/food/price/add", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(priceData),
            });
        });

        setReload(true);
        setShowModal(false);
    };

    return (
        <div
            id="add-food-modal"
            data-modal-backdrop="static"
            tabindex="-1"
            aria-hidden="true"
            className={`fixed transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl p-4 overflow-x-hidden overflow-y-auto' ${
                showModal ? "block" : "hidden"
            }`}
        >
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-start justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Add Food
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                                data-modal-hide="add-food-modal"
                                onClick={() => setShowModal(false)}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none"
                                name="foodName"
                                placeholder="Food Name"
                                onChange={(e) => setFoodName(e.target.value)}
                            />
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none"
                                name="foodMenuDescription"
                                placeholder="Food Description"
                                onChange={(e) =>
                                    setFoodMenuDescription(e.target.value)
                                }
                            ></textarea>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none"
                                name="foodMenuCategory"
                                placeholder="Food Category"
                                onChange={(e) =>
                                    setFoodMenuCategory(e.target.value)
                                }
                            />
                            <input
                                type="file"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none"
                                name="foodMenuImage"
                                placeholder="Food Image"
                                onChange={(e) =>
                                    setFoodMenuImage(e.target.files[0])
                                }
                            />
                            <div className="grid grid-cols-3 gap-4">
                                {menuPrices.map((price, index) => (
                                    <div key={index} className="flex flex-col">
                                        <label>
                                            Price:
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={price.foodMenuPrice}
                                                onChange={(e) =>
                                                    handleChange(
                                                        index,
                                                        "foodMenuPrice",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </label>
                                        <label>
                                            Cut Type:
                                            <input
                                                type="text"
                                                value={price.foodMenuCutType}
                                                onChange={(e) =>
                                                    handleChange(
                                                        index,
                                                        "foodMenuCutType",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </label>
                                        {menuPrices.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemovePrice(index)
                                                }
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold rounded mt-2"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button type="button" onClick={handleAddPrice}>
                                Add Price
                            </button>
                        </div>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Submit Food
                            </button>
                            <button
                                data-modal-hide="add-food-modal"
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                onClick={() => setShowModal(false)}
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddFoodModal;
