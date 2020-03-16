import {FileController} from "../../../../controller";
import commands from "../../../../bin";

interface ICommand {
    [prop:string]: {
        path?: string
        run?: (any) => any
        help?: (any) => any
    }
}

interface CommandResult{
    code: number
    msg: string
}


/**
 * 多个view都可以共享
 */
export class Command {
    private fileController: FileController
    static commands:ICommand
    static async run(str: string): Promise<any> {
        // todo 先从当前文件夹下找
        //  loadScript -> 已经加载就直接用本地的静态方法 | 本地store读取文件 | 远程获取

        return new Promise(function (resolve:(cs:CommandResult)=>any, reject) {
            let args = str.split(/\s+/)
            let func = args.shift()
            resolve(commands[func].run(...args))
            // import('/src/core/bin/ls.js').then(r => {
            //     resolve(r.default.run(args))
            // })

        })
    }
}