const extractErrorMessage = (err: any): string => {
  // Apollo Client can return errors in different formats
  const originalError =
    err?.graphQLErrors?.[0]?.extensions?.originalError ||
    err?.errors?.[0]?.extensions?.originalError;

  // originalError.message can be a string or an array
  const errorMessage = originalError?.message;

  if (!errorMessage) {
    return "";
  }

  if (Array.isArray(errorMessage)) {
    return formatErrorMessage(errorMessage[0]);
  }

  // Fallback to direct message or generic error
  return formatErrorMessage(errorMessage);
};

const formatErrorMessage = (errorMessage: string) => {
  return (
    errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1).toLowerCase()
  );
};

export { extractErrorMessage };
