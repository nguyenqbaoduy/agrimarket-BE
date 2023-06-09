const db = require('../config/mysql');
const User = function (user) {
    this.UserID = user.UserID;
    this.UserName = user.UserName;
    this.Password = user.Password;
    this.FullName = user.FullName;
    this.Email = user.Email;
    this.Phone = user.Phone;
    this.Avatar = user.Avatar;
    this.Role = user.Role;
    this.IsActive = user.IsActive;
}
User.get_all = function (result) {
    db.query("SELECT * FROM users", function (err, user) {
        if (err)
            result(err);
        else
            result(user);
    });

}

User.getById = function (id, result) {
    db.query("SELECT * FROM users WHERE UserID = ?", id, function (err, user) {
        if (err || user.length == 0)
            result (err);
        else
            result(user[0]);
        // Chỉ cần trả về một user không cần trả về một mảng
    });
}

User.create = function (data, result) {
    db.query("INSERT INTO users SET ?", data, function (err) {
        if (err) {
            result(null);
        }
        else {
            db.query("SELECT * from users WHERE UserName = ?", data.UserName, function (err, user){
                result(user[0])
            })
        }
    });
}

User.detele = function (data, result) {
    db.query("DELETE FROM users WHERE UserID =?", data.UserID, function (err) {
        if (err) {
            result(err);
        }
        else
            result("Đã xoá thành công");
    });
}

User.update_info = function (data, result) {
    db.query("UPDATE users SET FullName =?, Email = ?, Phone=?, Avatar=? WHERE UserID =?",
        [data.FullName, data.Email, data.Phone, data.Avatar, data.UserID], function (err, user) {
            if (err || user.changedRows == 0) {
                result(null);
            }
            else
                result({ id: user.UserID, ...data });
        });
}

User.check_login = function (data, result) {
    db.query("SELECT UserID, UserName, Role, FullName FROM users WHERE UserName =? AND Password =? AND IsActive = 1",
        [data.username, data.password], function (err, user) {
            if (err || user.length == 0){
                console.log(err);
                result(null);
            }
            else
                result(user[0]);
        });
}
User.findById = function (data,result){
    db.query("SELECT * FROM users WHERE UserName =?",
    [data.username], function (err, user) {
        if (err || user.length == 0){
            console.log(err);
            result(null);
        }
        else
            result(user[0]);
    });
}
module.exports = User;