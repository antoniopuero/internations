import _ from 'lodash';

export function isNumber(value, isInteger) {
  let parsedValue = isInteger ? parseInt(value, 10) : parseFloat(value);
  return _.isNumber(parsedValue)
    && !_.isNaN(parsedValue)
    && (_.isString(value) && value.length === parsedValue.toString().length || _.isNumber(value));
}

export function isEmail(value) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
}

export function isUrlValid(url) {
  return url.match(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/);
}

export function isPhone(phoneNumber) {
  return phoneNumber.match(/^\+?[0-9]*?\(?([0-9]+)\)?([ -]?)([0-9]+)(\2[0-9]+)+$/);
}

export function isNotEmpty(object) {
  return !_.isEmpty(object) && _.some(_.omit(object, '$isPristine'), (value) => !_.isNull(value));
}

export function newPassword(value) {
  return value && value.length >= 8 && /\d/.test(value) && /[A-Z]/.test(value);
}

const standardTypes = {
  string(value) {
    return _.isString(value);
  },
  number(value) {
    return isNumber(value);
  },
  integer(value) {
    return isNumber(value, true);
  },
  bool(value) {
    return _.isBoolean(value);
  },
  date(value) {
    return !_.isNaN(Date.parse(value));
  },
  email(value) {
    return isEmail(value);
  },
  password(value) {
    return newPassword(value);
  },
  url(value) {
    return isUrlValid(value);
  },
  phone(value) {
    return isPhone(value);
  }
};

const standardErrors = {
  required() {
    return 'The field is required';
  },
  type(type) {
    switch (type) {
      case 'string':
      case 'number':
      case 'integer':
      case 'date':
      case 'bool':
        return `The field must have a ${type} type`;
      case 'email':
      case 'password':
      case 'url':
      case 'phone':
        return `The ${type} is not valid`;
      default:
        return 'You should provide a valid type value';

    }
  },
  minLength(minLength) {
    return `The min length for this field is ${minLength}`;
  },
  maxLength(maxLength) {
    return `The max length for this field is ${maxLength}`;
  },
  exactLength(exactLength) {
    return `The exact length for this field is ${exactLength}`;
  },
  lt(lt) {
    return `The value should be less than ${lt}`;
  },
  lte(lte) {
    return `The value should be less than or equal to ${lte}`;
  },
  gt(gt) {
    return `The value should be greater than ${gt}`;
  },
  gte(gte) {
    return `The value should be greater than or equal to ${gte}`;
  }
};

const standardValidators = {
  required(required) {
    return (value) => required && !_.isUndefined(value) && _.trim(value) !== '' && !_.isNull(value);
  },
  type(type) {
    return (value) => standardTypes[type] ? standardTypes[type](value) : false;
  },
  minLength(minLength) {
    return (value) => !value || value.length >= minLength;
  },
  maxLength(maxLength) {
    return (value) => !value || value.length <= maxLength;
  },
  exactLength(exactLength) {
    return (value) => !value || value.length === exactLength;
  },
  lt(lt) {
    return (value) => value < lt;
  },
  lte(lte) {
    return (value) => value <= lte;
  },
  gt(gt) {
    return (value) => value > gt;
  },
  gte(gte) {
    return (value) => value >= gte;
  }
};

function generateValidatorsFromRules(rules) {
  const validators = _.compact(_.map(rules, (rule, name) => {
    const value = _.isObject(rule) ? rule.value : rule;
    const validationMessage = rule.validationMessage;
    if (standardValidators[name]) {
      return {
        validate: standardValidators[name](value),
        validationMessage: validationMessage ? validationMessage : standardErrors[name](value)
      };
    } else if (name === 'custom' && _.isFunction(value)) {
      return {
        validate: value,
        validationMessage: validationMessage ? validationMessage : 'The field is not valid'
      };
    }
  }));

  return (value) => {
    const failedValidator =  _.find(validators, (validator) => {
      return !validator.validate(value);
    });

    return failedValidator && failedValidator.validationMessage;
  };
}

export function validateField(fieldName, fieldValue, rules) {
  const validators = generateValidatorsFromRules(rules);
  const validationResult = validators(fieldValue);
  if (validationResult) {
    return {[fieldName]: validationResult};
  } else {
    return {[fieldName]: null};
  }
}

export function validateModel(allFields, excludeFields, model) {
  return _.chain(allFields)
    .filter((field) => !excludeFields || _.indexOf(excludeFields, field.name) < 0)
    .reduce((errorFields, field) => {
      return _.assign(errorFields, validateField(field.name, model[field.name], field.rules));
    }, {})
    .value();
}


export default generateValidatorsFromRules;
