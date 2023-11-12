import React, { useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Dashboard = () => {
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

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Dataset 1",
                data: [1092, 744, 924, 934, 1290, 1330, 1320],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return (
        <section className="section">
            <Sidebar />
            <div class="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="card bg-gradient-to-r from-slate-100 to-blue-100 p-4 rounded-lg shadow">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-gray-800">
                                    Customers
                                </h2>
                                <p className="card-text text-3xl font-bold text-gray-800">
                                    0
                                </p>
                            </div>
                        </div>
                        <div className="card bg-gradient-to-r from-slate-100 to-blue-100 p-4 rounded-lg shadow">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-gray-800">
                                    Orders
                                </h2>
                                <p className="card-text text-3xl font-bold text-gray-800">
                                    0
                                </p>
                            </div>
                        </div>
                        <div className="card bg-gradient-to-r from-slate-100 to-blue-100 p-4 rounded-lg shadow">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-gray-800">
                                    Products
                                </h2>
                                <p className="card-text text-3xl font-bold text-gray-800">
                                    0
                                </p>
                            </div>
                        </div>
                        <div className="card bg-gradient-to-r from-slate-100 to-blue-100 p-4 rounded-lg shadow">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-gray-800">
                                    Sales
                                </h2>
                                <p className="card-text text-3xl font-bold text-gray-800">
                                    0
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="graph-container">
                            <Bar data={data} />
                        </div>
                        <div className="graph-container">
                            <Bar data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
