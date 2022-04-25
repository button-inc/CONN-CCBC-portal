import { relayEnvironment } from '../../lib';

import { commitMutation, graphql } from 'react-relay';
const mutation = graphql`
  mutation createApplicationMutation($input: CreateApplicationInput!) {
    createApplication(input: $input)
  }
`;

const createApplicationMutation = (applicationData: {
  formData: string;
  referenceNumber: number;
  status: string;
}) => {
  const { formData, referenceNumber, status } = applicationData;
  const variables = {
    input: {
      application: {
        formData,
        referenceNumber: `${referenceNumber}`,
        status,
      },
    },
  };

  commitMutation(relayEnvironment, {
    mutation,
    variables,
    onError: () => {
      return console.log('CreateApplicationMutation failed');
    },
  });
};

export default createApplicationMutation;
