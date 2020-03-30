import './index.css'
import * as template from './index.template.xhtml'
import {InputProxy} from "./handlers/InputProxy";
import StepHandler from "./handlers/SystemCommandHandler/StepHandler";
import {initSystemStep} from "./init/initSystemSteps";
import SystemCommandHandler from "./handlers/SystemCommandHandler/CommandHandler/SystemCommandHandler";
import {loginSteps} from "./init/loginSteps";

class consoleView {
    constructor(inputProxy, store, root) {
        this.inputProxy = inputProxy
        this._addEventListener(root)
        inputProxy.store = store
        inputProxy.inputEl = this.inputEl
    }

    _addEventListener(root) {
        root.innerHTML = template.default
        this.inputEl = root.querySelector('.console-view')
        this.inputEl.addEventListener('keydown', (e) => this.inputProxy.handleKeyDown(e))
        this.inputEl.addEventListener('input', (e) => this.inputProxy.handleInput(e))
        this.inputEl.addEventListener('keyup', (e) => this.inputProxy.handleKeyUp(e))
        this.inputEl.addEventListener('input', (e) => this.inputProxy.handleInput(e))
        this.inputEl.addEventListener('mousedown', (e) => this.inputProxy.handleMouseDown(e))
        this.inputEl.addEventListener('mouseup', (e) => this.inputProxy.handleMouseUp(e))
        this.inputEl.addEventListener('click', (e) => this.inputProxy.handleClick(e))
    }
}

export default {
    async run(store, root) {
        // 所有input事件交给inputProxy来处理, 一个consoleView的inputProxy是唯一的
        let inputProxy = new InputProxy()
        let cv = new consoleView(inputProxy, store, root)
        if (await store.state.getItem('$SYSTEM') === undefined) {
            inputProxy.setHandler(new StepHandler(store, cv.inputEl, inputProxy, initSystemStep, new SystemCommandHandler(store, cv.inputEl, inputProxy)))
        } else if (await store.state.getItem('$CURRENT_ACCOUNT', 1) === undefined) {
            inputProxy.setHandler(new StepHandler(store, cv.inputEl, inputProxy, loginSteps, new SystemCommandHandler(store, cv.inputEl, inputProxy)))
        } else {
            inputProxy.setHandler(new SystemCommandHandler(store, cv.inputEl, inputProxy))
        }
    }
}
