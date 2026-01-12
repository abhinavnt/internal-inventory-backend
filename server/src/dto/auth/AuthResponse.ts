import { Types } from "mongoose";
import { IUser } from "../../models/User";

export class UserResponseDto {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  role: "user" | "organizer" | "admin";
  dob?: Date;
  city?: string;
  genres?: string[];
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IUser) {
    this.id = data._id.toString();
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.role = data.role;
    this.dob = data.dob;
    this.city = data.city;
    this.genres = data.genres;
    this.isVerified = data.isVerified;
    this.isBlocked = data.isBlocked;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class OrganizerResponseDto extends UserResponseDto {
  companyName?: string;
  country?: string;
  state?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  companyLogo?: string;

  constructor(data: IUser) {
    super(data);
    this.role = data.role;
    this.companyName = data.companyName;
    this.country = data.country;
    this.state = data.state;
    this.instagramUrl = data.instagramUrl;
    this.facebookUrl = data.facebookUrl;
    this.companyLogo = data.companyLogo;
  }
}
