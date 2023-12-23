import React from 'react';

const BobberForm = ({ errors }) => {
  const errorForField = (fieldName) => {
    return errors && errors[fieldName];
  };

  return (
    <div>
      <form action="/fishing_components" method="post">
        <input type="hidden" name="part" value="bobber" />
        <label>
          Name:
          <input type="text" name="name" />
          {errorForField('name') && (
            <p className="text-red-500">{errorForField('name')}</p>
          )}
        </label>
        <br />
        <label>
          Color:
          <input type="text" name="color" />
          {errorForField('color') && (
            <p className="text-red-500">{errorForField('color')}</p>
          )}
        </label>
        <br />
        <button
          type="submit"
          value="Submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit part
        </button>
      </form>
    </div>
  );
};

export default BobberForm;
