import React, { useState, useMemo, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import AddFoodModal from "../components/AddFoodModal";
import UpdateFoodModal from "../components/UpdateFoodModal";
const Foods = () => {
    const [reload, setReload] = useState(false); // Used to reload the data table after a change has been made to the database
    useEffect(() => {
        if (localStorage.getItem("userID") === null) {
            //if the user is not logged in, redirect to login page
            window.location.href = "/login";
        } else {
            if (localStorage.getItem("userRoleID") !== "ADM") {
                //if the user is not a customer, redirect to login page
                window.location.href = "/menu";
            }
        }
    }, []);

    const [showAddFoodModal, setShowAddFoodModal] = useState(false);
    const [showUpdateFoodModal, setShowUpdateFoodModal] = useState(false);
    const [selectedFood, setSelectedFood] = useState({});

    const [foods, setFoods] = useState([]);

    const [foodPrices, setFoodPrices] = useState([]);

    const handleClickedRow = (row) => {
        console.log(row);
        setSelectedFood(row);
        setShowUpdateFoodModal(true);
    };

    const columns = useMemo(() => [
        {
            name: "ID",
            selector: (row) => row.foodmenuid,
            sortable: true,
        },

        {
            name: "Image",
            selector: (row) => (
                <img
                    src={`../src/assets/foods/${row.foodmenuimage}`}
                    alt={row.foodmenuname}
                    className="w-20"
                />
            ),
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.foodmenuname,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.foodmenudescription,
            sortable: true,
        },
        {
            name: "Category",
            selector: (row) => row.foodmenucategory,
            sortable: true,
        },
        {
            name: "Actions",
            selector: (row) => (
                <div className="flex justify-center">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mx-1"
                        onClick={() => handleClickedRow(row)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                </div>
            ),
            sortable: true,
        },
    ]);

    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let apiUrl = "http://localhost:7722/food";

            if (search !== "") {
                apiUrl += `/search/${search}`;
            }

            const response = await fetch(apiUrl);
            const data = await response.json();
            setFoods(data);
        };

        fetchData();
        setReload(false);
    }, [reload, search]);
    return (
        <>
            <section>
                <Sidebar />
                <div className="p-4 sm:ml-64">
                    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                        <div className="header border border-gray-300 bg-white shadow-sm p-4">
                            <h1 className="font-bold text-2xl">Foods</h1>
                        </div>
                        <hr className="border-b-1 border-gray-300 my-2" />
                        <div className="flex justify-between items-center border border-gray-300 bg-white shadow-sm p-4">
                            <div className="search-container">
                                <input
                                    type="search"
                                    id="food-search"
                                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search foods..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                                data-modal-target="add-food-modal"
                                data-modal-toggle="add-food-modal"
                                onClick={() => setShowAddFoodModal(true)}
                            >
                                <FontAwesomeIcon icon={faSquarePlus} /> Add Food
                            </button>
                        </div>
                        <DataTable
                            columns={columns}
                            data={foods}
                            pagination
                        ></DataTable>
                    </div>
                </div>
            </section>
            {showAddFoodModal && (
                <AddFoodModal
                    showModal={showAddFoodModal}
                    setShowModal={setShowAddFoodModal}
                    setReload={setReload}
                />
            )}
            {showUpdateFoodModal && (
                <UpdateFoodModal
                    showModal={showUpdateFoodModal}
                    setShowModal={setShowUpdateFoodModal}
                    foodData={selectedFood}
                    setReload={setReload}
                />
            )}
        </>
    );
};

export default Foods;
