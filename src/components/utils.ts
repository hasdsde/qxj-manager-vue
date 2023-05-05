import {toRaw} from "vue";

//将当前行数据转换为js对象
export function rowsToObject(row: any): any {
    return toRaw(row)
}