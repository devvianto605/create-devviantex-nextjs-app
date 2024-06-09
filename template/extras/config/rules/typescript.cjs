const statements = ['if', 'for', 'while', 'do', 'switch', 'try', 'class', 'function'];
const statementsVariables = ['const', 'let', 'var'];
const startsWithUnderScore = '^_';

module.exports = {
  // * Turn off base lint
  'default-param-last': 'off',
  'dot-notation': 'off',
  'no-loop-func': 'off',
  'no-magic-numbers': 'off',
  'no-use-before-define': 'off',
  'no-return-await': 'off',
  'no-array-constructor': 'off',
  'no-shadow': 'off',
  'no-unused-vars': 'off',

  // * Typescript
  '@typescript-eslint/no-extra-semi': 'off',
  '@typescript-eslint/dot-notation': 'error',
  '@typescript-eslint/no-loop-func': 'error',
  '@typescript-eslint/no-use-before-define': 'off',
  '@typescript-eslint/no-array-constructor': 'error',
  '@typescript-eslint/no-shadow': ['error'],
  '@typescript-eslint/default-param-last': 'error',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: startsWithUnderScore,
      varsIgnorePattern: startsWithUnderScore,
      caughtErrorsIgnorePattern: startsWithUnderScore,
    },
  ],
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/adjacent-overload-signatures': 'error',
  '@typescript-eslint/ban-types': 'error',
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/consistent-indexed-object-style': 'error',
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  '@typescript-eslint/method-signature-style': 'error',
  '@typescript-eslint/no-empty-interface': 'error',
  '@typescript-eslint/no-extra-non-null-assertion': 'error',
  '@typescript-eslint/no-duplicate-type-constituents': 'error',
  '@typescript-eslint/no-inferrable-types': 'error',
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
  '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/no-unnecessary-qualifier': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-require-imports': 'error',
  '@typescript-eslint/no-for-in-array': 'error',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/prefer-includes': 'error',
  '@typescript-eslint/no-unnecessary-type-constraint': 'error',
  '@typescript-eslint/no-unsafe-enum-comparison': 'error',
  '@typescript-eslint/prefer-function-type': 'error',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/prefer-enum-initializers': 'error',
  '@typescript-eslint/no-useless-empty-export': 'error',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
  '@typescript-eslint/member-ordering': ['error', { default: ['signature', 'method', 'constructor', 'field'] }],
  '@typescript-eslint/padding-line-between-statements': [
    'error',
    // * always add a blank line before return
    { blankLine: 'always', prev: '*', next: 'return' },
    // * always add a blank line before variable statements
    { blankLine: 'always', prev: statementsVariables, next: statements },
    // * always add a blank line after variable statements
    { blankLine: 'always', prev: statements, next: statementsVariables },
    // * always add a blank line after statements
    { blankLine: 'always', prev: statements, next: '*' },
    // * always add a blank line before statements
    { blankLine: 'always', prev: '*', next: statements },
  ],
};
