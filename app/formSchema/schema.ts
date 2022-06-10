import {
  additionalProjectInformation,
  alternateContact,
  authorizedContact,
  budgetDetails,
  contactInformation,
  existingNetworkCoverage,
  organizationLocation,
  organizationProfile,
  projectInformation,
} from './pages';

const useSchema = (featureFlagsForm: any) => {
  // featureFlagsForm is passed and enables development pages if set
  const {
    formAdditionalProjectInformation,
    formAlternateContact,
    formAuthorizedContact,
    formBudgetDetails,
    formContactInformation,
    formExistingNetworkCoverage,
    formOrganizationLocation,
    formOrganizationProfile,
    formProjectInformation,
  } = featureFlagsForm;

  const schema = {
    type: 'object',
    properties: {
      ...(formProjectInformation && {
        ...projectInformation,
      }),
      ...(formAdditionalProjectInformation && {
        ...additionalProjectInformation,
      }),
      ...(formExistingNetworkCoverage && {
        ...existingNetworkCoverage,
      }),
      ...(formBudgetDetails && {
        ...budgetDetails,
      }),
      ...(formOrganizationProfile && {
        ...organizationProfile,
      }),
      ...(formOrganizationLocation && {
        ...organizationLocation,
      }),
      ...(formContactInformation && {
        ...contactInformation,
      }),
      ...(formAuthorizedContact && {
        ...authorizedContact,
      }),
      ...(formAlternateContact && {
        ...alternateContact,
      }),
    },
  };

  return schema;
};
export default useSchema;
