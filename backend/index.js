const express = require("express");
const cors = require("cors");
const pool = require("./db/sfm_db");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors());

//multer
const multer = require("multer");
const path = require("path");
const { log } = require("console");

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: "../src/assets/foods",
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//add food item
app.post("/food/add", upload.single("foodMenuImage"), async (req, res) => {
    try {
        const {
            foodMenuID,
            foodMenuName,
            foodMenuDescription,
            foodMenuCategory,
        } = req.body;

        console.log(req.body);
        console.log(req.file);
        const foodMenuImage = req.file.filename;
        console.log(foodMenuImage);

        const newFood = await pool.query(
            "INSERT INTO foodMenuTable (foodMenuID, foodMenuName, foodMenuDescription, foodMenuCategory, foodMenuImage) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [
                foodMenuID,
                foodMenuName,
                foodMenuDescription,
                foodMenuCategory,
                foodMenuImage,
            ]
        );

        res.json(newFood.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/food/price/add", async (req, res) => {
    // -- Create foodMenuPriceTable
    // CREATE TABLE foodMenuPriceTable (
    //     foodMenuPriceID VARCHAR(20) PRIMARY KEY,
    //     foodMenuID VARCHAR(20) REFERENCES foodMenuTable(foodMenuID),
    //     foodMenuPrice DECIMAL(10,2), -- Assuming prices are stored as decimal numbers
    //     foodMenuCutType VARCHAR(255)
    // );

    let foodPriceID = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 20; i++) {
        foodPriceID += possible.charAt(
            Math.floor(Math.random() * possible.length)
        );
    }

    try {
        const { foodMenuID, foodMenuPrice, foodMenuCutType } = req.body;

        const newFoodPrice = await pool.query(
            "INSERT INTO foodMenuPriceTable (foodMenuPriceID, foodMenuID, foodMenuPrice, foodMenuCutType) VALUES($1, $2, $3, $4) RETURNING *",
            [foodPriceID, foodMenuID, foodMenuPrice, foodMenuCutType]
        );

        res.json(newFoodPrice.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get foods
app.get("/food", async (req, res) => {
    try {
        const allFood = await pool.query("SELECT * FROM foodMenuTable");
        res.json(allFood.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get food price
app.get("/food/price", async (req, res) => {
    try {
        const allFoodPrice = await pool.query(
            "SELECT * FROM foodMenuPriceTable"
        );
        res.json(allFoodPrice.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//add to cart
app.post("/cart/add", async (req, res) => {
    //     -- Create cartTable
    // CREATE TABLE cartTable (
    //     cartID VARCHAR(20) PRIMARY KEY,
    //     customerID VARCHAR(20) REFERENCES customerTable(customerID),
    //     foodMenuID VARCHAR(20) REFERENCES foodMenuTable(foodMenuID),
    //     foodMenuPriceID VARCHAR(20) REFERENCES foodMenuPriceTable(foodMenuPriceID),
    //     quantity INT
    // );

    try {
        const { cartID, customerID, foodMenuID, foodMenuPriceID, quantity } =
            req.body;
        const newCart = await pool.query(
            "INSERT INTO cartTable (cartID, customerID, foodMenuID, foodMenuPriceID, quantity) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [cartID, customerID, foodMenuID, foodMenuPriceID, quantity]
        );

        res.json(newCart.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get cart
app.get("/cart/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allCart = await pool.query(
            "SELECT * FROM cartTable WHERE customerID = $1",
            [id]
        );
        res.json(allCart.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//delete cart
app.delete("/cart/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCart = await pool.query(
            "DELETE FROM cartTable WHERE cartID = $1",
            [id]
        );
        res.json("Cart was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

//add address
app.post("/address/add", async (req, res) => {
    // CREATE TABLE customerAddressTable (
    //     customerAddressID VARCHAR(20) PRIMARY KEY,
    //     customerID VARCHAR(20) REFERENCES customerTable(customerID),
    //     customerFullName VARCHAR(255),
    //     customerContactNumber VARCHAR(255),
    //     customerStreet VARCHAR(255),
    //     customerBarangay VARCHAR(255),
    //     customerCity VARCHAR(255),
    //     customerNotes TEXT,
    //     customerAddressLabel VARCHAR(255),
    //     customerAddressDefault BOOLEAN,
    //     addressLatitude DECIMAL(10, 15), -- Assuming latitude is stored as decimal number
    //     addressLongitude DECIMAL(10, 15) -- Assuming longitude is stored as decimal number
    // );

    let customerAddressID = Math.random().toString(36).substring(2, 9);

    try {
        const {
            customerID,
            customerFullName,
            customerContactNumber,
            customerStreet,
            customerBarangay,
            customerCity,
            customerNotes,
            customerAddressLabel,
            customerAddressDefault,
            addressLatitude,
            addressLongitude,
        } = req.body;
        const newAddress = await pool.query(
            "INSERT INTO customerAddressTable (customerAddressID, customerID, customerFullName, customerContactNumber, customerStreet, customerBarangay, customerCity, customerNotes, customerAddressLabel, customerAddressDefault, addressLatitude, addressLongitude) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11, $12) RETURNING *",
            [
                customerAddressID,
                customerID,
                customerFullName,
                customerContactNumber,
                customerStreet,
                customerBarangay,
                customerCity,
                customerNotes,
                customerAddressLabel,
                customerAddressDefault,
                addressLatitude,
                addressLongitude,
            ]
        );

        res.json(newAddress.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get address
app.get("/address/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allAddress = await pool.query(
            "SELECT * FROM customerAddressTable WHERE customerID = $1",
            [id]
        );
        res.json(allAddress.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//login
app.post("/customer/login", async (req, res) => {
    try {
        const { customerContactNumber, customerPassword } = req.body;

        const user = await pool.query(
            "SELECT * FROM customerTable WHERE customerContactNumber = $1 OR customerEmailAdress = $1",
            [customerContactNumber]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const matched = await bcrypt.compare(
            customerPassword,
            user.rows[0].customerpassword
        );

        if (!matched) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

app.post("/admin/login", async (req, res) => {
    try {
        const { adminContactNumber, adminPassword } = req.body;

        const user = await pool.query(
            "SELECT * FROM adminTable WHERE admincontactnumber = $1 OR adminemailaddress = $1",
            [adminContactNumber]
        );

        console.log(user.rows);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const matched = await bcrypt.compare(
            adminPassword,
            user.rows[0].adminpassword
        );
        console.log(adminPassword, user.rows[0].adminpassword);
        if (!matched) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

//register
app.post("/customer/register", async (req, res) => {
    try {
        const {
            customerID,
            customerFirstName,
            customerLastName,
            customerEmailAdress,
            customerPassword,
            customerContactNumber,
            userRoleID,
        } = req.body;

        console.log(req.body);

        // Check if user exists (if email is already registered)
        const user = await pool.query(
            "SELECT * FROM customerTable WHERE customerEmailAdress = $1 OR customerContactNumber = $2",
            [customerEmailAdress, customerContactNumber]
        );

        if (user.rows.length > 0) {
            return res.status(401).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(customerPassword, 10);

        const newUser = await pool.query(
            "INSERT INTO customerTable (customerID, customerFirstName, customerLastName, customerEmailAdress, customerPassword, customerContactNumber, userRoleID) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [
                customerID,
                customerFirstName,
                customerLastName,
                customerEmailAdress,
                hashedPassword, // Use the hashed password
                customerContactNumber,
                userRoleID,
            ]
        );

        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/customer", async (req, res) => {
    try {
        const allCustomer = await pool.query("SELECT * FROM customerTable");
        res.json(allCustomer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get customer by id
app.get("/customer/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allCustomer = await pool.query(
            "SELECT * FROM customerTable WHERE customerID = $1",
            [id]
        );
        res.json(allCustomer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//customer search by all fields and doest not include password and userRoleID and not case sensitive
app.get("/customer/search/:search", async (req, res) => {
    try {
        const { search } = req.params;
        const allCustomer = await pool.query(
            "SELECT * FROM customerTable WHERE LOWER(customerFirstName) LIKE LOWER($1) OR LOWER(customerLastName) LIKE LOWER($1) OR LOWER(customerEmailAdress) LIKE LOWER($1) OR LOWER(customerContactNumber) LIKE LOWER($1)",
            ["%" + search + "%"]
        );
        res.json(allCustomer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//saerch food by name and description and id
app.get("/food/search/:search", async (req, res) => {
    try {
        const { search } = req.params;
        const allFood = await pool.query(
            "SELECT * FROM foodMenuTable WHERE LOWER(foodMenuName) LIKE LOWER($1) OR LOWER(foodMenuDescription) LIKE LOWER($1) OR LOWER(foodMenuID) LIKE LOWER($1)",
            ["%" + search + "%"]
        );
        res.json(allFood.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.patch("/food/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            foodMenuName,
            foodMenuDescription,
            foodMenuCategory,
            foodMenuImage,
        } = req.body;
        const updateFood = await pool.query(
            "UPDATE foodMenuTable SET foodMenuName = $1, foodMenuDescription = $2, foodMenuCategory = $3, foodMenuImage = $4 WHERE foodMenuID = $5",
            [
                foodMenuName,
                foodMenuDescription,
                foodMenuCategory,
                foodMenuImage,
                id,
            ]
        );
        res.json("Food was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/branch", async (req, res) => {
    try {
        const allBranch = await pool.query("SELECT * FROM branchTable");
        res.json(allBranch.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/rider/add", async (req, res) => {
    //     -- Create deliveryPersonTable
    // CREATE TABLE deliveryPersonTable (
    //     deliveryPersonID VARCHAR(20) PRIMARY KEY,
    //     deliveryPersonFirstName VARCHAR(255),
    //     deliveryPersonLastName VARCHAR(255),
    //     deliveryPersonEmailAdress VARCHAR(255),
    //     deliveryPersonPassword VARCHAR(255),
    //     deliveryPersonContactNumber VARCHAR(255),
    //     userRoleID VARCHAR(20) REFERENCES userRoleTable(userRoleID),
    //     branchID VARCHAR(20) REFERENCES branchTable(branchID) -- Linking delivery person to a specific branch
    // );
    try {
        const {
            deliverypersonid,
            deliverypersonfirstname,
            deliverypersonlastname,
            deliverypersonemailaddress,
            deliverypersonpassword,
            deliverypersoncontactnumber,
            userroleid,
            branchid,
        } = req.body;

        console.log(req.body);

        const hashedPassword = await bcrypt.hash(deliverypersonpassword, 10);
        console.log(hashedPassword);

        const newRider = await pool.query(
            "INSERT INTO deliveryPersonTable (deliveryPersonID, deliveryPersonFirstName, deliveryPersonLastName, deliveryPersonEmailAdress, deliveryPersonPassword, deliveryPersonContactNumber, userRoleID, branchID) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [
                deliverypersonid,
                deliverypersonfirstname,
                deliverypersonlastname,
                deliverypersonemailaddress,
                hashedPassword,
                deliverypersoncontactnumber,
                userroleid,
                branchid,
            ]
        );

        res.json(newRider.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/rider", async (req, res) => {
    try {
        const allRider = await pool.query("SELECT * FROM deliveryPersonTable");
        res.json(allRider.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/order/add", async (req, res) => {
    try {
        const {
            customerorderid,
            customerid,
            customeraddressid,
            customerorderdate,
            customerorderstatus,
            customerordertotalprice,
            customerorderpaymentmethod,
            customerorderpaymentstatus,
            deliverypersonid,
        } = req.body;

        // Add code to insert the order into your database here
        const newOrder = await pool.query(
            "INSERT INTO customerOrderTable (customerOrderID, customerID, customerAddressID, customerOrderDate, customerOrderStatus, customerOrderTotalPrice, customerOrderPaymentMethod, customerOrderPaymentStatus, deliveryPersonID) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [
                customerorderid,
                customerid,
                customeraddressid,
                customerorderdate,
                customerorderstatus,
                customerordertotalprice,
                customerorderpaymentmethod,
                customerorderpaymentstatus,
                deliverypersonid,
            ]
        );

        // Assuming successful insertion
        res.json({ message: "Order submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/order", async (req, res) => {
    try {
        const allOrder = await pool.query("SELECT * FROM customerOrderTable");
        res.json(allOrder.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/order/item/add", async (req, res) => {
    try {
        const {
            customerorderitemid,
            customerorderid,
            foodmenuid,
            foodmenupriceid,
            customerorderitemquantity,
            customerorderitemtotalprice,
        } = req.body;

        // Add code to insert the order item into your database here
        const newOrderItem = await pool.query(
            "INSERT INTO customerOrderItemTable (customerOrderItemID, customerOrderID, foodMenuID, foodMenuPriceID, customerOrderItemQuantity, customerOrderItemTotalPrice) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [
                customerorderitemid,
                customerorderid,
                foodmenuid,
                foodmenupriceid,
                customerorderitemquantity,
                customerorderitemtotalprice,
            ]
        );

        res.json(newOrderItem.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//remove cart item by customer
app.delete("/customer/cart/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCart = await pool.query(
            "DELETE FROM cartTable WHERE customerID = $1",
            [id]
        );
        res.json("Cart was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

//encrypt password
app.get("/customer/encrypt/", async (req, res) => {
    try {
        const password = [
            {
                id: "A001",
                password: "password123",
            },
            {
                id: "A002",
                password: "password234",
            },
            {
                id: "A003",
                password: "password345",
            },
            {
                id: "A004",
                password: "password456",
            },
            {
                id: "A005",
                password: "password578",
            },
        ];

        for (let i = 0; i < password.length; i++) {
            const hashedPassword = await bcrypt.hash(password[i].password, 10);
            const updatePassword = await pool.query(
                "UPDATE adminTable SET adminPassword = $1 WHERE adminID = $2",
                [hashedPassword, password[i].id]
            );
        }

        res.json("Password was encrypted!");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(7722, () => {
    console.log("Server has started on port 7722");
});
