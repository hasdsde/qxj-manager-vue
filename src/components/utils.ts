import {toRaw} from "vue";
import {exportFile, useQuasar} from "quasar";
import {CommonFail, CommonSuccess} from "components/commonResults";
import {useRouter} from "vue-router";
import {api} from "boot/axios";

const $q = useQuasar()
const rt = useRouter()

//将当前行数据转换为js对象
export function rowsToObject(row: any): any {
    return toRaw(row)
}

//一般操作
export function commonCheckResponse(res: any) {
    if (res.code == '200') {
        if (allNull(res.msg)) {
            CommonSuccess('操作成功')
        } else {
            CommonSuccess(res.msg)
        }
    } else {
        CommonFail(res.msg)
    }
}

//用于去掉T的日期而且不改变原来的
export function getHumanDate(date: string) {
    return date.replace('T', ' ')
}

//测试用
export function Console(value: any) {
    console.log(value)

};

//递归调用删除children
export function LoopDeleteChildren(nodes: any) {
    return nodes.forEach((item: any) => {
        item.selected = false
        if (item.children.length > 0 || allNull(item.children)) {
            LoopDeleteChildren(item.children)
        } else {
            return
        }
    })
}

//这个用于表格中的option选项
export function getLabelFromId(value: any, itemCol: any): string {
    let result = ""
    value.col.option.forEach((item: any) => {
        if (item.value == value.row[itemCol]) {
            result = item.label
        }
    });
    return result
}

//这个用于表格中的option选项
export function getColorFromId(value: any, itemCol: any): string {
    let result = ""
    value.col.option.forEach((item: any) => {
        if (item.value == value.row[itemCol]) {
            result = item.color
        }
    });
    return result
}

//获取用户信息
export function getUserInfo() {
    if (localStorage.getItem("userInfo") == null) {
        CommonFail('用户未登录')
        rt.push('/Login')
    } else {
        //@ts-ignore
        return JSON.parse(localStorage.getItem("userInfo").toString())
    }
}

//判断是不是全是空的
export function allNull(item: any): boolean {
    return item == null || undefined || item == '';
}

//导出表格
export default function exportTable(columns: any, rows: any, fileName: string) {
    // naive encoding to csv format
    // @ts-ignore
    const content = [columns.map((col: any) => wrapCsvValue(col.label))].concat(
        rows.value.map((row: any) => columns.map((col: any) => wrapCsvValue(
            typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
            col.format,
            row
        )).join(','))
    ).join('\r\n')

    const status = exportFile(
        fileName + '.csv',
        content,
        {
            'mimeType': 'text/csv',
            'byteOrderMark': '\uFEFF',
            'encoding': 'utf-8'
        }
    )
    if (status !== true) {
        $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
        })
    }
}

//导出表格
function wrapCsvValue(val: any, formatFn: any, row: any) {
    let formatted = formatFn !== void 0
        ? formatFn(val, row)
        : val

    formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`
}


//================================================年级专业==================================================


//根据学院获取专业
export async function getMajorId(collegeId: number): Promise<any> {
    return api.get('/class/major?collegeId=' + collegeId)
}

//根据学院获取年级
export async function getGradeId(majorId: number, collegeId: number) {
    return api.get('/class/grade2?majorId=' + majorId + '&collegeId=' + collegeId)
}

//根据专业和年级获取班级
export async function getClass(majorId: number, gradeId: number) {
    return api.get('/class', {
        params: {'majorId': majorId, 'gradeId': gradeId}
    })
}


//获取全部学院信息
export async function getColleges() {
    return api.get('/class/college')
}