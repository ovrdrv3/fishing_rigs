import React, { useState, useEffect } from "react";
import axios from "axios";

const RigBuilder = ({ part, errors }) => {
  const [fishingComponents, setFishingComponents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComponentIds, setSelectedComponentIds] = useState([]);
  const [rigName, setRigName] = useState("");
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newRigId, setNewRigId] = useState(null);

  useEffect(() => {
    const fetchFishingComponents = async () => {
      try {
        const response = await axios.get("/fishing_components_json");
        setFishingComponents(response.data);
      } catch (error) {
        console.error("Error fetching fishing components:", error);
      }
    };

    fetchFishingComponents();
  }, []);

  const handleInputChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleRigNameChange = (event) => {
    setRigName(event.target.value);
  };

  const filteredComponents =
    searchTerm.length > 0
      ? fishingComponents.filter((component) =>
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
    console.log("Submitting rig...");

    try {
      const postData = {
        rig: {
          name: rigName,
          fishing_component_ids: selectedComponentIds,
        },
      };
      const response = await axios.post("/rigs", postData, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      setSubmitSuccess(true);
      setNewRigId(response.data.id); // Assuming the response contains the new rig ID
    } catch (error) {
      console.error("Error creating rig:", error);
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
              {component.part_type}
            </button>
          ))}
        </div>

        <div className="m-5 p-5 bg-blue-800 rounded">
          {selectedComponents.map((component, index) => (
            <div
              key={index}
              className="m-1 p-1 bg-gray-200 text-gray-800 rounded"
            >
              {component.part_type}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className={`m-2 p-2 text-white rounded block w-full ${
            submitSuccess ? "bg-green-500" : "bg-blue-500"
          }`}
          disabled={submitSuccess}
        >
          {submitSuccess ? "Rig successfully submitted." : "Create Rig"}
        </button>

        {submitSuccess && newRigId && (
          <a
            href={`/rigs/${newRigId}`}
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
