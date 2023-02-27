import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../css/additional-styles/email-blast.css";

import Header from "../partials/Header";

import axios from "axios";
import Toast from "../partials/Toast";

function EmailBlast() {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);

  const [isDrop, setIsDrop] = React.useState(false);

  const [file, setFile] = React.useState(null);

  const [base64, setBase64] = React.useState("");

  const [showToast, setShowToast] = useState(false);

  const [message, setMessage] = useState("");

  const [bg, setBg] = useState("");

  const [removeButtonDisabled, setRemoveButtonDisabled] = useState(true);

  // ref
  const inputRef = React.useRef(null);

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onerror = function (error) {
      console.log("hm");
      // console.log('Error: ', error);
    };
    reader.onload = function () {
      cb(reader.result);
    };
  }

  const handleRemoveFile = (e) => {
    e.preventDefault();
    setIsDrop(false);
    setFile("");
    setRemoveButtonDisabled(true);
  };

  function processFile(file) {
    setFile("");

    setIsDrop(true);

    setFile(file);

    setRemoveButtonDisabled(false);

    if (file.name.split(".").pop() === "csv") {
      console.log("csv lewat sini nih", file.name.split(".")[1]);

      getBase64(file, (result) => {
        setBase64(result);
      });
      return true;
    }

    return false;
  }

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();

    e.stopPropagation();

    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const pf = processFile(e.target.files[0]);

      if (pf) {
        setShowToast(false);
        console.log("request api post");
        return;
      }

      setMessage("File is invalid");
      setBg("error");
      setShowToast(true);

      setTimeout(() => {
        setFile("");
        setShowToast(false);
      }, 5000);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const pf = processFile(e.target.files[0]);

      if (pf) {
        setShowToast(false);
        console.log("request api post");
        return;
      }

      setMessage("File is invalid. File must be in Csv Format");
      setBg("error");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = async () => {
    const eb = {
      filename: base64,
    };

    console.log(eb);

    // await axios
    //   .post("localhost:8000", eb)
    //   .then((response) => {
    //     console.log(response);
    //     setFile(null);
    //     setBase64(null);
    //   })
    //   .catch((err) => {
    //     console.log("there was an error", err);
    //   });
    // send axios
    inputRef.current.click();
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Email Blast </h1>
                <h2 className="h3">Tiara Ramadayanti</h2>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form
                  onDragEnter={handleDrag}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="max-w-xl">
                    <label className="flex justify-center w-full h-32 px-0 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                      <span className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span
                          className={
                            dragActive
                              ? "font-medium text-gray-600 drag-active"
                              : "font-medium text-gray-600"
                          }
                        >
                          {isDrop
                            ? file.name
                            : "Drop files to Attach, or browse"}

                          {/* <span className="text-blue-600 underline">browse</span> */}
                        </span>
                      </span>
                      <input
                        type="file"
                        name="file_upload"
                        className="hidden"
                        ref={inputRef}
                        multiple={false}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div className="max-w-sm mt-3 mb-12">
                    <button
                      className={
                        removeButtonDisabled
                          ? "btn text-white bg-red-600 hover:bg-red-700 w-full opacity-50 cursor-not-allowed"
                          : "btn text-white bg-red-600 hover:bg-red-700 w-full"
                      }
                      onClick={handleRemoveFile}
                      disabled={removeButtonDisabled}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        onClick={onButtonClick}
                      >
                        Execute
                      </button>
                    </div>
                  </div>
                  {dragActive && (
                    <div
                      id="drag-file-element"
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    ></div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      {showToast && <Toast message={message} bg={bg} />}
    </div>
  );
}

export default EmailBlast;
