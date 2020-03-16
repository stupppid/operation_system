import {instance} from "../annotation";
import {RtDB} from "./RtDB";
import {ACCOUNT_TYPE} from "../model/Account";

const dfs = []
dfs[ACCOUNT_TYPE.ACCOUNT] = {}
dfs[ACCOUNT_TYPE.GROUP] = {}
dfs[ACCOUNT_TYPE.ROOT] = {}

export const defaultSetting = dfs
@instance
export default class AccountService {
    protected accounts = new RtDB().accounts

    addAccount(name: string, password: string, info: Map<string, string> = new Map<string, string>()) {
        return this.accounts.add({
            name: name,
            password: password,
            type: ACCOUNT_TYPE.ACCOUNT,
            info: info,
            setting: defaultSetting[ACCOUNT_TYPE.ACCOUNT]
        })
    }

    addGroup(name: string, info: Map<string, string> = new Map<string, string>()) {
        return this.accounts.add({
            name: name,
            password: null,
            type: ACCOUNT_TYPE.GROUP,
            info: info,
            setting: defaultSetting[ACCOUNT_TYPE.GROUP]
        })
    }
}