import Dexie from "dexie";
import {RtFile} from "../model/File";
import DBVersions from '../../../config/DBVersions'

export class RtDB extends Dexie{
    static instance: RtDB = null
    files: Dexie.Table<RtFile, number>

    constructor() {
        if(RtDB.instance !== null) {
            return RtDB.instance
        }
        super("RtDB");

        for(let i = 0; i < DBVersions.length; i++) {
            this.version(i).stores(DBVersions[i]);
        }
        this.files.mapToClass (RtFile);
    }
}