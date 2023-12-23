import React, { useState } from 'react';

export default function SinkerForm({ errors }) {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');

  const errorForField = (fieldName) => {
    return errors && errors[fieldName];
  };

  return (
    <div>
      <form action="/fishing_components" method="post">
        <input type="hidden" name="part" value="sinker" />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errorForField('name') && (
            <p className="text-red-500">{errorForField('name')}</p>
          )}
        </label>
        <br />
        <label>
          Weight:
          <input
            type="text"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          {errorForField('weight') && (
            <p className="text-red-500">{errorForField('weight')}</p>
          )}
        </label>
        <br />
        <input
          type="submit"
          value="Submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </form>
    </div>
  );
}
