import React, { useEffect, useState } from "react";

const AddRiderModal = ({ showModal, setShowModal, setReload }) => {
    const [rider, setRider] = useState({
        deliverypersonid: Math.random().toString(36).substr(2, 9),
        deliverypersonfirstname: "",
        deliverypersonlastname: "",
        deliverypersonemailaddress: "",
        deliverypersonpassword: "",
        deliverypersoncontactnumber: "",
        userroleid: "RID",
        branchid: "",
    });

    const [branches, setBranches] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRider({
            ...rider,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(rider);
        const response = await fetch("http://localhost:7722/rider/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rider),
        });
        const data = await response.json();
        console.log(data);
        setReload(true);
        setShowModal(!showModal);
    };

    useEffect(() => {
        const getBranches = async () => {
            const response = await fetch("http://localhost:7722/branch");
            const data = await response.json();
            setBranches(data);
        };
        getBranches();
    }, []);

    return (
        <div
            id="add-rider-modal"
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
                            Add Rider
                        </h3>
                        <button
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            data-modal-hide="add-rider-modal"
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
                    <div class="p-6 grid grid-cols-2 gap-6">
                        <div>
                            <label
                                for="first_name"
                                class="block mb-2 text-sm font-medium text-gray-900"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                name="deliverypersonfirstname"
                                value={rider.deliverypersonfirstname}
                                onChange={handleChange}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="John"
                                required
                            />
                        </div>
                        <div>
                            <label
                                for="last_name"
                                class="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                name="deliverypersonlastname"
                                value={rider.deliverypersonlastname}
                                onChange={handleChange}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Doe"
                                required
                            />
                        </div>
                        <div>
                            <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="deliverypersonemailaddress"
                                value={rider.deliverypersonemailaddress}
                                onChange={handleChange}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="john.doe@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label
                                for="password"
                                class="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="deliverypersonpassword"
                                value={rider.deliverypersonpassword}
                                onChange={handleChange}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="********"
                                required
                            />
                        </div>
                        <div>
                            <label
                                for="contact_number"
                                class="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Contact Number
                            </label>
                            <input
                                type="text"
                                id="contact_number"
                                name="deliverypersoncontactnumber"
                                value={rider.deliverypersoncontactnumber}
                                onChange={handleChange}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="1234567890"
                                required
                            />
                        </div>
                        <div>
                            <label
                                for="branch_id"
                                class="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Branch ID
                            </label>
                            <select
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-300 text-sm text-gray-500"
                                id="branch_id"
                                name="branchid"
                                value={rider.branchid}
                                onChange={handleChange}
                                required
                            >
                                {branches.map((branch) => (
                                    <option
                                        value={branch.branchid}
                                        key={branch.branchid}
                                    >
                                        {branch.branchname}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                        <button
                            data-modal-hide="add-rider-modal"
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                        <button
                            data-modal-hide="add-rider-modal"
                            type="button"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRiderModal;
