const getFullAddress = data => {
  let fullAddress = data.address;
  let extraAddress = '';
  if (data.addressType === 'R') {
    if (data.bname !== '') {
      extraAddress += data.bname;
    }
    if (data.buildingName !== '') {
      extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    }
    fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
  }

  return fullAddress; // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
};

const AddressToLatlng = async address => {
  const geocoder = new kakao.maps.services.Geocoder();
  return new Promise(resolve => {
    geocoder.addressSearch(address, (results, status) => {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const result = results[0]; //첫번째 결과의 값을 활용
        resolve({ lat: +result.y, lng: +result.x });
      }
    });
  });
};

export { getFullAddress, AddressToLatlng };
