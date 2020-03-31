import {getStore, setStore} from "../../util/store";
import {RtDB} from "../service/RtDB";
import {StateController} from "./StateController";

const STATE_NAME = 'rtState'
const stateController = new StateController()

enum STORE_TYPE{
    SESSION = 1,
    LOCAL = 2,
    DATABASE = 3
}

function getStoreType(type: STORE_TYPE): any {
    return type === STORE_TYPE.SESSION ? 'session' : ''
}

function getCurrentAccountId() {
    return this.getItem('$CURRENT_ACCOUNT.id',STORE_TYPE.SESSION)
}

export const state = {
    setItem: async function (stateKey: string, stateValue: any, type: STORE_TYPE = STORE_TYPE.DATABASE, current: boolean = false): Promise<void> {
        switch (type) {
            case STORE_TYPE.DATABASE:
                const accountId = current ? getCurrentAccountId() : null
                let keyArr = stateKey.split('.')
                let name = keyArr.shift()
                let setting:any
                if(keyArr.length === 0) {
                    setting = stateValue
                } else {
                    setting = {
                        [keyArr.join('.')]: stateValue
                    }
                }
                await stateController.setState({name, accountId}, setting)
                if (keyArr.length > 1) {
                    await stateController.setState({name, accountId}, setting)
                } else {
                    await stateController.putState({name, accountId}, setting)
                }
                break
            case STORE_TYPE.LOCAL:
            case STORE_TYPE.SESSION:
                const storeType = getStoreType(type)
                let state: Object = getStore({
                    name: STATE_NAME,
                    type: storeType
                }) || {}
                RtDB.setByKeyPath(state, stateKey, stateValue)
                setStore({
                    name: STATE_NAME,
                    content: state,
                    type: storeType
                })
                break
        }
    },

    getItem: async function (stateKey: string, type: STORE_TYPE = STORE_TYPE.DATABASE, current: boolean = false): Promise<any> {
        switch (type) {
            case STORE_TYPE.DATABASE:
                const accountId = current ? getCurrentAccountId() : null
                let keyArr = stateKey.split('.')
                let name = keyArr.shift()
                let obj = await stateController.getState({
                    name,
                    accountId
                })
                if (obj === undefined) {
                    // throw new Error(`key ${name} was not found, key path provided is ${stateKey}`)
                    return undefined
                } else {
                    return RtDB.getByKeyPath(obj.setting, keyArr.join('.'))
                }
            case STORE_TYPE.LOCAL:
            case STORE_TYPE.SESSION:
                let state = getStore({
                    name: STATE_NAME,
                    type: getStoreType(type)
                }) || {}
                return RtDB.getByKeyPath(state, stateKey)
        }
    },

    updateItem: function () {
        stateController
    },

    addItem: function () {
        stateController
    }
}
export default state
