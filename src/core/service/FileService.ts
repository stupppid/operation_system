import {RtFile, RT_FILE_TYPE} from "../model/File";
import {instance} from "../annotation";
import Dexie from "dexie";
import { RtDB } from "./RtDB";

@instance
export default class FileService {
    protected files = new RtDB().files

    addFile(file: RtFile) {
        return this.files.add(file)
    }

    bulkAddFile(files: Array<RtFile>) {
        return this.files.bulkAdd(files)
    }

    getFileByPath(path: string):RtFile {
        let pathArr = path.split('/')
        pathArr.shift()
        // this.fileRepository.findFile({
        //     name: pathArr,
        //     parentId: 0
        // }).then(fileArr => {
        //     fileArr[0]
        // })

        return
    }


    getRootFile():Dexie.Collection<RtFile, number> {
        return this.files.where({
            parentId: 0
        })
    }

}