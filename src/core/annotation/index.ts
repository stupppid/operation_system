const instances = new Map<any, any>()

/**
 * 构造一个实例
 * @param constructor
 */
export function instance<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        constructor(...args:any[]) {
            super(args)
            let instance = instances.get(constructor)
            if(instance !== undefined) {
                return instance
            } else {
                instance = new constructor(args)
                instances.set(constructor, instance)
            }
            return instances.get(constructor)
        }
    }
}

/**
 * 混入
 * @param constructor
 */
export function mixin(obj: Object) {
    return function (target) {
        return Object.assign(target, obj)
    }
}

export function functionWrap(obj: Object) {
    return function (target) {
        return Object.assign(target, obj)
    }
}
