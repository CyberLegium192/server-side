let db = require("../utils/db.js")

// LIST SCHEDULE QUERY
const getSchedule = (req, res) => {
  const sql = `SELECT * FROM schedule`
  db.query(sql, (err, schedule) => {
    if (err) throw err 
    res.json({
      message: "success",
      schedule
    })
  })
}

// POST ONLY SCHEDULE QUERY
const postSchedule = (req, res) => {
  const {setlist, title, date, time, link} = req.body
  const sql = `INSERT INTO schedule (setlist, title, date, time, link) VALUES (?, ?, ?, ?, ?)`
  db.query(sql, [setlist, title, date, time, link], (err, schedule) => {
    if (err) throw err
    res.json({
      message: 'success',
      schedule
    })
  })
}

// UODATE SCHEDULE QUERY || EVENT SCHEDULE
const updateQuery = (req, res) => {
  const {setlist, title, date, time, link} = req.body
  const id = req.params.id
  const sql = `UPDATE schedule SET setlist = ?, title = ?, date = ?, time = ?, link = ?  WHERE id=${id}`
  db.query(sql, [setlist, title, date, time, link], (err, schedule) => {
    if (err) throw err
    res.json({
      message: 'success',
      schedule
    })
  })
}


// POST SCHEDULE AND MEMEBRPERFORM QUERY
const scheduleAndMemberPerform = (req, res) => {
  const { setlist, title, date, time, link, acara, memberPerform } = req.body;
  
  // Insert data ke tabel schedule
  db.query('INSERT INTO schedule (setlist, title, date, time, link) VALUES (?, ?, ?, ?, ?)',
    [setlist, title, date, time, link],
    (err, scheduleResult) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      const scheduleId = scheduleResult.insertId;

      // Insert data ke tabel membersPerform
      const memberInserts = memberPerform.map(member => [scheduleId, member.member]);

      db.query('INSERT INTO membersPerform (schedule_id, member) VALUES ?',
        [memberInserts],
        (err, memberResult) => {
          if (err) {
            throw err
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }

          res.json({ message: 'Data inserted successfully', scheduleId });
        }
      );
    }
  );
}


// UPDATE SCHEDULE AND MEMBERPERFORM
const updateScheduleMember = (req, res) => {
  const {setlist, title, date, time, link, acara, memberPerform } = req.body;
  const scheduleId = req.params.id
  // Update data di tabel schedule
  db.query(
    'UPDATE schedule SET setlist=?, title=?, date=?, time=?, link=? WHERE id=?',
    [setlist, title, date, time, link, scheduleId],
    (err, scheduleResult) => {
      if (err) {
        throw err
      }

      // Hapus data lama di tabel membersPerform
      db.query('DELETE FROM membersPerform WHERE schedule_id=?', [scheduleId], (deleteErr) => {
        if (deleteErr) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        // Insert data baru ke tabel membersPerform
        const memberInserts = memberPerform.map((member) => [scheduleId, member.member]);

        db.query(
          'INSERT INTO membersPerform (schedule_id, member) VALUES ?',
          [memberInserts],
          (insertErr, memberResult) => {
            if (insertErr) {
              res.status(500).json({ error: 'Internal Server Error' });
              return;
            }

            res.json({ message: 'success', scheduleResult, memberResult,scheduleId });
          }
        );
      });
    }
  );
}


// GET SCHEDULE AND MEMEBRPERFORM QUERY
const getScheduleAndMemberPerforms = (req, res) => {
  const idSchedule = req.params.id
  
  // Insert data ke tabel schedule
  db.query(`SELECT * FROM schedule WHERE id='${idSchedule}'`,
    (err, scheduleResult) => {
      if (err) {
        console.error('Error inserting schedule:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      db.query(`SELECT member FROM membersPerform WHERE schedule_id='${idSchedule}'`,
        (err, memberResult) => {
          if (err) {
            throw err
            console.error('Error inserting membersPerform:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          const results = [
            {
              ...scheduleResult[0], // Assuming scheduleResult is an array with one element
              memberPerform: memberResult,
            }
          ];

          res.json({ message: 'Data inserted successfully', results});
        }
      );
    }
  );
}


// DELETE SCHEDULE QUERY
const deleteScheduleQuery = (req, res) => {
  const scheduleId = req.params.id; 
  db.query('DELETE FROM membersPerform WHERE schedule_id = ?', [scheduleId], (err, memberResult) => {
    if (err) {
      console.error('Error deleting membersPerform:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    db.query('DELETE FROM schedule WHERE id = ?', [scheduleId], (err, scheduleResult) => {
      if (err) {
        console.error('Error deleting schedule:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json({ message: 'Data deleted successfully', scheduleId });
    });
  });
}


// MEMBER PERFORM QUERY
const getMemberPerform = (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM membersPerform WHERE schedule_id='${id}'`
  db.query(sql, (err, memberPerform) => {
    if (err) throw err 
    res.json({
      message: "success",
      memberPerform
    })
  })
}


module.exports={
  getSchedule,
  postSchedule,
  updateQuery,
  scheduleAndMemberPerform,
  updateScheduleMember,
  deleteScheduleQuery,
  getMemberPerform,
  getScheduleAndMemberPerforms,
}