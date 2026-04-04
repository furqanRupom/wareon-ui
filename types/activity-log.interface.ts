export interface IActivityLog {
    _id:string,
    time:string,
    summary:string,
    action: string,
    entity: Record<string,any>,
    entityId:string,
    user:Record<string,any>,
    meta: Record<string, any>,
    createdAt: string,
}

export interface IActivityLogs {
    data: IActivityLog[]
}