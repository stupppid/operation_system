import FileService from "../service/FileService";
import {IParam as IFile, RtFile} from "../model/File";
import {instance} from "../annotation";
import Dexie from "dexie";

@instance
export class FileController {
    fileService: FileService = new FileService()

    addFile(file: IFile | RtFile, force: boolean = false) {
        return this.fileService.addFile(new RtFile(file), force)
    }

    bulkAddFile(files: Array<IFile>, force: boolean = false):Dexie.Promise<number> {
        return this.fileService.bulkAddFile(files.map(r => new RtFile(r)), force)
    }

    bulkDeleteFile(files: Array<string>, forever:boolean = false) {
        return this.fileService.bulkDeleteFile(files, forever)
    }

    getFileByPath(path: string):Dexie.Promise<RtFile | undefined> {
        return this.fileService.getFileByPath(path)
    }

    getSubFileByPath(path: string, subLevel: number = 1):Dexie.Promise<Array<RtFile>> {
        return this.fileService.getSubFileByPath(path, subLevel).toArray()
    }

    getFileById(id: string):Dexie.Promise<RtFile | undefined> {
        return this.fileService.getFileById(id)
    }

    saveContent(abPath, content) {
        this.fileService.updateFile(abPath, {
            content
        })
    }

    moveFile(abPath, newPath) {
        return this.fileService.updateFile(abPath, {
            absolutePath: newPath
        })
    }
}
