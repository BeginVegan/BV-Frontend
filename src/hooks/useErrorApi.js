const AUTH_ERROR_STATUS_CODE = 401;

const useErrorApi = () => {
  const handleError = error => {
    if (error.response.status === AUTH_ERROR_STATUS_CODE) {
      MessageChannel.error('메세지');
    }
  };
  return {
    handleError,
  };
};

export default useErrorApi;
