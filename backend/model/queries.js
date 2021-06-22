const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const Users = mongoose.model(
    'Users',
    {
        user_name: String,
        email: String,
        password: String,
        role: String
    },
    'Users'
);

const readAllUsers = () => {
    return new Promise((success, fail) => {
        Users.find({}, (err, data) => {
            if (err) {
                return fail();
            }
            return success(data);
        });
    });
};

const createNewUsers = (data) => {
    return new Promise((success, fail) => {
        let p = new Users(data);
        p.save((err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const removeUsers = (id) => {
    return new Promise((success, fail) => {
        Users.deleteOne({ _id: id }, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const updateUsers = (id, data) => {
    return new Promise((success, fail) => {
        Users.updateOne({ user_name: userName }, data, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const getByEmailUsers = (email) => {
    return new Promise((success, fail) => {
        Users.findOne({ email: email }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
}



const Products = mongoose.model(
    'Products',
    {
        product_name: String,
        imei: { type: Number, unique: true },
        category: String,
        date: Date,
        buyer: String,
        buying_price: Number,
        selling_price: Number,
        facture_number: String,
        name_surname: String,
        tel_num: Number,
        id_number: String
    },
    'Products'
);

const readAllProduct = () => {
    return new Promise((success, fail) => {
        Products.find({}, (err, data) => {
            if (err) {
                return fail();
            }
            return success(data);
        });
    });
};

const createNewProduct = (data) => {
    return new Promise((success, fail) => {
        let p = new Products(data);
        p.save((err) => {
            console.log(err)
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const removeProduct = (id) => {
    return new Promise((success, fail) => {
        Products.deleteOne({ _id: id }, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const updateProduct = (id, data) => {
    console.log(id)
    return new Promise((success, fail) => {
        Products.updateOne({ _id: id }, data, (err,suc) => {
            if (err) {
                return fail();
            }
            console.log("----11----", suc)
            return success();
        });
    });
};

const getByImeiProduct = (imei) => {
    return new Promise((success, fail) => {
        Products.findOne({ imei: imei }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
}

const getByNameProduct = (name) => {
    return new Promise((success, fail) => {
        Products.find({ product_name: name }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
}

const getByPartnerProduct = (partnername) => {
    return new Promise((success, fail) => {
        Products.find({ buyer: partnername }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
}

const getByFactureProduct = (nrfaktures) => {
    return new Promise((success, fail) => {
        Products.find({ facture_number: nrfaktures }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
}

const Partners = mongoose.model(
    'Partners',
    {
        company_name: String,
        phone_number: String,
    },
    'Partners'
);

const readAllPartner = () => {
    return new Promise((success, fail) => {
        Partners.find({}, (err, data) => {
            if (err) {
                return fail();
            }
            return success(data);
        });
    });
};

const createNewPartner = (data) => {
    return new Promise((success, fail) => {
        let p = new Partners(data);
        p.save((err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const removePartner = (id) => {
    return new Promise((success, fail) => {
        Partners.deleteOne({ _id: id }, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const updatePartner = (id, data) => {
    return new Promise((success, fail) => {
        Partners.updateOne({ _id: id }, data, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const getByEmailPartner = (email) => {
    return new Promise((success, fail) => {
        Partners.findOne({ email: email }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
}

const Sales = mongoose.model(
    'Sales',
    {
        product_name: String,
        imei: { type: Number, unique: true },
        category: String,
        date: Date,
        buyer: String,
        buying_price: Number,
        selling_price: Number,
        facture_number: String,
        name_surname: String,
        tel_num: Number,
        id_number: String,
        first_name: String,
        last_name: String,
        client_tel_num: Number,
        garantion_date: Date,
        selled_price: Number
    },
    'Sales'
);

const readAllSale = () => {
    return new Promise((success, fail) => {
        Sales.find({}, (err, data) => {
            if (err) {
                return fail();
            }
            return success(data);
        });
    });
};

const createNewSale = (data) => {
    return new Promise((success, fail) => {
        let p = new Sales(data);
        p.save((err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const removeSale = (id) => {
    return new Promise((success, fail) => {
        Sales.deleteOne({ _id: id }, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const updateSale = (id, data) => {
    return new Promise((success, fail) => {
        Sales.updateOne({ _id: id }, data, (err) => {
            if (err) {
                return fail();
            }
            return success();
        });
    });
};

const getByEmailSale = (email) => {
    return new Promise((success, fail) => {
        Sales.findOne({ email: email }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
}

module.exports = {
    Users,
    readAllUsers,
    createNewUsers,
    removeUsers,
    updateUsers,
    getByEmailUsers,
    Products,
    readAllProduct,
    createNewProduct,
    removeProduct,
    updateProduct,
    getByImeiProduct,
    getByNameProduct,
    getByPartnerProduct,
    getByFactureProduct,
    Partners,
    readAllPartner,
    createNewPartner,
    removePartner,
    updatePartner,
    getByEmailPartner,
    Sales,
    readAllSale,
    createNewSale,
    removeSale,
    updateSale,
    getByEmailSale,
};