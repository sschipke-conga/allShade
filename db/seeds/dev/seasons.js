const seasonsData = require('../../../seasonsData');
const queensData = require('../../../queensData');

const createSeason = (knex, season) => {
  return knex('seasons').insert({
    'number': season.season_number,
    'winner': season.winner,
    'image_url': season.image_url,
  }, 'id')
  .then(seasonId => {
    let queensPromises = [];
    queensData.filter(queen => season.queens.includes(queen.queen_id))
    .forEach(queen => {
      queensPromises.push(
        createQueen(knex, {
          'name': queen.name,
          'winner': queen.winner,
          'missCongeniality': queen.missCongeniality,
          'quote': queen.quote,
          'season': queen.season,
          season_id: seasonId[0]
        })
      )
    });
    return Promise.all(queensPromises);
  })
};

const createQueen = (knex, queen) => {
  return knex('queens').insert(queen);
};

exports.seed = (knex) => {
  return knex('queens').del()
  .then(() => knex('seasons').del())
  .then(() => {
    let seasonPromises = [];
    seasonsData.forEach(season => {
      seasonPromises.push(createSeason(knex, season))
    });
    return Promise.all(seasonPromises);
  })
  .catch(error => console.error(`Error seeding data ${error}`));
};
