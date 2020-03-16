import state from "../controller/state";
import * as path from 'path'

export default {
    run(...args) {
        state.setItem('account.currentPath',  path.resolve(state.getItem('account.currentPath'), args[0]))
        return {
            code: 0,
            msg: ''
        }
    }
}