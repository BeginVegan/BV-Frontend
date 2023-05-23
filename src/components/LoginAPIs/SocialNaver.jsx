import { useScript } from '@/utils/hooks/useScript';
import { useEffect, useState } from 'react';

function SocialNaver() {
  const status = useScript('https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js');
  const [naverLogin, setNaverLogin] = useState(null);
  const { naver } = window;

  const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
  const naverCallbackUrl = 'http://localhost:5173/auth/';
  useEffect(() => {
    if (status === 'ready') {
      const newNaverLogin = new naver.LoginWithNaverId({
        clientId: naverClientId,
        callbackUrl: naverCallbackUrl,
        //FIXME:popup창을 true로 할 경우 메인 창이 아니라 팝업창에서 redirection하는 문제 추후 해결
        isPopup: false,
        loginButton: {
          color: 'green',
          type: 3,
          height: 50,
        },
      });

      newNaverLogin.init();
    }
  }, [status]);

  useEffect(() => {
    if (naverLogin) {
      naverLogin.init();
    }
  }, [naverLogin]);

  return (
    <>
      <div style={{ width: '13rem', height: '5rem' }} id="naverIdLogin">
        {' '}
      </div>
    </>
  );
}

export default SocialNaver;
