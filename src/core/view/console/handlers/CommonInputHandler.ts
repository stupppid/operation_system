import {IStore} from "../index";
import {InputProxy} from "./InputProxy";

export interface IInputHandler {
    handleKeyUp(e:KeyboardEvent):void
    handleKeyDown(e:KeyboardEvent):void
    handleInput(e:InputEvent):void
    handleKeyPress(e:KeyboardEvent):void
    destroy():void
    init():void
}

/**
 * 一个session只有一个stdin
 */
export class CommonInputHandler implements IInputHandler{
    store:IStore
    inputEl:HTMLTextAreaElement
    inputProxy: InputProxy

    constructor(store?:IStore, inputEl?:HTMLTextAreaElement, inputProxy?: InputProxy) {
        this.store = store
        this.inputEl = inputEl
        this.inputProxy = inputProxy
    }

    init():void {}
    destroy():void {}
    handleKeyDown(e: KeyboardEvent): void {}
    handleKeyUp(e: KeyboardEvent): void {}
    handleInput(e: InputEvent): void {}
    handleKeyPress(e: KeyboardEvent): void {}

    print(content: string): void {
        this.inputProxy.stdout = content
        this.inputEl.value += this.inputProxy.stdout
        this.inputEl.scrollTo({
            top: this.inputEl.scrollHeight
        })
        this.inputProxy.stdout = ''
    }
}