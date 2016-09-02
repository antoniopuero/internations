

module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },

  "parser": "babel-eslint",
  "plugins": ["react"],

  "settings": {
    "react": {
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "15.0" // React version, default to the latest React stable release
    }
  },

  "ecmaFeatures": {
    "arrowFunctions": true,
    "binaryLiterals": true,
    "blockBindings": true,
    "classes": true,
    "defaultParams": true,
    "destructuring": true,
    "forOf": true,
    "generators": true,
    "modules": true,
    "objectLiteralComputedProperties": true,
    "objectLiteralDuplicateProperties": true,
    "objectLiteralShorthandMethods": true,
    "objectLiteralShorthandProperties": true,
    "octalLiterals": true,
    "regexUFlag": true,
    "regexYFlag": true,
    "spread": true,
    "superInFunctions": true,
    "templateStrings": true,
    "unicodeCodePointEscapes": true,
    "globalReturn": true,
    "jsx": true
  },

  "rules": {
    "strict": 0,
    "semi": [2, "always"],
    "no-undef": 1,
    "quotes": [2, "single"],
    "no-underscore-dangle": 0,
    "no-unused-vars": 1,
    "no-unused-expressions": 0,
    "new-cap": 0,
    "yoda": 0,
    "no-empty": 0,
    "no-extra-boolean-cast": 0,
    "react/no-multi-comp": 0,
    "react/prefer-es6-class": 2,
    "react/prefer-stateless-function": 0,
    "jsx-quotes": 2,
    "react/jsx-curly-spacing": 2,
    "react/no-string-refs": 2,
    "react/wrap-multilines": 2,
    "react/self-closing-comp": 2,
    "react/jsx-closing-bracket-location": 2,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/jsx-boolean-value": 1
  }
};
