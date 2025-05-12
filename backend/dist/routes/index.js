"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movies_1 = require("./movies");
const mountRoutes = (app) => {
    app.get('/movies', movies_1.getMovies);
    app.post('/movies/like', movies_1.addLike);
};
exports.default = mountRoutes;
//# sourceMappingURL=index.js.map