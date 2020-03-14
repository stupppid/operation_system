import {IState} from "../controller/StateController";

export enum ACCOUNT_TYPE {
    ROOT,
    GROUP,
    ACCOUNT,
}

export class RtAccount {
    id?: number
    type: ACCOUNT_TYPE
    name: string
    systemSetting: IState
}