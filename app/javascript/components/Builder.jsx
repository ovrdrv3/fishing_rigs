import React, { useState } from 'react';
import BobberForm from './BobberForm';
import SinkerForm from './SinkerForm';

const part_types = ['bobber', 'sinker'];

const Builder = ({ part, errors }) => {
  const [selectedPart, setSelectedPart] = useState(part || part_types[0]);

  return (
    <div className="bg-gray-200 h-screen p-3">
      <label>
        Pick a part to add:
        <select
          className="w-48"
          value={selectedPart}
          onChange={e => setSelectedPart(e.target.value)}
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

      {/* Conditional rendering based on selectedPart */}
      {selectedPart === 'bobber' && <BobberForm errors={errors} />}
      {selectedPart === 'sinker' && <SinkerForm errors={errors} />}
    </div>
  );
}


export default Builder;