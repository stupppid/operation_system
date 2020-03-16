import {getStore, setStore} from "../../util/store";
import {RtDB} from "../service/RtDB";

export interface IState {
    [name:string]: Map<string, string>
}
const STATE_NAME = 'state'

const state = {
    setItem: function(stateKey, stateValue) {
        let state:Object = getStore({
            name: STATE_NAME
        }) || {}
        RtDB.setByKeyPath(state, stateKey, stateValue)
        setStore({
            name: STATE_NAME,
            content: state
        })
    },

    getItem: function(stateKey):any {
        let state = getStore({
            name: STATE_NAME
        }) || {}
        return RtDB.getByKeyPath(state, stateKey)
    }
}
export default state