import * as md5 from 'md5'

export enum ACCOUNT_TYPE {
    ROOT,
    GROUP,
    ACCOUNT,
}

interface IParam {
    type: ACCOUNT_TYPE,
    name:string,
    password?:string,
    info?: Map<string, string>,
    setting?:any,
    group?:string
}

export class RtAccount {
    id?: number
    type: ACCOUNT_TYPE
    name: string
    password?: string
    info: Map<string, string>
    setting: any
    group: string

    constructor({type, name, password, group, info = new Map<string, string>(), setting = {}}:IParam) {
        this.type = type
        this.name = name
        if(type !== ACCOUNT_TYPE.GROUP) {
            this.password = md5(password)
        }
        this.info = info
        this.setting = setting
        this.group = group
    }
}
