import './index.css'
import * as template from './index.template.xhtml'
import {InputProxy} from "./handlers/InputProxy";
import StepHandler from "./handlers/SystemCommandHandler/StepHandler";
import {initSystemStep, loginSteps} from "./init/initSystemSteps";
import CommandHandler from "./handlers/SystemCommandHandler/CommandHandler";
import SystemCommandHandler from "./handlers/SystemCommandHandler/SystemCommandHandler";

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
    }
}

export default {
    run(store, root) {
        // 所有input事件交给inputProxy来处理, 一个consoleView的inputProxy是唯一的
        let inputProxy = new InputProxy()
        let cv = new consoleView(inputProxy, store, root)
        // todo 应该从配置中读取是哪个app
        inputProxy.setHandler(new StepHandler(store, cv.inputEl, inputProxy, initSystemStep, new SystemCommandHandler(store, cv.inputEl, inputProxy)))
    }
}