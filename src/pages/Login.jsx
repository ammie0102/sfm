import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const userID = localStorage.getItem("userID");
    const userRoleID = localStorage.getItem("userRoleID");
    if (userID !== null && userRoleID === "CUS") {
      navigate("/menu");
    } else if (userID !== null && userRoleID === "ADM") {
      navigate("/dashboard");
    }
  }, [navigate]); // Add navigate to the dependency array

  const [customerContactNumber, setCustomerContactNumber] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");

  const login = async () => {
    try {
      const customerLogin = {
        customerContactNumber: customerContactNumber,
        customerPassword: customerPassword,
      };

      const customerResponse = await fetch(
        "https://santafetaguktukan.online/api/customer/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerLogin),
        }
      );

      if (customerResponse.ok) {
        const customerData = await customerResponse.json();

        localStorage.setItem("userID", customerData.customerid);
        localStorage.setItem("userRoleID", customerData.userroleid);

        Swal.fire({
          icon: "success",
          title: "Logged in!",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/menu");
      } else {
        //fetch admin login
        const adminLogin = {
          adminContactNumber: customerContactNumber,
          adminPassword: customerPassword,
        };

        const adminResponse = await fetch("https://santafetaguktukan.online/api/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminLogin),
        });

        if (adminResponse.ok) {
          const adminData = await adminResponse.json();

          localStorage.setItem("userID", adminData.adminid);
          localStorage.setItem("userRoleID", adminData.userroleid);

          Swal.fire({
            icon: "success",
            title: "Logged in!",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/dashboard");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid contact number or password!",
          });
        }
      }
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <section className="login bg-blue-100">
      <div className="container mx-auto px-4 min-h-screen relative">
        <form className="login-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
          <div className="mb-4">
            <h4 className="text-2xl font-bold mb-1">Login</h4>
            <p className="text-sm text-gray-500 mb-4">
              Don't have an account?{" "}
              <Link
                className="text-blue-500 hover:text-blue-700"
                to="/register"
              >
                Register
              </Link>
            </p>
          </div>
          <div className="mb-4">
            <label
              for="contact_number"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact Number or Email
            </label>
            <input
              type="text"
              id="contact_number"
              name="contact_number"
              autocomplete="contact_number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none"
              placeholder="e.g. 09123456789 or johndoe@gmail.com   "
              value={customerContactNumber}
              onChange={(e) => setCustomerContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              for="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5 outline-none"
                placeholder="Enter password"
                value={customerPassword}
                onChange={(e) => setCustomerPassword(e.target.value)}
                required
              />
              <label
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </label>
            </div>
          </div>
          <div>
            <button
              onClick={login}
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
