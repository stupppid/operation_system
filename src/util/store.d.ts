interface IParmas {
    name?:string
    content?: object
    type?:string
}
export declare function setStore(params: IParmas):void
export declare function getStore<T>(params: IParmas):T
export declare function removeStore(params: IParmas):void
export declare function getAllStore(params: IParmas):void
export declare function clearStore(params: IParmas):void