export const generateDummyData = () => {
  const reservations = [];
  const memberEmails = [
    'john123@example.com',
    'sarah456@example.com',
    'michael789@example.com',
    'emily321@example.com',
    'alex654@example.com',
    'olivia987@example.com',
    'david123@example.com',
    'emma456@example.com',
    'james789@example.com',
    'ava321@example.com',
  ];
  const menuNames = [
    'Hamburger',
    'Pizza',
    'Sushi',
    'Steak',
    'Pasta',
    'Salad',
    'Ramen',
    'Tacos',
    'Chicken Curry',
    'Fish and Chips',
  ];
  const menuPrices = [10000, 12000, 11000, 15000, 9000, 8000, 9500, 8500, 13000, 14000];
  const menuCategories = [
    'Fast Food',
    'Italian',
    'Japanese',
    'Steakhouse',
    'Italian',
    'Healthy',
    'Japanese',
    'Mexican',
    'Indian',
    'British',
  ];

  for (let i = 0; i < 5000; i++) {
    const reservationNo = i + 1;
    const memberEmail = memberEmails[Math.floor(Math.random() * memberEmails.length)];
    const restaurantNo = Math.floor(Math.random() * 5) + 1; // Assuming 4 restaurants available
    const reservationTime = getRandomDateTime();
    const reservationVisitTime = getRandomDateTime();
    const reservationType = i % 2 === 0 ? 'Store' : 'packaging';
    const reservationPeople = 2 + Math.floor(Math.random() * 5);
    const reservationDiscount = Math.floor(Math.random() * 4000);
    const reservationTotalPrice = Math.floor(Math.random() * 100000);
    const reservationStatus = i % 10 === 0 ? '취소' : '예약'; // Probability of 1/10 for "Cancelled"

    const reservationMenuList = [];
    const menuCount = Math.floor(Math.random() * 3) + 3; // Generate 3-5 menus
    for (let j = 0; j < menuCount; j++) {
      const menuIndex = Math.floor(Math.random() * menuNames.length);
      const menuNo = j + 1;
      const menuName = menuNames[menuIndex];
      const menuPrice = menuPrices[menuIndex];
      const menuCategory = menuCategories[menuIndex];
      const menuDetail = `${menuName} Description`;
      const menuPhotoDir = 'https://bv-image.s3.ap-northeast-2.amazonaws.com/menu/sandwich.jpg';
      const reservationMenuCount = Math.floor(Math.random() * 4) + 1;

      reservationMenuList.push({
        menuNo,
        restaurantNo,
        menuName,
        menuPrice,
        menuCategory,
        menuDetail,
        menuPhotoDir,
        reservationNo,
        reservationMenuCount,
      });
    }

    reservations.push({
      reservationNo,
      memberEmail,
      restaurantNo,
      reservationTime,
      reservationVisitTime,
      reservationType,
      reservationPeople,
      reservationDiscount,
      reservationTotalPrice,
      reservationStatus,
      reservationMenuList,
    });
  }

  reservations.sort((a, b) => new Date(a.reservationTime) - new Date(b.reservationTime));

  reservations.forEach((reservation, index) => {
    reservation.reservationNo = index + 1;
  });

  return reservations;
};

export const getRandomDateTime = () => {
  const startDate = new Date(2023, 1, 1).getTime();
  const endDate = new Date(2023, 5, 13).getTime();
  const randomTime = Math.random() * (endDate - startDate) + startDate;
  const date = new Date(randomTime);
  const formattedDate = date.toISOString().split('T')[0]; // Extract date part in "YYYY-MM-DD" format
  const hours = date.getHours().toString().padStart(2, '0'); // Get hours with leading zeros
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes with leading zeros
  const seconds = date.getSeconds().toString().padStart(2, '0'); // Get seconds with leading zeros
  const formattedTime = `${hours}:${minutes}:${seconds}`; // Format the time

  return `${formattedDate} ${formattedTime}`;
};
