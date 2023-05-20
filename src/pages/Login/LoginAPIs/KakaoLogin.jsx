import KakaoLogin from 'react-kakao-login';
import { useNavigate } from 'react-router-dom';

const SocialKakao = () => {
  const navigate = useNavigate();
  const kakaoClientId = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  const kakaoOnSuccess = async data => {
    const idToken = data.response.id_token; // 인가코드 백엔드로 전달
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
      <KakaoLogin token={kakaoClientId} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure} />
    </>
  );
};

export default SocialKakao;
