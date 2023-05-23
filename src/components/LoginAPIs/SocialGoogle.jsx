import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const SocialGoogle = () => {
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const googleOnSuccess = async data => {
    const idToken = data.credential;
    navigate('/auth', {
      state: {
        idToken: idToken,
      },
    });
  };
  const googleOnFailure = error => {
    console.log(error);
  };

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin size="large" onSuccess={googleOnSuccess} onFailure={googleOnFailure} />
      </GoogleOAuthProvider>
    </>
  );
};

export default SocialGoogle;
