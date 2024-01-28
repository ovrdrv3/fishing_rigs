import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const DraggableComponent = styled.div.attrs({
  className: "m-4 p-4 bg-gray-100 rounded cursor-grab",
})`
  border: 2px solid transparent; /* Invisible border that will highlight on drag over */
  transition: background-color 0.2s, border-color 0.2s;

  &:hover {
    background-color: #e2e8f0; /* Tailwind gray-200 */
  }

  &.drag-over {
    background-color: #bee3f8; /* Tailwind blue-200 */
    border-color: #90cdf4; /* Tailwind blue-300 */
  }
`;

const RigBuilder = ({ rig = null, errors }) => {
  const isEditMode = rig !== null;
  const initialComponentIds = isEditMode ? rig.fishing_component_ids : [];

  const [fishingComponents, setFishingComponents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComponentIds, setSelectedComponentIds] =
    useState(initialComponentIds);
  const [rigName, setRigName] = useState(isEditMode ? rig.name : "");
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [rigId, setrigId] = useState(isEditMode ? rig.id : null);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const onDragStart = (event, index) => {
    event.dataTransfer.setData("draggedItemIndex", index);
  };

  const onDrop = (event, dropIndex) => {
    event.preventDefault();
    const draggedItemIndex = event.dataTransfer.getData("draggedItemIndex");
    if (draggedItemIndex === undefined) return;

    const reorderedComponents = [...selectedComponents];
    const [reorderedItem] = reorderedComponents.splice(draggedItemIndex, 1);
    reorderedComponents.splice(dropIndex, 0, reorderedItem);

    setSelectedComponents(reorderedComponents);

    const reorderedIds = reorderedComponents.map((component) => component.id);
    setSelectedComponentIds(reorderedIds);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (index) => {
    setDraggingIndex(index);
  };

  const handleDragLeave = () => {
    setDraggingIndex(null);
  };

  useEffect(() => {
    const fetchFishingComponents = async () => {
      try {
        const response = await axios.get("/fishing_components_json");
        setFishingComponents(response.data);

        if (isEditMode) {
          const componentsToEdit = initialComponentIds.map((id) =>
            response.data.find((component) => component.id === id)
          );
          setSelectedComponents(componentsToEdit);
        }
      } catch (error) {
        console.error("Error fetching fishing components:", error);
      }
    };

    fetchFishingComponents();
  }, [isEditMode, initialComponentIds]);

  const handleInputChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleRigNameChange = (event) => {
    setRigName(event.target.value);
  };

  const filteredComponents =
    searchTerm.length > 0
      ? fishingComponents.filter(
          (component) =>
            component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.part_type.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const addComponent = (component) => {
    setSelectedComponentIds([...selectedComponentIds, component.id]);
    setSelectedComponents([...selectedComponents, component]);
  };

  const csrfToken = document.querySelector("[name='csrf-token']").content;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      rig: {
        name: rigName,
        fishing_component_ids: selectedComponentIds,
      },
    };

    try {
      let response;
      if (isEditMode) {
        response = await axios.put(`/rigs/${rig.id}`, postData, {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        });
      } else {
        console.log("Creating rig...");
        response = await axios.post("/rigs", postData, {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        });
      }
      setSubmitSuccess(true);
      setrigId(response.data.id);
    } catch (error) {
      console.error("Error saving rig:", error);
      setSubmitSuccess(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={rigName}
          onChange={handleRigNameChange}
          placeholder="Enter Rig Name"
          className="m-2 p-2 border-2 border-gray-300 rounded block w-full"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search by part name"
          className="m-2 p-2 border-2 border-gray-300 rounded block w-full"
        />
        <div>
          {filteredComponents.map((component, index) => (
            <button
              type="button"
              key={index}
              onClick={() => addComponent(component)}
              className="m-5 p-5 bg-gray-200 text-gray-800 dark:text-white dark:bg-gray-800 rounded block"
            >
              {component.name}
            </button>
          ))}
        </div>

        {selectedComponents.map((component, index) => (
          <DraggableComponent
            key={index}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()} // Prevent default to allow drop
            onDrop={(e) => onDrop(e, index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragLeave={handleDragLeave}
            className={draggingIndex === index ? "drag-over" : ""}
          >
            <div className="flex items-center">
              {component.images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image}
                  alt={`component ${index} - image ${imageIndex}`}
                  className="h-10 w-10 rounded-lg mr-2"
                />
              ))}
              {component.name}
            </div>
          </DraggableComponent>
        ))}

        <button
          type="submit"
          className={`m-2 p-2 text-white rounded block w-full ${
            submitSuccess ? "bg-green-500" : "bg-blue-500"
          }`}
          disabled={submitSuccess}
        >
          {submitSuccess
            ? isEditMode
              ? "Rig successfully updated."
              : "Rig successfully submitted."
            : isEditMode
            ? "Update Rig"
            : "Create Rig"}
        </button>
        {submitSuccess && rigId && (
          <a
            href={`/rigs/${rigId}`}
            className="m-2 p-2 bg-gray-500 text-white rounded block w-full text-center"
          >
            Go to New Rig
          </a>
        )}
      </form>
    </div>
  );
};

export default RigBuilder;
