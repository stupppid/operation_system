import {CommonInputHandler} from "../CommonInputHandler";
import {InputProxy} from "../InputProxy";
import {IStore} from "../../index";
import {autorun} from "mobx";


/**
 * handler可以从inputProxy中获取stdin和stdout
 * 从store中获取数据
 */
export default class CommandHandler extends CommonInputHandler{
    inputProxy: InputProxy;
    store:IStore  // 文件 文件内容 账户 环境变量 cs 的数据
    inputEl:HTMLTextAreaElement

    protected stdinSeek:number = 0
    protected stdinLength: number = 0
    protected commandHandler:Function = function(){}

    constructor(store:IStore, inputEl:HTMLTextAreaElement, inputProxy: InputProxy, commandHandler?:Function) {
        super(store, inputEl, inputProxy)
        this.commandHandler = commandHandler
        this.setAutoRuns()
    }

    protected setAutoRuns() {
        autorun(() => {
            this.print(this.inputProxy.stdout)
        })
    }

    protected get stdin() {
        if(this.stdinLength < 1){
            return ''
        }
        return this.inputEl.value.substr(-this.stdinLength)
    }

    handleKeyDown(e: KeyboardEvent): void {
        super.handleKeyDown(e);
        if(e.key.length > 1) {
            switch (e.key) {
                case 'Enter':
                    e.preventDefault()
                    this.commandHandler(this.stdin)
                    this.stdinLength = 0
                    this.stdinSeek = 0
                    break
                case 'Tab':
                    e.preventDefault()
                    // todo 智能提示
                    break
                case "Down": // IE/Edge specific value
                case "ArrowDown":
                    e.preventDefault()
                    // todo history下一条数据
                    break;
                case "Up": // IE/Edge specific value
                case "ArrowUp":
                    e.preventDefault()
                    // todo history上一条数据
                    break;
                case "Left": // IE/Edge specific value
                case "ArrowLeft":
                    if (this.stdinSeek < this.stdinLength) {
                        this.stdinSeek += 1
                    } else {
                        e.preventDefault()
                    }
                    break;
                case "Right": // IE/Edge specific value
                case "ArrowRight":
                    if (this.stdinSeek > 0) {
                        this.stdinSeek -= 1
                    }
                    break;
                case "Backspace":
                    if(this.stdinSeek >= this.stdinLength) {
                        e.preventDefault()
                    } else {
                        this.stdinLength--
                    }
                    break
                default:
                    e.preventDefault()
                    break
            }
        } else {
            this.stdinLength++
        }
    }
}