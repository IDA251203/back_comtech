const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const mongoose = require("mongoose");
const Sotilgan = require("../models/sotilgan");
const Products = require("../models/products");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
    branding: {
        companyName: "ComTech"
    },
    databases: [mongoose],
    rootPath: "/admin",
    resources: [
        {
            resource: Products,
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

const ADMIN = [
    {
        email: process.env.ADMIN_EMAIL || "comtech@gmail.com",
        password: process.env.ADMIN_PASSWORD || "comtechh",
    },
    {
        email: process.env.ADMIN_EMAIL2 || "dinaraazamatovna03@gmail.com",
        password: process.env.ADMIN_PASSWORD2 || "comtech",
    }
];

const Router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || "comtechh",
    cookiePassword: process.env.ADMIN_COOKIE_PASS || "comtechcch",
    authenticate: async (email, password) => {
        const matchedAdmin = ADMIN.find(admin => admin.email === email && admin.password === password);
        if (matchedAdmin) {
            return matchedAdmin;
        }
        return null;
    },
});

module.exports = Router;
