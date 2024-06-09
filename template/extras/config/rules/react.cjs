const booleanError =
  "It is better if your prop ({{ propName }}) matches this pattern: ({{ pattern }})";

module.exports = {
  // * Naming Conventions
  "react/jsx-handler-names": [
    "error",
    { eventHandlerPrefix: "handle", eventHandlerPropPrefix: "on" },
  ],

  // * Style and Formatting
  "react/self-closing-comp": ["error", { component: true, html: true }],
  "react/jsx-max-props-per-line": ["error", { maximum: 3, when: "multiline" }],
  "react/jsx-max-depth": ["error", { max: 10 }],
  "react/jsx-sort-props": [
    "error",
    { callbacksLast: true, shorthandFirst: true, reservedFirst: true },
  ],

  // * Best Practices
  "react/jsx-no-duplicate-props": ["warn", { ignoreCase: true }],
  "react/boolean-prop-naming": [
    "error",
    { rule: "^(is|has)[A-Z]([A-Za-z0-9]?)+", message: booleanError },
  ],
  "react/no-unused-prop-types": "warn",
  "react/no-access-state-in-setstate": "error",
  "react/destructuring-assignment": "off",
  "react/button-has-type": "error",

  // * Exceptions
  "react/no-children-prop": "off",
  "react/react-in-jsx-scope": "off",
  "react/jsx-props-no-spreading": "off",
};
