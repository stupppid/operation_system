import {RtFile} from '../../model/File';
import DBVersions from '../../../config/DBVersions'
import {instance} from "../../annotation";
import {RtAccount} from "../../model/Account";
import 'dexie-observable';
import {RtState} from "../../model/State";
import Dexie from "dexie";

/**
 * files等数据声明存在 /src/config/DBVersions.js 中，需要加个单元测试防止对不上
 */
@instance
export class RtDB extends Dexie{
    files: Dexie.Table<RtFile, number>
    accounts: Dexie.Table<RtAccount, number>
    states: Dexie.Table<RtState, number>

    constructor() {
        super("RtDB");
        if(this.states === undefined) {
            this.init()
        }
    }

    init() {
        for(let i = 0; i < DBVersions.length; i++) {
            this.version(i + 1).stores(DBVersions[i]);
        }
        this.files.mapToClass (RtFile);
        this.accounts.mapToClass (RtAccount);
        this.states.mapToClass (RtState);
    }
}
