const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT team1,team2,match_winner,win_type,win_margin,venue_id FROM match OFFSET $1 LIMIT $2', 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

module.exports = {
  getMultiple
}