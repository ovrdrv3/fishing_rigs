import React, { useState } from "react";
import FishingComponentForm from "./FishingComponentForm";

const part_types = ["bobber", "sinker"];

const Builder = ({ part, errors }) => {
  const [selectedPart, setSelectedPart] = useState(part || part_types[0]);

  return (
    <div className="bg-gray-200 h-screen p-3">
      <label>
        Pick a part to add:
        <select
          className="w-48"
          value={selectedPart}
          onChange={(e) => setSelectedPart(e.target.value)}
        >
          {part_types.map((part_type, index) => (
            <option key={index} value={part_type}>
              {part_type}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
      <p>Your selected part: {selectedPart}</p>

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
    </div>
  );
};

export default Builder;
