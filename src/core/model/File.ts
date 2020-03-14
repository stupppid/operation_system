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

// todo 除非单独设置了权限，否则直接用默认权限  如果新增了账户，那么直接使用默认权限
export class RtFile {
    id?: number
    absolutePath: string
    url?: string
    level: number
    contentId?: number
    name: string
    permission: Array<RtFilePermission>
    createTime: Date
    updateTime: Date
    type: RT_FILE_TYPE
    isDeleted: boolean
    isHide: boolean
    shareLink: string
    content: string
    constructor(params: any) {
        this.name = params.name
        this.absolutePath = params.absolutePath
        this.contentId = params.contentId || null
        this.type = params.type || RT_FILE_TYPE.FILE
        this.permission = []
        this.createTime = new Date()
        this.updateTime = new Date()
        this.isDeleted = false
        this.isHide = false
        this.shareLink = null
        this.url = null
        this.level = params.level
    }
}

