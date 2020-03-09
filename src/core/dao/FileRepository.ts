import {RT_FILE_TYPE, RtFile} from "../model/File";
import {Repository} from "../../../annotation/repository"
import {RtDB} from "./index";
import Dexie from "dexie";

// const Repository = (func) => {
//     func.prototype.db = {}
// }

@Repository
export class FileRepository {
    private db:RtDB
    private saveNewFile(parentId: number, name: string, type: RT_FILE_TYPE):Promise<any> {
        return this.db.files.add(new RtFile({
            parentId, name, type
        }))
    }
    private findFileByName(name: string):RtFile {
        return null
    }
}