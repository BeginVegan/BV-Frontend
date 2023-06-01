import { Image } from '@chakra-ui/react';
import KakaoLogin from 'react-kakao-login';
import { useNavigate } from 'react-router-dom';

const SocialKakao = () => {
  const navigate = useNavigate();
  const kakaoClientId = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  const kakaoOnSuccess = async data => {
    const idToken = data.response.id_token;
    console.log(idToken);
    navigate('/auth', {
      state: {
        idToken: idToken,
      },
    });
  };
  const kakaoOnFailure = error => {
    console.log(error);
  };

  return (
    <>
      <KakaoLogin token={kakaoClientId} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure}>
        <Image w={'20rem'} src="src/assets/socialLogins/kakao_medium.png" />
      </KakaoLogin>
    </>
  );
};

export default SocialKakao;
