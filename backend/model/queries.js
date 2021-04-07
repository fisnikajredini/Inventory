const mongoose = require('mongoose');
const Users = mongoose.model(
    'Users',
    {
        first_name: String,
        last_name: String,
        role: String
    },
    'Users'
);

const readAll = () => {
    return new Promise((success, fail) => {
        Users.find({}, (err, data) => {
            if (err) {
                return fail();
            }
            return success(data);
        });
    });
};

const createNew = (data) => {
    return new Promise((success, fail) => {
        let p = new Users(data);
        p.save((err) => {
            if (err) {
                return fail();
            }
            console.log("asdasdasd as das ")
            return success();
        });
    });
};

const remove = (id) => {
    return new Promise((success, fail) => {
        Users.deleteOne({ _id: id }, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const update = (id, data) => {
    return new Promise((success, fail) => {
        Users.updateOne({ _id: id }, data, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const getByEmail = (email) => {
    return new Promise((success, fail) => {
        Users.findOne({ email: email }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
}



const Delovodnikdoc = mongoose.model(
    'delovodnikDBDoc',
    {
        company_name: String,
        category:String,
        subCategory:String,
        subsubCategory:String,
        date: String,
        Life:Number,
    },
    'delovodnikDBDoc'
);

const readAllDoc = () => {
    return new Promise((success, fail) => {
        Delovodnikdoc.find({}, (err, data) => {
            if (err) {
                return fail();
            }
            return success(data);
        });
    });
};

const createNewDoc = (data) => {
    return new Promise((success, fail) => {
        let p = new Delovodnikdoc(data);
        p.save((err) => {
            if (err) {
                return fail();
            }
            console.log("asdasdasd as das ")
            return success();
        });
    });
};

const removeDoc = (id) => {
    return new Promise((success, fail) => {
        Delovodnikdoc.deleteOne({ _id: id }, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const updateDoc = (id, data) => {
    return new Promise((success, fail) => {
        Delovodnikdoc.updateOne({ _id: id }, data, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const getByEmailDoc = (email) => {
    return new Promise((success, fail) => {
        Delovodnikdoc.findOne({ email: email }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
}

module.exports = {
    Users,
    readAll,
    createNew,
    remove,
    update,
    getByEmail,
    Delovodnikdoc,
    readAllDoc,
createNewDoc,
removeDoc,
updateDoc,
getByEmailDoc,
};