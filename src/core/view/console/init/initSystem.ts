import {IStore} from "../index";
import { RtDB } from "../../../service/RtDB";
import {RT_FILE_TYPE, RtFile} from "../../../model/File";
import {ACCOUNT_TYPE, RtAccount} from "../../../model/Account";
import state from "../../../controller/state";

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
async function initSystem(initObject: IInitSystemObject) {
    const db = new RtDB()
    await db.accounts.clear()
    await db.files.clear()
    localStorage.clear()
    sessionStorage.clear()
    if (initObject.init) {
        await db.transaction('rw', [db.accounts, db.files], function () {
            db.accounts.add(new RtAccount(ACCOUNT_TYPE.ROOT, initObject.root.name, initObject.root.password)).then((r) => {
                db.files.bulkAdd([new RtFile({
                    absolutePath: '/',
                    type: RT_FILE_TYPE.FOLDER
                }), new RtFile({
                    absolutePath: '/home',
                }), new RtFile({
                    absolutePath: `/home/${initObject.root.name}`,
                }), new RtFile({
                    absolutePath: '/etc',
                })]).then()
            })
        }).then(r => {
            state.setItem('device.name', initObject.device.name)
            state.setItem('account.name', initObject.root.name)
            state.setItem('account.currentPath', `/home/${initObject.root.name}`)
        }).catch(e => {
            console.error(e)
        })
    }
}

export default initSystem