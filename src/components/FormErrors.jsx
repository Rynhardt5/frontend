import React from 'react';

export default function FormErrors({ errors, form }) {
  let renderFormErrors = '';
  if (errors[form]) {
    let key = 0;
    renderFormErrors = errors[form].map((error) => {
      key += 1;
      return (
        <li key={key} className="form-errors__item">
          {error.msg}
        </li>
      );
    });
  }

  return (
    <div className="form-errors">
      <ul className="form-errors__list">{renderFormErrors}</ul>
    </div>
  );
}
