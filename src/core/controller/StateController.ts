import {instance} from "../annotation";
import Dexie from "dexie";
import StateService from "../service/StateService";
import {RtState} from "../model/State";

@instance
export class StateController {
    stateService: StateService = new StateService()

    getState({name, accountId}:{name:string, accountId?:number}):Dexie.Promise<RtState | undefined> {
        return this.stateService.getState({name, accountId})
    }

    setState({name, accountId}:{name:string, accountId?:number}, setting):Dexie.Promise<number> {
        return this.stateService.setState({name, accountId}, setting)
    }

    putState({name, accountId}:{name:string, accountId?:number}, setting):Dexie.Promise<number> {
        return this.stateService.putState({name, accountId}, setting)
    }

    deleteState({name, accountId}:{name:string, accountId?:number}) {
        return this.stateService.deleteState({name, accountId})
    }
}
