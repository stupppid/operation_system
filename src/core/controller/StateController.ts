import {getStore, setStore} from "../../util/store";
import {instance} from "../annotation";

export interface IState {
    [name:string]: Map<string, string>
}

export class State {
    getState(str: string, firstName:string):string {
        let stateArr = str.split(' ')
        let result
        const state = getStore({
            name: firstName
        })
        stateArr.unshift()
        try {
            while (stateArr.length > 0) {
                result = state[stateArr[0]]
                stateArr.unshift()
            }
        } catch (e) {
            // throw new Error(`state ${state} doesn't exist!`)
            return null
        }
        return result
    }
    setState(key: string, value: object) {
        setStore({
            name: key,
            content: value
        })
    }
}

@instance
export default class StateController {
    private systemState: State = new State()
    private appState: State = new State()
    constructor(){}

    setState(stateKey, stateValue, IS_SYSTEM:boolean = false) {
        const appName = IS_SYSTEM ? 'system' : this.systemState.getState('currentApp', 'system')
        this.appState.setState(appName, {
            stateKey: stateValue
        })
    }

    getState(stateKey, IS_SYSTEM:boolean = false):any {
        const appName = IS_SYSTEM ? 'system' : this.systemState.getState('currentApp', 'system')
        return this.appState.getState(stateKey, appName)
    }
}