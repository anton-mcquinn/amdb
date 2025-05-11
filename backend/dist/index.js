"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const db = process.env.DB_NAME;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const pool = new pg_1.Pool({
    user,
    host: 'localhost',
    database: db,
    password: pass,
    port: 5432,
});
// test db connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query', err);
    }
    else {
        console.log('Connected to PostgreSQL on', res.rows[0].now);
    }
});
app.get('/', (req, res) => {
    res.send('Anton\'s Movie Database is Running!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map