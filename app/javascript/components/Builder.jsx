import React, { useState } from "react";
import FishingComponentForm from "./FishingComponentForm";

const part_types = ["bobber", "sinker", "hook"];

const Builder = ({ part, errors }) => {
  const [selectedPart, setSelectedPart] = useState(part || part_types[0]);

  return (
    <div className="h-screen m-5 p-5 bg-gray-200 dark:bg-gray-800 rounded">
      <label className="dark:text-white pr-3">Part:</label>
      <select
        className="w-48 rounded"
        value={selectedPart}
        onChange={(e) => setSelectedPart(e.target.value)}
      >
        {part_types.map((part_type, index) => (
          <option key={index} value={part_type}>
            {part_type}
          </option>
        ))}
      </select>
      <br />
      <br />

      {selectedPart === "bobber" && (
        <FishingComponentForm
          errors={errors}
          fieldNames={["name", "color"]}
          photos={true}
          partType="bobber"
        />
      )}
      {selectedPart === "sinker" && (
        <FishingComponentForm
          errors={errors}
          fieldNames={["name", "weight"]}
          photos={true}
          partType="sinker"
        />
      )}
      {selectedPart === "hook" && (
        <FishingComponentForm
          errors={errors}
          fieldNames={["name", "size"]}
          photos={true}
          partType="hook"
        />
      )}
    </div>
  );
};

export default Builder;
