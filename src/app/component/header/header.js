"use client";
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-gray-400">
            MyLogo
          </a>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link
            className="block text-white hover:text-gray-400 transition duration-300 ease-in-out"
            href="/"
          >
            Home
          </Link>
          <Link
            className="block text-white hover:text-gray-400 transition duration-300 ease-in-out"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="block text-white hover:text-gray-400 transition duration-300 ease-in-out"
            href="/contact-list"
          >
            Contact List
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-gray-400 hover:text-white focus:outline-none"
          onClick={() => {
            const menu = document.getElementById("mobileMenu");
            menu.classList.toggle("hidden");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobileMenu"
        className="md:hidden hidden bg-gray-700 space-y-2 px-6 py-4"
      >
        <a
          href="#"
          className="block text-white hover:text-gray-400 transition duration-300 ease-in-out"
        >
          Home
        </a>
        <a
          href="#about"
          className="block text-white hover:text-gray-400 transition duration-300 ease-in-out"
        >
          About
        </a>
        <a
          href="#services"
          className="block text-white hover:text-gray-400 transition duration-300 ease-in-out"
        >
          Services
        </a>
        <a
          href="#contact"
          className="block text-white hover:text-gray-400 transition duration-300 ease-in-out"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
