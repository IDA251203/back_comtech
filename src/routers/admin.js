const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const mongoose = require("mongoose");
const Sotilgan = require("../models/sotilgan");
const products = require("../models/products");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
    branding: {
        companyName: "ComTech"
    },
    databases: [mongoose],
    rootPath: "/admin",
    resources: [
        {
            resource: products,
            options: {
                parent: {
                    name: "All",
                    icon: "fas fa-request",
                    
                },
                properties: {
                    _id: { isVisible: { list: false, filter: false, show: false, edit: false } },
                },
            }
        },
        {
            resource: Sotilgan,
            options: {
                parent: {
                    name: "All",
                    icon: "fas fa-request",
                    
                },
                properties: {
                    _id: { isVisible: { list: false, filter: false, show: false, edit: false } },
                },
            }
        }
    ]
});

// Admin panel uchun sozlamalar
const ADMIN = {
    email: process.env.ADMIN_EMAIL || "dinaraazamatovna03@gmail.com",
    password: process.env.ADMIN_PASSWORD || "izzatbek",
};

const Router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || "comtechh",
    cookiePassword: process.env.ADMIN_COOKIE_PASS || "comtechcch",
    authenticate: async (email, password) => {
        if (email === ADMIN.email && password === ADMIN.password) {
            return ADMIN;
        }
        return null;
    },
});

module.exports = Router;
