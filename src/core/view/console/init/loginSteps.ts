/**
 * 登录
 */
import {IStore} from "../index";
import {IStep} from "../handlers/SystemCommandHandler/StepHandler";

export function *loginSteps(store:IStore) {
    let step:IStep[]
    let wrongPasswordTime = 0
    let failed = false
    let startSteps = [
        {
            tip: () => {
                if(failed) {
                    wrongPasswordTime++
                    return `\n\ninput wrong password\nlogin: `
                } else {
                    return '\nlogin: '
                }
            },
            answer: function (answer:string):boolean {
                if(answer.trim() !== '') {
                    console.log('step2')
                } else {
                    failed = true
                }
                return true
            }
        },
        {
            tip: "\npassword: ",
            answer: function (answer:string):boolean {
                if(answer.trim() !== '') {
                    console.log('step2')
                } else {
                    step.push(...startSteps)
                }
                return true
            }
        }
    ]
    step = [...startSteps]
    while (step.length > 0) {
        yield step.shift()
    }
}