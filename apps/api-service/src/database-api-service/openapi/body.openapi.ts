export const BodyApi = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Name of the bank to be created' },

      bic: {
        type: 'string',
        description: 'Bank Identification Code for the bank to be created',
      },

      integrationbaseUrl: {
        type: 'string',
        description: 'The base url for any integrations concerning this bank',
      },

      certificationNumber: {
        type: 'string',
        description: 'Certification number for the bank to be created',
      },
    },
  },
};
