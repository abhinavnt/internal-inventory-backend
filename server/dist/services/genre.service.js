"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.GenreService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../di/types");
const genreDto_1 = require("../dto/genre/genreDto");
const HttpError_1 = require("../utils/HttpError");
let GenreService = class GenreService {
    constructor(genreRepository) {
        this.genreRepository = genreRepository;
    }
    createGenre(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingGenre = yield this.genreRepository.findGenre(dto.name);
            if (existingGenre) {
                throw new HttpError_1.HttpError(400, "Genre with this name already exists");
            }
            const genre = yield this.genreRepository.createGenre(dto);
            return new genreDto_1.GenreResponseDto(genre);
        });
    }
    getAllGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            const genres = yield this.genreRepository.getAllGenres();
            return new genreDto_1.GenreListResponseDto(genres);
        });
    }
    getGenreById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield this.genreRepository.getGenreById(id);
            if (!genre) {
                throw new HttpError_1.HttpError(404, "Genre not found");
            }
            return new genreDto_1.GenreResponseDto(genre);
        });
    }
    updateGenre(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dto.name) {
                const existingGenre = yield this.genreRepository.findGenre(dto.name);
                if (existingGenre && existingGenre._id.toString() !== id.toString()) {
                    throw new HttpError_1.HttpError(400, "Genre with this name already exists");
                }
            }
            const genre = yield this.genreRepository.updateGenre(id, dto);
            if (!genre) {
                throw new HttpError_1.HttpError(404, "Genre not found");
            }
            return new genreDto_1.GenreResponseDto(genre);
        });
    }
    updateGenreStatus(id, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield this.genreRepository.updateGenreStatus(id, isActive);
            if (!genre) {
                throw new HttpError_1.HttpError(404, "Genre not found");
            }
            return new genreDto_1.GenreResponseDto(genre);
        });
    }
    deleteGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield this.genreRepository.deleteGenre(id);
            if (!genre) {
                throw new HttpError_1.HttpError(404, "Genre not found");
            }
            return new genreDto_1.GenreResponseDto(genre);
        });
    }
};
exports.GenreService = GenreService;
exports.GenreService = GenreService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.GenreRepository)),
    __metadata("design:paramtypes", [Object])
], GenreService);
