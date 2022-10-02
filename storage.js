require("date-format-lite"); // add date format
const { Pool }=require("./database")
var pg = require('pg');

const connectionString= "postgres://onvjuotq:ADpMvrk97ybLIUgw_uA6AM_LObaBTHal@heffalump.db.elephantsql.com/onvjuotq";
var client = new pg.Client(connectionString);
class Storage {
    constructor(connection, table) {
        this._db =connectionString;
        this.table = "events";
    }

    // get events from the table, use dynamic loading if parameters sent
    async getAll(params) {
        let query = `SELECT * FROM $1`;
        let queryParams = [
            this.table
        ];

        let result = await this._db.query(query, queryParams);

        result.forEach((entry) => {
            // format date and time
            entry.start_date = entry.start_date.format("YYYY-MM-DD hh:mm");
            entry.end_date = entry.end_date.format("YYYY-MM-DD hh:mm");
        });
        return result;
    }

    // create new event
    async function insert(data) {
        let result = await this._db.query(
            `INSERT INTO $1 (start_date, end_date, text) VALUES ($2,$3,$4)`,
            [this.table, data.start_date, data.end_date, data.text]);

        return {
            action: "inserted",
            tid: result.insertId
        }
    }

    // update event
    async update(id, data) {
        await this._db.query(
            "UPDATE ?? SET `start_date` = ?, `end_date` = ?, `text` = ? WHERE id = ?",
            [this.table, data.start_date, data.end_date, data.text, id]);

        return {
            action: "updated"
        }
    }

    // delete event
    async delete(id) {
        await this._db.query(
            "DELETE FROM ?? WHERE `id`=? ;",
            [this.table, id]);

        return {
            action: "deleted"
        }
    }
}

module.exports = Storage;
