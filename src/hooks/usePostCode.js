import { useDaumPostcodePopup } from 'react-daum-postcode';

const usePostCode = ({ handleComplete }) => {
  const open = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  );

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return handleClick;
};

export default usePostCode;
