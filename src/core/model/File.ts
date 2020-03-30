import * as path from "path";
import {IParmas} from "../../util/store";

export enum RT_FILE_TYPE {
    FILE,
    FOLDER,
    LINK,
    RUNNABLE,
}

export const MAX_FILE_LEVEL = 100

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

export interface IParam {
    absolutePath?: string
    type?: RT_FILE_TYPE
    content?: string
    permission?: Array<any>
    shareLink?: string
    linkPath?: string
    owner?: string
    group?: string
}

// todo 除非单独设置了权限，否则直接用默认权限  如果新增了账户，那么直接使用默认权限
export class RtFile {
    id?: number
    absolutePath: string // 绝对路径
    linkPath?: string // 软链接地址
    level: number // 第几层级，由绝对路径split('/')获取，用于和绝对路径一起查找文件
    permission: Array<RtFilePermission> // 权限 设置权限后会添加上，普通情况下是默认权限
    createTime: Date
    createBy: string
    updateTime: Date
    updateBy: string
    type: RT_FILE_TYPE // 文件类型
    isDeleted: boolean // 删除
    shareLink: string // 分享链接
    content: string // 内容
    permissionAccounts: Array<number> // 绑定权限的用户id，删除用户或用户组的时候，根据该字段更新
    owner: string
    group: string

    static readonly READONLY_ATTR = [
        'level', 'type', 'createTime', 'createBy', 'updateTime', 'updateBy', 'permissionAccounts'
    ]

    constructor(params: IParam | RtFile, additionalParams?:any) {
        if(params instanceof RtFile) {
            return new RtFile(Object.assign({
                absolutePath: params.absolutePath,
                type: params.type,
                permission: params.permission,
                content: params.content,
                linkPath: params.linkPath,
                permissionAccounts: params.permissionAccounts,
                // shareLink: params.shareLink
            },additionalParams))
        }
        if(params.absolutePath === undefined) {
            throw new Error('absolutePath must be set')
        }
        this.absolutePath = params.absolutePath
        if(params.absolutePath === '/') {
            this.level = 1
        } else {
            this.level = params.absolutePath.split('/').length
        }
        if(this.level > MAX_FILE_LEVEL) {
            throw new Error(`path deep cannot be above ${MAX_FILE_LEVEL}`)
        }
        this.content = params.content || ''
        this.type = params.type || RT_FILE_TYPE.FILE
        this.permission = [] || params.permission
        this.createTime = new Date()
        this.updateTime = new Date()
        this.isDeleted = false
        this.shareLink = params.shareLink
        this.linkPath = params.linkPath
        this.owner = params.owner
        this.group = params.group
    }
}

