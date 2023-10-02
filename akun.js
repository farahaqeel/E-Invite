import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
const app=express();
const PORT=3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'akun'
  });

const pool = mysql.createPool(connection);

async function singupUser(email,password){
if (users.length === 0) {
    const [rows] = await pool.query('INSERT INTO users (email) VALUES (?) ON DUPLICATE KEY UPDATE email=email', [email]);
    return rows.insertId;
}else{
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
}
}
async function LoginUser(email, password){
  if (users.length === 0) {
    const [rows] = await pool.query('INSERT INTO users (email) VALUES (?) ON DUPLICATE KEY UPDATE email=email', [email]);
    return rows.insertId;
}else{
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    }
}

async function logActivity(userId, action) {
    await pool.query('INSERT INTO activity_logs (user_id, action) VALUES (?, ?)', [userId, action]);
}



connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the database');
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export { pool, singupUser,LoginUser, logActivity };