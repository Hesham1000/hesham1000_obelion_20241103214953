module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('venues', [
    {
      name: 'Grand Hall',
      photos: JSON.stringify(['photo1.jpg', 'photo2.jpg']),
      capacity: 500,
      amenities: JSON.stringify(['WiFi', 'Projector', 'Parking']),
      pricing: '$2000 per day',
      reviews: JSON.stringify([
        { user: 'John Doe', comment: 'Great venue!', rating: 5 },
        { user: 'Jane Smith', comment: 'Loved the amenities.', rating: 4 }
      ]),
    },
    // Additional venue objects can be added here
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('venues', null, {})
};
