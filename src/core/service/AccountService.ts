import {instance} from "../annotation";
import {RtDB} from "./RtDB";
import {ACCOUNT_TYPE, RtAccount} from "../model/Account";
import Dexie from "dexie";
import md5 = require("sha256");

const dfs = []
dfs[ACCOUNT_TYPE.ACCOUNT] = {}
dfs[ACCOUNT_TYPE.GROUP] = {}
dfs[ACCOUNT_TYPE.ROOT] = {}
// fixme 这个应该是getItem获取$SYSTEM的设置
const defaultGroup = {
    name: '1'
}

export const defaultSetting = dfs
@instance
export default class AccountService {
    protected accounts = new RtDB().accounts

    addAccount(name: string, password: string, info: Map<string, string> = new Map<string, string>(), group?: string) {
        return this.accounts.add(new RtAccount({
            name: name,
            password: password,
            type: ACCOUNT_TYPE.ACCOUNT,
            info: info,
            setting: defaultSetting[ACCOUNT_TYPE.ACCOUNT],
            group: defaultGroup.name
        }))
    }

    addGroup(name: string, info: Map<string, string> = new Map<string, string>()) {
        return this.accounts.add(new RtAccount({
            name: name,
            type: ACCOUNT_TYPE.GROUP,
            info: info,
            setting: defaultSetting[ACCOUNT_TYPE.GROUP]
        }))
    }

    login(name: string, password: string):Dexie.Promise<RtAccount | undefined> {
        return this.accounts.where({
            name, password: md5(password)
        }).and(v => v.type !== 1).first()
    }
}
