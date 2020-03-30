import {RtFile, RT_FILE_TYPE, MAX_FILE_LEVEL} from "../model/File";
import {instance} from "../annotation";
import Dexie from "dexie";
import { RtDB } from "./RtDB";
import {state} from "../../index";

const UNKNOWN = 'unknown'

@instance
export default class FileService {
    protected files = new RtDB().files

    async addFile(file: RtFile, put: boolean = false) {
        let owner = await state.getItem('$CURRENT_ACCOUNT.name', 1)
        let group = await state.getItem('$CURRENT_ACCOUNT.group.name', 1)
        file.createBy = owner || UNKNOWN
        file.owner = owner || UNKNOWN
        file.group = group || UNKNOWN
        if(put) {
            return this.files.put(file)
        } else {
            return this.files.add(file)
        }
    }


    async bulkAddFile(files: Array<RtFile>, put: boolean = false): Dexie.Promise<number> {
        let db = new RtDB()
        let owner = await state.getItem('$CURRENT_ACCOUNT.name', 1)
        let group = await state.getItem('$CURRENT_ACCOUNT.group.name', 1)
        state.getItem('$CURRENT_ACCOUNT.name', 1).then(createBy => {
            files.forEach(file => {
                file.createBy = createBy || UNKNOWN
                file.owner = owner || UNKNOWN
                file.group = group || UNKNOWN
            })
        })
        return db.transaction('rw', [db.files], function () {
            if(put) {
                return db.files.bulkPut(files).then()
            } else {
                return db.files.bulkAdd(files).then()
            }
        })
    }

    bulkDeleteFile(files: Array<string>, forever: boolean):Dexie.Promise<any[]> {
        let db = new RtDB()
        function action(obj, forever) {
            if(forever) {
                return obj.delete()
            } else {
                return obj.modify({
                    isDeleted: true,
                    absolutePath: obj.absolutePath + '$'
                })
            }
        }
        return db.transaction('rw', [db.files],  () => {
            let arr = []
            files.forEach(r => {
                arr.push(action(this.getSubFileByPath(r, MAX_FILE_LEVEL), forever), action(this.files.where('absolutePath').equals(r),forever))
            })
            return Dexie.Promise.all(arr)
        })
    }

    updateFile(abPath: string, change?:{[keyPath:string]: any}):Dexie.Promise<number> {
        let attr = ''
        if(Object.keys(change).some(v => {
            attr = v
            return v in RtFile.READONLY_ATTR
        })) {
            throw new Error(`${attr} cannot be changed`)
        }
        change.updateTime = new Date()
        change.updateBy = new Date()
        return this.files.where({
            absolutePath: abPath
        }).modify(change)
    }

    getFileByPath(path: string):Dexie.Promise<RtFile | undefined> {
        return this.files.where('absolutePath').equals(path).first()
    }

    getSubFileByPath(path: string, subLevel: number = 1):Dexie.Collection<RtFile, number> {
        if(!path.endsWith('/')) {
            path += '/'
        }
        let len = path.split('/').length
        if(path === '//') {
            --len
        }
        let filter:(args:RtFile)=>boolean
        if(subLevel > 0) {
            filter = r => r.level > len - 1 && r.level < len + subLevel
        } else {
            throw new Error('subLevel must above 0')
        }
        return this.files.where('absolutePath').startsWith(path).and(filter)
    }

    getFileById(id: string):Dexie.Promise<RtFile | undefined> {
        return this.files.get({
            id
        })
    }
}
