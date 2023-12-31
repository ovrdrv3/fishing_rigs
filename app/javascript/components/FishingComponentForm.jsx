import React, { useState, useRef } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";

const FishingComponentForm = ({ errors, fieldNames, photos, partType }) => {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const errorForField = (fieldName) => {
    return errors && errors[fieldName];
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newPreviewUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setFiles(selectedFiles);
    setPreviewUrls(newPreviewUrls);
  };

  const removeImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviewUrls(newPreviewUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (photos) {
      files.forEach((file) => formData.append("images[]", file));
    }

    const csrfToken = document.querySelector("[name='csrf-token']").content;

    axios
      .post("/fishing_components", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRF-Token": csrfToken,
        },
      })
      .then((response) => {
        setIsSubmittedSuccessfully(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="hidden" name="part" value={partType} />

        {fieldNames.map((fieldName) => (
          <div key={fieldName} className="mb-4 w-96">
            <label className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
              <input
                type="text"
                name={fieldName}
                className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errorForField(fieldName) ? "ring-red-500" : "ring-gray-300"
                } focus:ring-2 focus:ring-inset focus:ring-indigo-600`}
              />
              {errorForField(fieldName) && (
                <p className="text-red-500">{errorForField(fieldName)}</p>
              )}
            </label>
          </div>
        ))}

        {photos && (
          <div className="mb-4">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <button
              onClick={triggerFileInput}
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold dark:text-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-500"
            >
              Add Images
            </button>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {previewUrls.map((url, index) => (
                <li key={index} className="relative">
                  <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="pointer-events-none object-cover group-hover:opacity-75"
                    />
                    <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => removeImage(index)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <XMarkIcon className="h-8 w-8" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmittedSuccessfully}
          className={`rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 ${
            isSubmittedSuccessfully
              ? "bg-green-500"
              : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
          }`}
        >
          {isSubmittedSuccessfully ? "Submitted!" : `Submit ${partType}`}
        </button>
        {isSubmittedSuccessfully && (
          <a
            href="/"
            className="ml-4 rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-black hover:bg-gray-400"
          >
            Home
          </a>
        )}
      </form>
    </div>
  );
};

export default FishingComponentForm;
