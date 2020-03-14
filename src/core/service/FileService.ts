import {FileRepository} from "../dao/FileRepository";
import {RtFile, RT_FILE_TYPE} from "../model/File";
import {instance} from "../annotation";
import Dexie from "dexie";

@instance
export default class FileService {
    fileRepository:FileRepository = new FileRepository()

    addFile(file: RtFile) {
        return this.fileRepository.addFile(file)
    }

    appendFile(name: string, parentId: number, type: RT_FILE_TYPE) {
        return this.fileRepository.addFile(new RtFile({
            name: name,
            parentId: parentId,
            type: type
        }))
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


    getRootFile():Dexie.Promise<Array<RtFile>> {
        return this.fileRepository.findFile({
            parentId: 0
        })
    }

}