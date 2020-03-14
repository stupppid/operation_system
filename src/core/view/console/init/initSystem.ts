import {IStore} from "../index";

export interface IInitSystemObject {
    root: {
        name: string
        password: string
    }
    device: {
        name: string
    }
    init: boolean
}

// todo store 应该有直接全局直接用的地方
function initSystem(initObject: IInitSystemObject, store:IStore): (initObject:IInitSystemObject, store:IStore)=>any {
    if(initObject.init) {

    }
    return
}

export default initSystem