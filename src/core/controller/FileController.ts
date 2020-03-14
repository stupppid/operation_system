import FileService from "../service/FileService";
import {RtFile} from "../model/File";
import {instance} from "../annotation";

@instance
export class FileController {
    fileService: FileService = new FileService()

    addFile(file: RtFile) {
        return this.fileService.addFile(file)
    }

    getFileByPath(path: string):RtFile {
        return this.fileService.getFileByPath(path)
    }

    getRootFile() {
        return this.fileService.getRootFile()
    }

    RenameFile() {

    }
}