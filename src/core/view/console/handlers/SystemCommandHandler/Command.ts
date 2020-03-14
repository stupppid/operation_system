import {FileController} from "../../../../controller";
const path = require('path')

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
        console.log(path.resolve('/c/a/e/t', '../s'))
        // let pwd = await Command.run('pwd')
        // // if(this.fileController.getChildren)
        // if(Command.commands[str] && validatenull(Command.commands[str].path)) {
        //     return new Promise(Command.commands[str].run)
        // }
        // Command.commands[str] = {
        //     path: await Command.run('pwd'),
        //
        // }
        return new Promise(function (resolve:(cs:CommandResult)=>any, reject) {
            resolve({
                code: 0,
                msg: 'success'
            })
        })
    }
}