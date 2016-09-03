import React, { PropTypes } from 'react';
import _ from 'lodash';
import generateValidatorsFromRules from './validators';
import MaterialDecorators from './MaterialDecorators';

function onChangeHandler(successAction, errorAction, isPristine, field, value, validators) {
  if (value && field.pattern && !field.pattern.test(value)) {
    return false;
  }
  const validationMessage = validators(value);
  if (errorAction && !isPristine) {
    if (!validationMessage) {
      errorAction({ [field.name]: null });
    } else {
      errorAction({ [field.name]: validationMessage });
    }
  }
  successAction({ [field.name]: _.trimStart(value) });
}

function generateFormGroups({fields, formData, onChange, formErrors, onError, excludeFields}) {
  return _.chain(fields)

    .filter((field) => !excludeFields || _.indexOf(excludeFields, field.name) < 0)

    .map((field, i) => {
      const isRequired = field.rules && field.rules.required && (field.rules.required === true || field.rules.required.value === true);
      const validators = generateValidatorsFromRules(field.rules);

      const defaultProps = {
        key: i,
        field,
        formData,
        formErrors,
        validators,
        onChangeHandler: onChangeHandler.bind(null, onChange, onError, formErrors.$isPristine),
        isRequired
      };

      return (
        <MaterialDecorators
            {...defaultProps}
        />
      );
    })
    .value();
}

function FormInputs(props) {
  return (
    <div>
      {generateFormGroups(props)}
    </div>);
}

FormInputs.propTypes = {
  onChange: PropTypes.func,
  onError: PropTypes.func,
  excludeFields: PropTypes.array,
  fields: PropTypes.array.isRequired,
  formData: PropTypes.object.isRequired,
  formErrors: PropTypes.object
};

export default FormInputs;
