"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./routes/routes"));
const statusCodes_1 = __importDefault(require("./helpers/enums/statusCodes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT;
app.use('/api/', routes_1.default);
app.post('/love', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = { name: 'ayo', email: 'o;mmy@gmail.com', password: 'password' };
    const check = yield (0, db_1.default)('users').where('email', 'o;mmy@gmail.com');
    console.log(check);
    // const data = await db('users').insert(payload)
    //  console.log(data)
    //res.json(data)
}));
app.all('*', (req, res) => {
    res.status(statusCodes_1.default.ClientErrorMethodNotAllowed).json({
        status: false,
        message: 'invalid route',
        data: null,
    });
});
app.listen(3000, () => {
    console.log(`Server now live at port ${PORT} `);
});
//# sourceMappingURL=index.js.map