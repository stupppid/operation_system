import {SYSTEM_APP} from "../consts";
import {CommonInputHandler, IInputHandler} from "./CommonInputHandler";
import {observable} from "mobx";

/**
 * 要保证一个session上 只有一个handler
 * inputProxy 会存取当前app
 */
export class InputProxy {
    @observable stdin:string = ''
    @observable stdout:string = ''
    @observable stderr:string = ''
    handlers:Array<IInputHandler> = []
    private currentHandler: IInputHandler

    constructor(handler?: IInputHandler) {
        this.currentHandler = handler
    }

    setHandler(handler: IInputHandler) {
        this.handlers.push(handler)
        this.currentHandler = handler
        this.currentHandler.init()
    }

    popHandler() {
        if(this.handlers.length > 1){
            this.currentHandler.destroy()
            this.currentHandler = this.handlers.pop()
            this.currentHandler.init()
        }
    }

    replaceHandler(handler: CommonInputHandler) {
        this.currentHandler.destroy()
        this.currentHandler = handler
        this.currentHandler.init()
    }

    handleInput(e:InputEvent) {
        this.currentHandler.handleInput(e)
    }
    handleKeyDown(e:KeyboardEvent) {
        this.currentHandler.handleKeyDown(e)
    }
    handleKeyUp(e:KeyboardEvent) {
        this.currentHandler.handleKeyUp(e)
    }
    handleKeyPress(e:KeyboardEvent) {
        this.currentHandler.handleKeyPress(e)
    }
}