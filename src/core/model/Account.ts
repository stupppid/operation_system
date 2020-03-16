import {IState} from "../controller/state";
import {defaultSetting} from "../service/AccountService";
import * as md5 from 'md5'

export enum ACCOUNT_TYPE {
    ROOT,
    GROUP,
    ACCOUNT,
}

export class RtAccount {
    id?: number
    type: ACCOUNT_TYPE
    name: string
    password?: string
    info: Map<string, string>
    setting: IState

    constructor(type, name, password, info = new Map<string, string>(), setting:any = {}) {
        this.type = type
        this.name = name
        this.password = md5(password)
        this.info = info
        this.setting = setting
    }
}