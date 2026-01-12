"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreListResponseDto = exports.GenreResponseDto = exports.UpdateGenreRequestDto = exports.CreateGenreRequestDto = void 0;
const HttpError_1 = require("../../utils/HttpError");
class CreateGenreRequestDto {
    constructor(data) {
        var _a;
        if (!data.name) {
            throw new HttpError_1.HttpError(400, "Missing required field: name");
        }
        this.name = data.name;
        this.isActive = (_a = data.isActive) !== null && _a !== void 0 ? _a : true;
    }
}
exports.CreateGenreRequestDto = CreateGenreRequestDto;
class UpdateGenreRequestDto {
    constructor(data) {
        this.name = data.name;
        this.isActive = data.isActive;
    }
}
exports.UpdateGenreRequestDto = UpdateGenreRequestDto;
class GenreResponseDto {
    constructor(genre) {
        this.id = genre._id.toString();
        this.name = genre.name;
        this.isActive = genre.isActive;
        this.createdAt = genre.createdAt;
        this.updatedAt = genre.updatedAt;
    }
}
exports.GenreResponseDto = GenreResponseDto;
class GenreListResponseDto {
    constructor(genres) {
        this.genres = genres.map((genre) => new GenreResponseDto(genre));
    }
}
exports.GenreListResponseDto = GenreListResponseDto;
