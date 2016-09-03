import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import {red600, green600} from 'material-ui/styles/colors';
import FormInputs from './FormInputs';
import * as constants from '../../constants';
import {validateModel, isNotEmpty} from './validators';


function Form (props) {

  return (
    <form
      style={{
        marginTop: '40px'
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const errors = validateModel(props.fields, props.excludeFields, props.formData);
        if (isNotEmpty(errors)) {
          props.onError(errors);
        } else {
          props.onSubmit && props.onSubmit(e);
        }
      }}
    >

        <FormInputs
          fields={props.fields}
          formData={props.formData}
          formErrors={props.formErrors}
          onChange={props.onChange}
          onError={props.onError}
          excludeFields={props.excludeFields}
        />

      {
        (props.formStatus.value === constants.LOADED || props.formStatus.value === constants.FAILED) &&
            <div style={{
              width: '300px',
              padding: '20px 10px',
              margin: '20px auto',
              background: props.formStatus.value === constants.LOADED ? green600 : red600,
              color: 'white',
              display: 'block',
              textAlign: 'center'
            }}>
              {props.formStatus.message}
            </div>
      }

      <div style={{
        width: '300px',
        margin: '20px auto'
      }}>
        {props.formStatus.value === constants.LOADED && props.navigateTo ?
          <RaisedButton
            containerElement={<Link to={props.navigateTo}/>}
            type="submit"
            label={props.navigateToText || 'View'}
          />
          :
          <RaisedButton
            primary
            /*loading={props.formStatus.value === constants.LOADING}*/
            disabled={isNotEmpty(props.formErrors)}
            type="submit"
            label={props.submitText || 'Send'}
          />
        }
      </div>

    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  excludeFields: PropTypes.array,
  fields: PropTypes.array.isRequired,
  formData: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  formStatus: PropTypes.object.isRequired
};

export default Form;
