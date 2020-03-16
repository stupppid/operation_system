import * as path from "path";

export enum RT_FILE_TYPE {
    FILE,
    FOLDER,
    LINK,
}

class RtFilePermission {
    accountId?: number
    groupId?: number
    permission: number

    constructor(permission: RtFilePermission) {
        if(permission.accountId !== undefined) {
            this.permission = permission.permission
            this.accountId = permission.accountId
        } else if(permission.groupId !== null) {
            this.permission = permission.permission
            this.groupId = permission.groupId
        } else {
            throw new Error('accountId or permissionId must exist')
        }
    }
}

const defaultRtFilePermission = () => {
    return new RtFilePermission({
        permission: 0b110,
    })
}

interface IParam {
    absolutePath: string
    type?: RT_FILE_TYPE
    content?: string
}

// todo 除非单独设置了权限，否则直接用默认权限  如果新增了账户，那么直接使用默认权限
export class RtFile {
    id?: number
    absolutePath: string
    url?: string
    level: number
    permission: Array<RtFilePermission>
    createTime: Date
    updateTime: Date
    type: RT_FILE_TYPE
    isDeleted: boolean
    shareLink: string
    content: string
    constructor(params: IParam) {
        this.absolutePath = params.absolutePath
        this.level = 0
        let p = path.normalize(params.absolutePath)
        for(let i = 0;i < p.length; i++) {
            if(p[i] === '/') {
                this.level ++
            }
        }
        if(params.type === RT_FILE_TYPE.FOLDER) {
            this.level--
        }
        this.content = params.content || ''
        this.type = params.type || RT_FILE_TYPE.FILE
        this.permission = []
        this.createTime = new Date()
        this.updateTime = new Date()
        this.isDeleted = false
        this.shareLink = null
        this.url = null
    }
}

