import React, { useState, useMemo, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { Link, Navigate } from "react-router-dom";

const Customer = () => {
    const [search, setSearch] = useState("");

    const navigateToProfile = (customerId) => {
        <Navigate to={`/customer/${customerId}`} />;
    };

    const [customer, setCustomer] = useState([]);

    const columns = useMemo(() => [
        {
            name: "ID",
            selector: (row) => row.customerid,
            sortable: true,
        },
        {
            name: "First Name",
            selector: (row) => row.customerfirstname,
            sortable: true,
        },
        {
            name: "Last Name",
            selector: (row) => row.customerlastname,
            sortable: true,
        },
        {
            name: "Email Address",
            selector: (row) => row.customeremailadress,
            sortable: true,
        },
        {
            name: "Password",
            selector: (row) => row.customerpassword,
            sortable: true,
        },
        {
            name: "Contact Number",
            selector: (row) => row.customercontactnumber,
            sortable: true,
        },
        {
            name: "Actions",
            selector: (row) => (
                <>
                    <Link
                        to={`/client/address/${row.customerid}`}
                        className="mr-2 text-blue-500 hover:text-blue-600"
                    >
                        Address
                    </Link>
                    <Link
                        to={`/client/orders/${row.customerid}`}
                        className="mr-2 text-blue-500 hover:text-blue-600"
                    >
                        Orders
                    </Link>
                </>
            ),
            sortable: false, // Assuming this column is not sortable
        },
    ]);

    useEffect(() => {
        //
        const fetchData = async () => {
            let apiUrl = "http://localhost:7722/customer";

            if (search) {
                apiUrl = `http://localhost:7722/customer/search/${search}`;
            }

            const response = await fetch(apiUrl);
            const data = await response.json();
            setCustomer(data);
        };

        fetchData();
    }, [search]);

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

    return (
        <section>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-semibold">Customer</h1>
                        <div className="search-container">
                            <input
                                type="search"
                                id="customer-search"
                                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search customer"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <DataTable columns={columns} data={customer} pagination />
                </div>
            </div>
        </section>
    );
};

export default Customer;
