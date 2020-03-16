import {instance} from "../annotation";
import AccountService from "../service/AccountService";
import {ACCOUNT_TYPE} from "../model/Account";

@instance
export default class AccountController {
    private accountService:AccountService = new AccountService()

    addAccount(name: string, password: string, info: Map<string, string> = new Map<string, string>()) {
        return this.accountService.addAccount(
            name,
            password,
            info
        )
    }

    addGroup(name: string, info: Map<string, string> = new Map<string, string>()) {
        return this.accountService.addGroup(name, info)
    }

}