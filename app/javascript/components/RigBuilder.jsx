import React, { useState } from "react";
import axios from "axios";

const RigBuilder = ({ part, errors }) => {
  const [fishingComponents, setFishingComponents] = useState([]);

  const fetchFishingComponents = async () => {
    try {
      const response = await axios.get("/fishing_components_json");
      setFishingComponents(response.data);
    } catch (error) {
      console.error("Error fetching fishing components:", error);
      // Handle errors here
    }
  };

  return (
    <div>
      {fishingComponents.length === 0 && (
        <div className="flex justify-center">
          <button
            onClick={fetchFishingComponents}
            className="my-5 p-2 bg-green-800 text-white rounded"
          >
            Load Fishing Components
          </button>
        </div>
      )}

      {fishingComponents.map((fishingComponent, index) => (
        <div
          key={index}
          className="m-5 p-5 bg-gray-200 text-gray-800 dark:text-white dark:bg-gray-800 rounded"
        >
          {fishingComponent.part_type}
        </div>
      ))}
    </div>
  );
};

export default RigBuilder;
