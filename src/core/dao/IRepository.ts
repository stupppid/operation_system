import {RtDB} from "../dao";
export interface IRepository {
    db: RtDB,
    [name: string]: R
}