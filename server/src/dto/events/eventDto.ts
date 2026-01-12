import { Types } from "mongoose";
import { IEvent } from "../../models/Event";
import { HttpError } from "../../utils/HttpError";

interface TicketDto {
  type: string;
  description?: string;
  price: number;
  quantity: number;
  sold?: number;
}

interface LocationDto {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

export class CreateEventRequestDto {
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  startTime: string;
  endTime: string;
  capacity?: number;
  ageRestriction?: number;
  genres: Types.ObjectId[];
  venue: string;
  location: LocationDto;
  tickets: TicketDto[];
  organizer: Types.ObjectId;
  tags?: string[];
  refundPolicy?: "non-refundable" | "partial" | "full";
  status?: "draft" | "published" | "cancelled";

  constructor(data: Partial<CreateEventRequestDto>) {
    if (!data.title) throw new HttpError(400, "Missing required field: title");
    if (!data.startDate) throw new HttpError(400, "Missing required field: startDate");
    if (!data.startTime) throw new HttpError(400, "Missing required field: startTime");
    if (!data.endTime) throw new HttpError(400, "Missing required field: endTime");
    if (!data.venue) throw new HttpError(400, "Missing required field: venue");
    if (!data.tickets) throw new HttpError(400, "Missing required field: tickets");
    if (!data.organizer) throw new HttpError(400, "Missing required field: organizer");

    if (typeof data.tickets === "string") {
      try {
        data.tickets = JSON.parse(data.tickets);
      } catch (e) {
        throw new HttpError(400, "Invalid tickets format: must be a valid JSON array");
      }
    }

    if (data.organizer && typeof data.organizer === "string") {
      data.organizer = new Types.ObjectId(data.organizer);
    }

    if (data.genres && typeof data.genres === "string") {
      try {
        const parsedGenres = JSON.parse(data.genres);
        if (Array.isArray(parsedGenres)) {
          data.genres = parsedGenres.map((id: string) => new Types.ObjectId(id));
        } else {
          throw new HttpError(400, "Invalid genres format: must be an array of ObjectIds");
        }
      } catch (e) {
        throw new HttpError(400, "Invalid genres format: must be a valid JSON array");
      }
    }

    if (!Array.isArray(data.tickets) || data.tickets.length === 0) {
      throw new HttpError(400, "Missing or invalid required field: tickets");
    }

    this.title = data.title;
    this.description = data.description;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.capacity = data.capacity;
    this.ageRestriction = data.ageRestriction;
    this.genres = data.genres || [];
    this.venue = data.venue;
    this.location = data.location || {};
    this.tickets = data.tickets;
    this.organizer = data.organizer;
    this.tags = data.tags;
    this.refundPolicy = data.refundPolicy || "non-refundable";
    this.status = data.status || "draft";
  }
}

export class UpdateEventRequestDto {
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
  capacity?: number;
  ageRestriction?: number;
  genres?: Types.ObjectId[];
  venue?: string;
  location?: LocationDto;
  tickets?: TicketDto[];
  tags?: string[];
  refundPolicy?: "non-refundable" | "partial" | "full";
  isFeatured?: boolean;

  constructor(data: Partial<UpdateEventRequestDto>) {
    if (typeof data.tickets === "string") {
      try {
        data.tickets = JSON.parse(data.tickets);
      } catch (e) {
        throw new HttpError(400, "Invalid tickets format: must be a valid JSON array");
      }
    }

    if (data.genres && typeof data.genres === "string") {
      try {
        const parsedGenres = JSON.parse(data.genres);
        if (Array.isArray(parsedGenres)) {
          data.genres = parsedGenres.map((id: string) => new Types.ObjectId(id));
        } else {
          throw new HttpError(400, "Invalid genres format: must be an array of ObjectIds");
        }
      } catch (e) {
        throw new HttpError(400, "Invalid genres format: must be a valid JSON array");
      }
    }

    this.title = data.title;
    this.description = data.description;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.capacity = data.capacity;
    this.ageRestriction = data.ageRestriction;
    this.genres = data.genres;
    this.venue = data.venue;
    this.location = data.location;
    this.tickets = data.tickets;
    this.tags = data.tags;
    this.refundPolicy = data.refundPolicy;
    this.isFeatured = data.isFeatured;
  }
}

export class UpdateEventStatusRequestDto {
  status: "draft" | "published" | "cancelled";

  constructor(data: Partial<UpdateEventStatusRequestDto>) {
    if (!data.status) throw new HttpError(400, "Missing required field: status");
    this.status = data.status;
  }
}

export class EventResponseDto {
  id: string;
  title: string;
  banner?: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  startTime: string;
  endTime: string;
  capacity?: number;
  ageRestriction?: number;
  genres: string[];
  venue: string;
  location: LocationDto;
  tickets: TicketDto[];
  organizer: string;
  tags?: string[];
  refundPolicy: "non-refundable" | "partial" | "full";
  isFeatured: boolean;
  favorites: number;
  status: "draft" | "published" | "cancelled";
  createdAt: Date;
  updatedAt: Date;

  constructor(event: IEvent) {
    this.id = event._id.toString();
    this.title = event.title;
    this.banner = event.banner;
    this.description = event.description;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.startTime = event.startTime;
    this.endTime = event.endTime;
    this.capacity = event.capacity;
    this.ageRestriction = event.ageRestriction;
    this.genres = event.genres.map((g) => g.toString());
    this.venue = event.venue;
    this.location = event.location;
    this.tickets = event.tickets;
    this.organizer = event.organizer.toString();
    this.tags = event.tags;
    this.refundPolicy = event.refundPolicy || "non-refundable";
    this.isFeatured = event.isFeatured;
    this.favorites = event.favorites;
    this.status = event.status;
    this.createdAt = event.createdAt;
    this.updatedAt = event.updatedAt;
  }
}

export class EventListResponseDto {
  events: EventResponseDto[];
  total: number;
  page: number;
  limit: number;

  constructor(events: IEvent[], total: number, page: number, limit: number) {
    this.events = events.map((event) => new EventResponseDto(event));
    this.total = total;
    this.page = page;
    this.limit = limit;
  }
}
