const express = require("express");
const cors = require("cors");
require('dotenv').config({path:__dirname + '/lab4.env'})

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


PGHOST = process.env.host
PGUSER = process.env.username
PGDATABASE = process.env.dbname
PGPASSWORD = process.env.password
PGPORT = process.env.port


const Pool=require("pg").Pool;
const pool=new Pool({
    user: PGUSER,
    password: PGPASSWORD,
    host: PGHOST,
    port: PGPORT,
    database: PGDATABASE
});



app.get("/matches/:offset/:limit", async (req, res) => {
    try {
        const { offset,limit } = req.params;
        const allTodos = await pool.query(`SELECT match.match_id, team1.team_name as team1, team2.team_name as team2, team3.team_name as winner, match.win_type,match.win_margin ,venue.venue_name, venue.city_name
        FROM match, venue, team as team1, team as team2, team as team3
        WHERE match.venue_id=venue.venue_id AND team1.team_id=match.team1 AND team2.team_id=match.team2 AND team3.team_id=match.match_winner
        ORDER BY match.match_id DESC
        OFFSET $1 LIMIT $2`
        , [offset,limit]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});

//scorecard
app.get("/match/:match_id/team/:innings", async (req, res) => {
    try {
        const { match_id,innings } = req.params;
        const allTodos = await pool.query(`SELECT team.team_name
        FROM ball_by_ball, player_match, team
        WHERE player_match.player_id=ball_by_ball.striker AND  player_match.match_id=ball_by_ball.match_id AND player_match.team_id=team.team_id AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        LIMIT 1`
        , [match_id,innings]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/batting/:innings", async (req, res) => {
    try {
        const { match_id,innings } = req.params;
        const allTodos = await pool.query(`SELECT player.player_id, player.player_name as batter, SUM(ball_by_ball.runs_scored) as runs, SUM(CASE WHEN ball_by_ball.runs_scored=4 THEN 1 ELSE 0 END) as fours, SUM(CASE WHEN ball_by_ball.runs_scored=6 THEN 1 ELSE 0 END) as sixes, COUNT(ball_by_ball.ball_id) as balls_faced
        FROM player, ball_by_ball
        WHERE player.player_id=ball_by_ball.striker AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY player.player_id`
        , [match_id,innings]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/bowling/:innings", async (req, res) => {
    try {
        const { match_id,innings } = req.params;
        const allTodos = await pool.query(`SELECT player.player_id, player.player_name as bowler, COUNT(ball_by_ball.ball_id) as balls_bowled, SUM(ball_by_ball.runs_scored+ball_by_ball.extra_runs) AS runs_given, SUM(CASE  WHEN ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' THEN 1 ELSE 0 END) AS wickets
        FROM player, ball_by_ball
        WHERE player.player_id=ball_by_ball.bowler AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY player.player_id`
        , [match_id,innings]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/details", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT match.match_id, team1.team_name as team1, team2.team_name as team2, match.season_year, team3.team_name as toss_winner
        FROM match, team as team1, team as team2, team as team3
        WHERE team1.team_id=match.team1 AND team2.team_id=match.team2 AND team3.team_id=match.toss_winner AND match.match_id=$1`
        , [match_id]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});  

app.get("/match/:match_id/umpires", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT umpire.umpire_name
        FROM umpire, umpire_match
        WHERE umpire.umpire_id=umpire_match.umpire_id AND umpire_match.match_id=$1`
        , [match_id]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/team1", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT player.player_name
        FROM player, player_match, match
        WHERE player.player_id=player_match.player_id AND player_match.match_id=match.match_id AND player_match.team_id=match.team1 AND player_match.match_id=$1;`
        , [match_id]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/team2", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT player.player_name
        FROM player, player_match, match
        WHERE player.player_id=player_match.player_id AND player_match.match_id=match.match_id AND player_match.team_id=match.team2 AND player_match.match_id=$1;`
        , [match_id]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});
//scorecomparision
//detals

app.get("/match/:match_id/scorecomparison/team1", async (req, res) => {
   try {
       const { match_id } = req.params;
       const allTodos = await pool.query(`SELECT sum(ball_by_ball.runs_scored+ball_by_ball.extra_runs) AS runs, ball_by_ball.over_id
       FROM ball_by_ball, player_match, match
       WHERE match.match_id=ball_by_ball.match_id AND player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.striker AND player_match.team_id=match.team1 AND ball_by_ball.match_id=$1
        GROUP BY ball_by_ball.over_id ORDER BY ball_by_ball.over_id `
       , [match_id]);
       res.json(allTodos.rows);
   }catch (err) {
       console.error(err.message);
   }
});

app.get("/match/:match_id/scorecomparison/team2", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT sum(ball_by_ball.runs_scored+ball_by_ball.extra_runs) AS runs, ball_by_ball.over_id
        FROM ball_by_ball, player_match, match
        WHERE match.match_id=ball_by_ball.match_id AND player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.striker AND player_match.team_id=match.team2 AND ball_by_ball.match_id=$1
         GROUP BY ball_by_ball.over_id ORDER BY ball_by_ball.over_id `
        , [match_id]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/scorecomparision/wickets/team1", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT  ball_by_ball.over_id, ball_by_ball.ball_id
        FROM ball_by_ball, player_match, match
        WHERE match.match_id=ball_by_ball.match_id AND player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.bowler AND ( ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' ) AND player_match.team_id=match.team1 AND ball_by_ball.match_id=$1
        ORDER BY ball_by_ball.over_id, ball_by_ball.ball_id`
        , [match_id]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/scorecomparision/wickets/team2", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT  ball_by_ball.over_id, ball_by_ball.ball_id
        FROM ball_by_ball, player_match, match
        WHERE match.match_id=ball_by_ball.match_id AND player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.bowler AND ( ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' ) AND player_match.team_id=match.team2 AND ball_by_ball.match_id=$1
        ORDER BY ball_by_ball.over_id, ball_by_ball.ball_id`
        , [match_id]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});
//matchsummary
app.get("/match/:match_id/seasonyear", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT season_year 
        FROM match
        WHERE match_id=$1`
        , [match_id]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});
app.get("/match/:match_id/venue", async (req, res) => {
   try {
       const { match_id } = req.params;
       const allTodos = await pool.query(`select venue_name,city_name from match,venue 
       where match.venue_id = venue.venue_id and match.match_id = $1`
       , [match_id]);
       res.json(allTodos.rows);
   }catch (err) {
       console.error(err.message);
   }
});


app.get("/match/:match_id/bat/:innings", async (req, res) => {
    try {
        const { match_id,innings } = req.params;
        const allTodos = await pool.query(`SELECT player.player_name, player.player_id, SUM(ball_by_ball.runs_scored) as runs, COUNT(ball_by_ball.runs_scored) AS balls
        FROM player, ball_by_ball
        WHERE ball_by_ball.striker=player.player_id AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY player_id
        ORDER BY SUM(ball_by_ball.runs_scored) DESC, COUNT(ball_by_ball.runs_scored), player.player_name
        LIMIT 3`
        , [match_id,innings]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});
app.get("/match/:match_id/bowl/:innings", async (req, res) => {
    try {
        const { match_id,innings} = req.params;
        const allTodos = await pool.query(`SELECT * 
        FROM ( SELECT player.player_name, player.player_id, SUM(CASE  WHEN ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' THEN 1 ELSE 0 END) as wickets
        FROM player, ball_by_ball
        WHERE ball_by_ball.bowler=player.player_id AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2 
        GROUP BY player_id
        ORDER BY SUM(CASE  WHEN ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' THEN 1 ELSE 0 END) DESC, SUM(ball_by_ball.runs_scored+ball_by_ball.extra_runs), player.player_name ) AS i
        WHERE i.wickets<>0
        LIMIT 3`
        , [match_id,innings]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});
app.get("/match/:match_id/runs/:innings", async (req, res) => {
    try {
        const { match_id,innings } = req.params;
        const allTodos = await pool.query(`SELECT team.team_name, SUM(ball_by_ball.runs_scored+ball_by_ball.extra_runs)
        FROM team, ball_by_ball, player_match
        WHERE player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.striker AND team.team_id=player_match.team_id AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY team.team_name`
        , [match_id,innings]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/wickets/:innings", async (req, res) => {
    try {
        const { match_id,innings } = req.params;
        const allTodos = await pool.query(`SELECT team.team_name, SUM(CASE  WHEN ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' THEN 1 ELSE 0 END)
        FROM team, ball_by_ball, player_match
        WHERE player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.bowler AND team.team_id=player_match.team_id AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY team.team_name`
        , [match_id,innings]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/distribution/:innings", async (req, res) => {
    try {
        const { match_id,innings } = req.params;
        const allTodos = await pool.query(`SELECT team.team_name, SUM(CASE WHEN ball_by_ball.runs_scored=1 THEN 1 ELSE 0 END) as ones, SUM(CASE WHEN ball_by_ball.runs_scored=2 THEN 1 ELSE 0 END) as twos, SUM(CASE WHEN ball_by_ball.runs_scored=3 THEN 1 ELSE 0 END) as threes, SUM(CASE WHEN ball_by_ball.runs_scored=4 THEN 1 ELSE 0 END) as fours, SUM(CASE WHEN ball_by_ball.runs_scored=6 THEN 1 ELSE 0 END) as sixes, SUM(ball_by_ball.extra_runs) AS extras, COUNT(ball_by_ball.ball_id) as total_balls
        FROM team, ball_by_ball, player_match
        WHERE player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.striker AND team.team_id=player_match.team_id AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY team.team_name`
        , [match_id,innings]);
        res.json(allTodos.rows);
    }catch (err) {
        console.error(err.message);
    }
});


var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("cricinfo app listening at http://%s:%s", host, port)
 })
 
 module.exports = app;