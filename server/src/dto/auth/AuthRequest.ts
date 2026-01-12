import { HttpError } from "../../utils/HttpError";

export class OrganizerRegistrationRequestDto {
  email: string;
  phone?: string;
  password: string;
  role: "organizer";
  name?: string;
  companyName?: string;
  country?: string;
  state?: string;
  city?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  companyLogo?: string;

  constructor(data: Partial<OrganizerRegistrationRequestDto>) {
    if (!data.email || !data.password) {
      throw new HttpError(400, "Missing required fields: email or password");
    }

    this.email = data.email;
    this.phone = data.phone;
    this.password = data.password;
    this.role = "organizer";
    this.name = data.name;
    this.companyName = data.companyName;
    this.country = data.country;
    this.state = data.state;
    this.city = data.city;
    this.instagramUrl = data.instagramUrl;
    this.facebookUrl = data.facebookUrl;
    this.companyLogo = data.companyLogo;
  }
}

export class UserRegistrationRequestDto {
  email: string;
  phone?: string;
  password: string;
  role: "user";
  name?: string;
  dob?: Date;
  city?: string;
  genres?: string[];

  constructor(data: Partial<UserRegistrationRequestDto>) {
    if (!data.email || !data.password) {
      throw new HttpError(400, "Missing required fields: email or password");
    }

    this.email = data.email;
    this.phone = data.phone;
    this.password = data.password;
    this.role = "user";
    this.name = data.name;
    this.dob = data.dob;
    this.city = data.city;
    this.genres = data.genres;
  }
}
