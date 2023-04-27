//获取分页信息
export default function getTotalPage(pageSize: number, total: number): number {
    return Math.ceil(total / pageSize)
};