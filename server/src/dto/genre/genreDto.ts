import { IGenre } from "../../models/Genre";
import { HttpError } from "../../utils/HttpError";

export class CreateGenreRequestDto {
  name: string;
  isActive?: boolean;

  constructor(data: Partial<CreateGenreRequestDto>) {
    if (!data.name) {
      throw new HttpError(400, "Missing required field: name");
    }

    this.name = data.name;
    this.isActive = data.isActive ?? true;
  }
}

export class UpdateGenreRequestDto {
  name?: string;
  isActive?: boolean;

  constructor(data: Partial<UpdateGenreRequestDto>) {
    this.name = data.name;
    this.isActive = data.isActive;
  }
}

export class GenreResponseDto {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(genre: IGenre) {
    this.id = genre._id.toString();
    this.name = genre.name;
    this.isActive = genre.isActive;
    this.createdAt = genre.createdAt;
    this.updatedAt = genre.updatedAt;
  }
}

export class GenreListResponseDto {
  genres: GenreResponseDto[];

  constructor(genres: IGenre[]) {
    this.genres = genres.map((genre) => new GenreResponseDto(genre));
  }
}
