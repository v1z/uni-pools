module.exports = {
  plugins: [
    'stylelint-value-no-unknown-custom-properties',
    'stylelint-at-rule-no-children',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-media-use-custom-media',
  ],
  ignoreFiles: ['./src/styles/normalize.css'],
  defaultSeverity: 'error',
  rules: {
    'aditayvm/at-rule-no-children': true,
    'plugin/declaration-block-no-ignored-properties': true,
    'csstools/media-use-custom-media': [
      'known',
      {
        importFrom: ['src/styles/variables.css'],
      },
    ],
    'csstools/value-no-unknown-custom-properties': [
      true,
      {
        importFrom: ['src/styles/variables.css'],
      },
    ],
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'comment-no-empty': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-no-important': true,
    'declaration-property-value-blacklist': {
      '/^margin/': ['initial'],
      '/^padding/': ['initial'],
      'flex-grow': ['initial'],
    },
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'max-nesting-depth': [
      3,
      {
        ignore: ['blockless-at-rules', 'pseudo-classes'],
      },
    ],
    'no-duplicate-selectors': true,
    'no-invalid-double-slash-comments': true,
    'property-blacklist': ['flex', 'order'],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],
    'selector-max-compound-selectors': 2,
    'selector-max-id': 0,
    'selector-max-type': 0,
    'selector-max-universal': 0,
    'selector-pseudo-element-no-unknown': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
    'shorthand-property-no-redundant-values': true,
    'string-no-newline': true,
    'unit-blacklist': ['em', 'rem'],
  },
};
