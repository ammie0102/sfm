import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import heroBG from "../assets/img/hero-bg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import chickenImg from "../assets/img/chicken.jpg";
import { Link } from "react-router-dom";

const Home = () => {
    const cards = [
        {
            title: "Chicken Deal",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            img: chickenImg,
        },
        {
            title: "Pork Deal",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            img: chickenImg,
        },
    ];
    return (
        <>
            <Navbar />
            <section
                className="hero-section h-[80vh]"
                style={{
                    backgroundImage: `url(${heroBG})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-full">
                    <div className="flex flex-col justify-center items-center h-full">
                        <h1 className="sm:text-6xl text-white font-bold text-stroke text-5xl">
                            Welcome to
                        </h1>
                        <h1 className="sm:text-6xl text-5xl text-yellow-500 font-black text-stroke text-center mb-3">
                            Santa Fe Taguktukan
                        </h1>
                        <p className="text-gray-900 sm:text-2xl text-lg font-medium mb-3 text-start">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </p>
                        <div className="flex space-x-2">
                            <button className="bg-red-600 text-white rounded-md px-3 py-2 text-base font-medium border border-red-600">
                                About Us
                            </button>
                            <Link
                                to="/menu"
                                className="hover:bg-red-600 text-red-600 hover:text-white rounded-md px-4 py-2 text-base font-medium border border-red-600 transition duration-100 ease-in-out"
                            >
                                Our Menu <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="offer-section py-5">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center items-start">
                        <h1
                            className="text-3xl font-black text-yellow-500 tracking-wide mb-3 uppercase"
                            style={{
                                WebkitTextStroke: "1px black",
                            }}
                        >
                            Our Offers
                        </h1>
                        <hr className="w-32 border-2 border-red-500 mb-5" />
                        <p className="text-gray-900 font-medium">
                            Indulge in our exquisite selection of top-selling
                            chicken and pork delicacies.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-5">
                            {cards.map((card, index) => (
                                <div
                                    className="offer-card sm:h-[50vh] relative overflow-hidden shadow-md h-[15rem] w-full"
                                    key={index}
                                >
                                    <div className="rounded-md shadow-md p-5 relative h-full">
                                        <img
                                            src={card.img}
                                            alt=""
                                            className="w-full absolute top-0 left-0"
                                            style={{
                                                height: "100%",
                                                objectFit: "cover",
                                                zIndex: -1,
                                            }}
                                        />
                                        <div className="content">
                                            <h1 className="sm:text-5xl font-black text-white mb-3 text-4xl">
                                                {card.title}
                                            </h1>
                                            <p className="text-white">
                                                {card.description}
                                            </p>
                                            <button className="hover:bg-white bg-none text-white rounded-md px-3 py-2 text-base font-medium border border-white mt-3 transition duration-100 ease-in-out hover:text-black">
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
