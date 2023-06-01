import { Image } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const SocialGoogle = () => {
  const navigate = useNavigate();

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

  const login = useGoogleLogin({
    onSuccess: googleOnSuccess,
    onFailure: googleOnFailure,
  });

  return (
    <>
      <Image
        w={'14.3rem'}
        src="src/assets/socialLogins/google_medium.png"
        onClick={() => login()}
      />
    </>
  );
};

export default SocialGoogle;
