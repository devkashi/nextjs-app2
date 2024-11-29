"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import {
  fetchMessagesRequest,
  deleteMessageRequest,
  resetState2,
} from "../store/contact/contactSlice";
import {
  STATUS_SUCCEEDED,
  STATUS_PENDING,
  STATUS_FAILED,
} from "../constants/status/status";

import EditModal from "../component/modal/editContact";
import DeleteModal from "../component/modal/deleteConfirm";
import AlertComponent from "../component/Alert/alert";
import { ToastContainer } from "react-toastify";
export default function ContactList() {
  // to show the list
  const { status, message, error, data } = useSelector(
    (state) => state.contact
  );

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [activeId, setActiveId] = useState(false);
  const [oldFormData, setOldFormData] = useState({});

  // to show the list api is called
  useEffect(() => {
    dispatch(fetchMessagesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (status === STATUS_SUCCEEDED) {
      dispatch(resetState2());
    }
  }, [dispatch, status]);

  // delete
  const handleDelete = (id) => {
    dispatch(deleteMessageRequest(id));
    setOpen(false);
  };
  const handleDeleteModal = (id) => {
    setActiveId(id);
    setOpen(true);
  };

  // edit
  const handleEditModal = (data) => {
    setOldFormData(data);
    setOpen2(true);
  };
  const overrideStyles = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border rounded-lg shadow-md bg-gray-50">
      <h1 className="text-xl font-bold mb-4 text-center text-gray-700">
        Messages
      </h1>
      <ul className="space-y-4">
        {data.map((single) => (
          <li
            key={single.id}
            className="p-4 flex justify-between items-center bg-white rounded-lg shadow-sm border"
          >
            <div>
              <p className="text-gray-700">{single.name}</p>
              <p className="text-gray-700">{single.email}</p>
              <p className="text-gray-700">{single.message}</p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleEditModal(single)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteModal(single.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        id={activeId}
        cancelButtonName="Cancel"
        confirmButtonName="Delete"
        title="Delete Message"
        contents="Are you sure you want to delete this message?"
        handleDelete={handleDelete}
      />
      <EditModal
        oldFormData={oldFormData}
        open={open2}
        setOpen={setOpen2}
        id={activeId}
        cancelButtonName="Cancel"
        confirmButtonName="Update"
        title="Edit the contact form"
        content="Are you sure you want to update this contact form data ?"
      />
      {status === STATUS_PENDING && (
        <div className="loader-container">
          <ClipLoader
            color={"#000000"}
            loading={status === STATUS_PENDING}
            cssOverride={overrideStyles}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
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
