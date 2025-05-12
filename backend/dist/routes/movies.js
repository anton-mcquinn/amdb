"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLike = exports.getMovies = void 0;
const db = __importStar(require("../db"));
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genre, decade } = req.query;
        let sqlQuery = 'SELECT * FROM movies';
        const params = [];
        const conditions = [];
        if (genre) {
            conditions.push(`$${params.length + 1} = ANY(genres)`);
            params.push(genre);
        }
        if (decade) {
            const decadeString = decade;
            const startYear = parseInt(decadeString.replace('s', ''), 10);
            const endYear = startYear + 9;
            conditions.push(`year BETWEEN $${params.length + 1} AND $${params.length + 2}`);
            params.push(startYear, endYear);
        }
        if (conditions.length > 0) {
            sqlQuery += ' WHERE ' + conditions.join(' AND ');
        }
        sqlQuery += ' ORDER BY title ASC';
        const result = yield db.query(sqlQuery, params);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getMovies = getMovies;
const addLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const sqlQuery = 'UPDATE movies SET likes = likes + 1 WHERE id = $1 RETURNING *';
        const result = yield db.query(sqlQuery, [req.body.id]);
        res.status(200).json({ message: 'Like added successfully' });
    }
    catch (error) {
        console.error('Error adding like:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.addLike = addLike;
//# sourceMappingURL=movies.js.map