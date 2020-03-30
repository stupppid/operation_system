import {instance} from "../annotation";
import AccountService from "../service/AccountService";
import {ACCOUNT_TYPE, RtAccount} from "../model/Account";
import Dexie from "dexie";

@instance
export class AccountController {
    private accountService:AccountService = new AccountService()

    addAccount(name: string, password: string, info: Map<string, string> = new Map<string, string>(), group: string) {
        return this.accountService.addAccount(
            name,
            password,
            info,
            group
        )
    }

    addGroup(name: string, info: Map<string, string> = new Map<string, string>()) {
        return this.accountService.addGroup(name, info)
    }



    login(name: string, password: string): Dexie.Promise<RtAccount | undefined> {
        return this.accountService.login(name, password)
    }
}
