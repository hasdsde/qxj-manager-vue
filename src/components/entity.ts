// 分页类
export class Page {
    currentPage: number
    pageSize: number
    total: number
    
    //这个不存在set，就当方法存在吧
    // private _totalPage: number

    constructor(currentPage: number, pageSize: number, total: number) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.total = total;
    }

    get totalPage(): number {
        return Math.ceil(this.total / this.pageSize)
    }
}

