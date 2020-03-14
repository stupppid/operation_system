import {ISearchObject, RtDB} from "./index";
import Dexie from "dexie";
import {instance} from "../annotation";


@instance
export class FileRepository{
    protected files = new RtDB().files
    protected accounts = new RtDB().accounts
    constructor() {}

    addUser({
        name: string

            }) {

    }
}