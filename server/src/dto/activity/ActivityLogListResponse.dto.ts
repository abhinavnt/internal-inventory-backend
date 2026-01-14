import { ActivityAction } from "../../core/constants/activity.enum";

export interface ActivityUserDto {
  id: string;
  name: string;
  email: string;
}

export class ActivityLogListResponseDto {
  id: string;
  action: ActivityAction;
  module: string;
  description: string;
  createdAt: Date;
  performedBy: ActivityUserDto;

  constructor(data: {
    _id: string;
    action: ActivityAction;
    module: string;
    description: string;
    createdAt: Date;
    user: {
      _id: string;
      name: string;
      email: string;
    };
  }) {
    this.id = data._id;
    this.action = data.action;
    this.module = data.module;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.performedBy = {
      id: data.user._id,
      name: data.user.name,
      email: data.user.email,
    };
  }
}
