var db = require("./db_engine");

module.exports = class DB {

    constructor(dbName) {
        this.dbName = `${dbName}.json`;
    }
    set(key, content, callback) {
        db({ db: this.dbName, key: key, value: content }, "update", function (err, data) {
            if (err) callback(err, "");
            else callback(null, data);
        });
    };

    get(key, callback) {
        db({ db: this.dbName, key: key }, "get", function (err, data) {
            if (err) callback(err, "");
            else callback(null, data);
        });
    };

    clear() {
        db({db: this.dbName}, "clear", function(err, data){
            if (err) console.log(err);
            else console.log(data);
        });
    };
}