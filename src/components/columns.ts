//学生列表
export const registerColumns: any = [
    {name: 'id', align: 'center', label: '学生id', field: 'id', type: 'primary-key'},
    {name: 'name', align: 'center', label: '姓名', field: 'name'},
    {name: 'number', align: 'center', label: '学号', field: 'number'},
    {name: 'classId', align: 'center', label: '班级id', field: 'classId'},
    {name: 'phone', align: 'center', label: '电话', field: 'phone'},
    {name: 'emergencyPhone', align: 'center', label: '紧急电话', field: 'emergencyPhone'},
    {name: 'crateTime', align: 'center', label: '创建时间', field: 'crateTime'},
    {
        name: 'status', align: 'center', label: '学生状态', field: 'status', option: [
            {label: '正常', value: 1, color: 'primary'},
            {label: '异常', value: 2, color: 'red'}
        ]
    },
    {
        name: 'enable', align: 'center', label: '账号状态', field: 'enable', option: [
            {label: '待审批', value: 0, color: 'orange'},
            {label: '可用', value: 1, color: 'primary'},
            {label: '已删除', value: 2, color: 'orange'},
            {label: '拒绝', value: 3, color: 'red'}
        ]
    },
    {name: 'handle', align: 'center', label: '操作', field: 'handle'},
]
export const studentColumns: any = [
    {name: 'id', align: 'center', label: '学生id', field: 'id', type: 'primary-key', update: true},
    {name: 'name', align: 'center', label: '姓名', field: 'name', type: 'input', new: true, update: true},
    {name: 'number', align: 'center', label: '学号', field: 'number', type: 'number', new: true, update: true},
    {name: 'className', align: 'center', label: '班级', field: 'className', type: 'other'},
    {name: 'major', align: 'center', label: '专业', field: 'major', new: false},
    {name: 'grade', align: 'center', label: '年级', field: 'grade', new: false},
    {name: 'college', align: 'center', label: '学院', field: 'college', new: false},
    {name: 'phone', align: 'center', label: '电话', field: 'phone', type: 'number', new: true, update: true},
    {name: 'createTime', align: 'center', label: '创建时间', field: 'createTime', new: false},
    {
        name: 'emergencyPhone',
        align: 'center',
        label: '紧急电话',
        field: 'emergencyPhone',
        type: 'number',
        new: true,
        update: true
    },
    {
        name: 'status', align: 'center', label: '学生状态', field: 'status', type: 'bool', new: false, option: [
            {label: '正常', value: 1, color: 'primary'},
            {label: '异常', value: 0, color: 'red'}
        ]
    },
    {
        name: 'enable',
        align: 'center',
        label: '账号状态',
        field: 'enable',
        type: 'bool',
        new: true,
        update: true,
        option: [
            {label: '不可用', value: -1, color: 'red'},
            {label: '正常', value: 1, color: 'primary'},
        ]
    },
    {name: 'handle', align: 'center', label: '操作', field: 'handle', new: false},
]
export const teacherColumns: any = [
    {name: 'id', align: 'center', label: 'id', field: 'id', type: 'primary-key', update: true},
    {name: 'name', align: 'center', label: '姓名', field: 'name', type: 'input', new: true, update: true},
    {name: 'number', align: 'center', label: '工号', field: 'number', type: 'number', new: true, update: true},
    {name: 'college', align: 'center', label: '学院', field: 'college', type: 'input', new: true, update: true},
    {name: 'role', align: 'center', label: '角色', field: 'role', type: 'number', new: true, update: true},
    {
        name: 'enable',
        align: 'center',
        label: '账号状态',
        field: 'enable',
        type: 'bool',
        new: true,
        update: true,
        option: [
            {label: '不可用', value: 0, color: 'red'},
            {label: '正常', value: 1, color: 'primary'},
        ]
    },
    {name: 'handle', align: 'center', label: '操作', field: 'handle'},
]
export const holidayColumns: any = [
    {name: 'id', align: 'center', label: 'id', field: 'id', type: 'primary-key', update: true},
    {name: 'name', align: 'center', label: '姓名', field: 'name', type: 'input', new: false, update: true},
    {name: 'userId', align: 'center', label: '用户id', field: 'userId', type: 'input', new: true, update: true},
    {name: 'college', align: 'center', label: '学院', field: 'college', new: false},
    {name: 'className', align: 'center', label: '班级', field: 'className', new: false},
    {
        name: 'reasonType',
        align: 'center',
        label: '类型',
        field: 'reasonType',
        type: 'select',
        new: true,
        update: true,
        option: [
            {label: '病假', value: 1, color: 'secondary'},
            {label: '事假', value: 2, color: 'primary'},
            {label: '其他', value: 3, color: 'purple'}]
    },
    {name: 'imgUrl', align: 'center', label: '图片', field: 'imgUrl', type: 'input'},
    {name: 'reason', align: 'center', label: '原因', field: 'reason', type: 'input', new: true, update: true},
    {name: 'toArea', align: 'center', label: '前往地区', field: 'toArea', type: 'input', new: true, update: true},
    {
        name: 'healthy',
        align: 'center',
        label: '健康状态',
        field: 'healthy',
        type: 'select',
        new: true,
        update: true,
        option: [
            {label: '正常', value: 1, color: 'primary'},
            {label: '异常', value: 2, color: 'red'}
        ]
    },
    {
        name: 'status',
        align: 'center',
        label: '请假状态',
        field: 'status',
        type: 'select',
        new: true,
        update: true,
        option: [
            {label: '异常', value: 0, color: 'red'},
            {label: '审核中', value: 1, color: 'orange'},
            {label: '审核已通过', value: 2, color: 'primary'},
            {label: '审核拒绝', value: 3, color: 'red'},
            {label: '待销假', value: 4, color: 'orange'},
            {label: '销假未通过', value: 5, color: 'red'},
            {label: '销假超时', value: 6, color: 'red'},
            {label: '已销假', value: 7, color: 'green'},
            {label: '审核超时', value: 8, color: 'red'},
            {label: '已取消', value: 9, color: 'red'},
        ]
    },
    {name: 'fromTime', align: 'center', label: '开始时间', field: 'fromTime', type: 'time', new: true, update: true},
    {name: 'toTime', align: 'center', label: '结束时间', field: 'toTime', type: 'time', new: true, update: true},
    // {name: 'grade', align: 'center', label: '年级', field: 'grade', new: false},
    // {name: 'major', align: 'center', label: '专业', field: 'major', new: false},
    {name: 'createTime', align: 'center', label: '创建时间', field: 'createTime', type: 'input'},
    {name: 'handle', align: 'center', label: '操作', field: 'handle'},
]
export const columns = {
    '注册表': registerColumns, '学生表': studentColumns, '教师表': teacherColumns, '请假表': holidayColumns
}