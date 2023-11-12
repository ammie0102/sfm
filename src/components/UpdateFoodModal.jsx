import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const UpdateFoodModal = ({ showModal, setShowModal, foodData, setReload }) => {
    console.log(foodData);
    const [foodMenuID, setFoodMenuID] = useState(foodData.foodmenuid);
    const [foodName, setFoodName] = useState(foodData.foodmenuname);
    const [foodMenuDescription, setFoodMenuDescription] = useState(
        foodData.foodmenudescription
    );
    const [foodMenuCategory, setFoodMenuCategory] = useState(
        foodData.foodmenucategory
    );
    const [foodMenuImage, setFoodMenuImage] = useState(foodData.foodmenuimage);

    useEffect(() => {
        console.log(foodName);
        console.log(foodMenuDescription);
        console.log(foodMenuCategory);
        console.log(foodMenuImage);
    }, [foodName, foodMenuDescription, foodMenuCategory, foodMenuImage]);

    const handleSubmit = () => {
        const updatedFoodData = {
            foodMenuName: foodName,
            foodMenuDescription: foodMenuDescription,
            foodMenuCategory: foodMenuCategory,
            foodMenuImage: foodMenuImage,
        };

        const response = fetch(
            `http://localhost:7722/food/update/${foodMenuID}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFoodData),
            }
        );

        console.log("Food updated");
        setReload(true);
        setShowModal(false);
    };

    return (
        <div
            id="update-food-modal"
            data-modal-backdrop="static"
            tabindex="-1"
            aria-hidden="true"
            class={`fixed transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl p-4 overflow-x-hidden overflow-y-auto' ${
                showModal ? "block" : "hidden"
            }`}
        >
            <div class="relative w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow">
                    <div class="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 class="text-xl font-semibold text-gray-900">
                            Update Food
                        </h3>
                        <button
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            data-modal-hide="add-food-modal"
                            onClick={() => setShowModal(false)}
                        >
                            <svg
                                class="w-3 h-3"
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
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="p-6 space-y-6">
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none"
                            name="foodName"
                            placeholder="Food Name"
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                        />
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none"
                            name="foodMenuDescription"
                            placeholder="Food Description"
                            value={foodMenuDescription}
                            onChange={(e) =>
                                setFoodMenuDescription(e.target.value)
                            }
                        ></textarea>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none"
                            name="foodMenuCategory"
                            placeholder="Food Category"
                            value={foodMenuCategory}
                            onChange={(e) =>
                                setFoodMenuCategory(e.target.value)
                            }
                        />
                    </div>
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                        <button
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={handleSubmit}
                        >
                            Submit Food
                        </button>
                        <button
                            data-modal-hide="add-food-modal"
                            type="button"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                            onClick={() => setShowModal(false)}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateFoodModal;
