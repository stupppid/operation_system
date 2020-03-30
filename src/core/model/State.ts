export class RtState {
    id?: number
    name: string // 程序名 name.stateName.key
    accountId?: number // 绑定的用户名，不为空就是根据account单独设置的
    setting: any // 程序配置，程序自己使用获取配置

    constructor(name:string, accountId: number, setting: any) {
        this.name = name
        this.accountId = accountId
        this.setting = setting
    }
}
