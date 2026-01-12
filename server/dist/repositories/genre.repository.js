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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreRepository = void 0;
const base_repository_1 = require("../core/abstracts/base.repository");
const Genre_1 = require("../models/Genre");
class GenreRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(Genre_1.Genre);
    }
    createGenre(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.create(data);
        });
    }
    getAllGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({});
        });
    }
    getGenreById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findById(id);
        });
    }
    updateGenre(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, data);
        });
    }
    updateGenreStatus(id, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, { isActive });
        });
    }
    deleteGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(id);
        });
    }
    findGenre(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne({ name });
        });
    }
}
exports.GenreRepository = GenreRepository;
