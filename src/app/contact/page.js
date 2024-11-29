"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetState, sendMessageRequest } from "../store/contact/contactSlice";
import {
  STATUS_SUCCEEDED,
  STATUS_PENDING,
  STATUS_FAILED,
} from "../constants/status/status";
import AlertComponent from "../component/Alert/alert";
import { ToastContainer } from "react-toastify";
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const dispatch = useDispatch();
  const { status, message, error } = useSelector((state) => state.contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your form submission logic here
    dispatch(sendMessageRequest(formData));

    setFormData({
      name: "",
      email: "",

      message: "",
    });
  };

  useEffect(() => {
    if (status == STATUS_SUCCEEDED || status == STATUS_FAILED) {
      setTimeout(() => {
        dispatch(resetState());
      }, 10000);
    }
  }, [status, dispatch]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            disabled={status === STATUS_PENDING}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {status === STATUS_PENDING ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      {/* Display the alert */}
      {(message || error) && (
        <AlertComponent
          key={message || error} // Ensure the AlertComponent re-renders
          message={message || error}
          type={status === STATUS_SUCCEEDED ? "success" : "error"}
        />
      )}
      {/* ToastContainer for react-toastify */}
      <ToastContainer />
    </div>
  );
}
