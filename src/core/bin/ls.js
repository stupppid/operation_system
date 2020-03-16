import state from "../controller/state";

export default {
    run() {
        return {
            code: 0,
            msg: state.getItem('account.currentPath')
        }
    }
}