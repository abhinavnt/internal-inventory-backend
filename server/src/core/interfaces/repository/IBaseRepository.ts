import { Document, FilterQuery, Types, UpdateQuery, QueryOptions, DeleteResult } from "mongoose";

export interface IBaseRepository<T extends Document> {
  findById(id: Types.ObjectId): Promise<T | null>;
  findByIdAndUpdate(id: Types.ObjectId, update: UpdateQuery<T>, options?: QueryOptions): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: Types.ObjectId, data: Partial<T>): Promise<T | null>;
  updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<any>;
  delete(id: Types.ObjectId): Promise<T | null>;
  deleteOne(filter: FilterQuery<T>): Promise<DeleteResult>;
  find(filter: FilterQuery<T>): Promise<T[]>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findOneAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>, options?: QueryOptions): Promise<T | null>;
  findOneAndDelete(filter: FilterQuery<T>): Promise<T | null>;
  countDocuments(filter: FilterQuery<T>): Promise<number>;
  findByIdAndDelete(id: Types.ObjectId | string): Promise<T | null>;
  aggregate(pipeline: any[]): Promise<any[]>;
}
