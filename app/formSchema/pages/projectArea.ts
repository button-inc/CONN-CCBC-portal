const projectArea = {
  projectArea: {
    title: 'project area',
    description: 'Please describe the geographic area of the proposed project',
    type: 'object',
    properties: {
      geographicArea: {
        title:
          'Referring to the project zones shown in the application guide, which zone(s) will this project be conducted in?',
        type: 'array',
        items: {
          type: 'boolean',
          enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        },
        uniqueItems: true,
      },
      projectSpanMultipleLocations: {
        title: 'If yes, province or territory location (check all that apply)',
        type: 'boolean',
        enum: ['Yes', 'No'],
      },
    },
    dependencies: {
      projectSpanMultipleLocations: {
        oneOf: [
          {
            properties: {
              projectSpanMultipleLocations: {
                enum: ['Yes'],
              },
            },
          },
          {
            properties: {
              projectSpanMultipleLocations: {
                enum: ['No'],
              },
              provincesTerritories: {
                title:
                  'If yes, select the provinces or territorities (check all that apply):',
                type: 'array',
                items: {
                  type: 'boolean',
                  enum: ['Alberta', 'Northwest Territories', 'Yukon'],
                },
                uniqueItems: true,
              },
            },
            required: ['provincesTerritories'],
          },
        ],
      },
    },
  },
};

export default projectArea;
