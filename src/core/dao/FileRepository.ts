import {RT_FILE_TYPE, RtFile} from "../model/File";
import {ISearchObject, RtDB} from "./index";
import Dexie from "dexie";
import {instance} from "../annotation";


@instance
export class FileRepository{
     protected files = new RtDB().files
     constructor() {}

    addFile(file:RtFile):Promise<number> {
        return this.files.add(file);
    }

    findFile(file:ISearchObject):Dexie.Promise<Array<RtFile>> {
        return this.files.where(file).toArray()
    }


}