module.exports = {
  plugins: ['stylelint-a11y'],
  rules: {
    'a11y/media-prefers-reduced-motion': true,
    'a11y/no-outline-none': true,
    'a11y/selector-pseudo-class-focus': true,
    'a11y/content-property-no-static-value': [true, { severity: 'warning' }],
    'a11y/font-size-is-readable': [true, { severity: 'warning' }],
    'a11y/line-height-is-vertical-rhythmed': [true, { severity: 'warning' }],
    'a11y/no-display-none': [true, { severity: 'warning' }],
    'a11y/no-spread-text': [true, { severity: 'warning' }],
    'a11y/no-obsolete-attribute': [true, { severity: 'warning' }],
    'a11y/no-obsolete-element': [true, { severity: 'warning' }],
    'a11y/no-text-align-justify': [true, { severity: 'warning' }],
    // 'a11y/media-prefers-color-scheme': false, // [true, { severity: 'warning' }],
  },
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
};
