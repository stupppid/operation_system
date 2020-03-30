import {instance} from "../annotation";
import {RtDB} from "./RtDB";
import Dexie from "dexie";
import {RtState} from "../model/State";
export const DEFAULT_STATE_ACCOUNTID = 65534

@instance
export default class StateService {
    protected state = new RtDB().states

    getState({name, accountId}: { name: string, accountId: number }): Dexie.Promise<RtState | undefined> {
        return this.state.where({name, accountId: accountId || DEFAULT_STATE_ACCOUNTID}).first()
    }

    setState({name, accountId}: { name: string, accountId: number },changes: { [keyPath: string]: any }) {
        const setting = Object.keys(changes).reduce((prev, key) => {
            prev[`setting.${key}`] = changes[key]
            return prev
        }, {})
        return this.state.where({name, accountId: accountId || DEFAULT_STATE_ACCOUNTID}).modify(setting)
    }

    putState({name, accountId}: { name: string, accountId: number },setting: any):Dexie.Promise<number> {
        return this.state.where({name, accountId: accountId || DEFAULT_STATE_ACCOUNTID}).primaryKeys().then(r => {
            if(r[0] === undefined) {
                return this.state.put(new RtState(name, accountId || DEFAULT_STATE_ACCOUNTID, setting))
            } else {
                return this.state.where({name, accountId: accountId || DEFAULT_STATE_ACCOUNTID}).modify({
                    setting
                })
            }
        })
    }

    deleteState({name, accountId}: { name: string, accountId: number }) {
        return this.state.where({name, accountId: accountId || DEFAULT_STATE_ACCOUNTID}).delete()
    }
}
