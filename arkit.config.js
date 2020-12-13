const getPathPatterns = (path) => {
  if (path.endsWith('/')) {
    return [
      `${path}**/*.js`,
      `${path}**/*.jsx`,
      `${path}**/*.ts`,
      `${path}**/*.tsx`,
    ];
  } else {
    return [ path ];
  }
};

const getDirectoryGroup = (noType = false) => (directory) => ({
  type: noType ? undefined : directory,
  components: [directory]
});

const defaultExcludePattens = [
  "test/**",
  "tests/**",
  "**/*.test.*",
  "**/*.spec.*",
]

const config = {
  groups: [
    "src/index.ts",
    "src/containers/",
    "src/components/",
    "src/resources/",
  ],
  solos: [
    "src/",
  ],
  excludes: [
    "src/setupTests.ts",
    "src/utils/",
    "node_modules/**",
  ]
};

const components = [...config.groups, ...config.solos].map(directory => ({
  type: directory,
  patterns: getPathPatterns(directory)
}));

const groups = [
  ...config.groups.map(getDirectoryGroup()),
  ...config.solos.map(getDirectoryGroup(true)),
];

const excludePatterns = [
  ...defaultExcludePattens,
  ...config.excludes.flatMap(getPathPatterns)
];

module.exports = {
  $schema: "https://arkit.js.org/schema.json",
  excludePatterns,
  components: components,
  output: [
    {
      path: "arkit.svg",
      direction: "horizontal",
      groups: groups,
    },
  ],
};
