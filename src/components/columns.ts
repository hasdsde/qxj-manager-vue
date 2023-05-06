//学生列表
export const registerColumns: any = [
    {name: 'id', align: 'center', label: '学生id', field: 'id', type: 'primary-key'},
    {name: 'name', align: 'center', label: '姓名', field: 'name'},
    {name: 'number', align: 'center', label: '学号', field: 'number'},
    {name: 'classId', align: 'center', label: '班级id', field: 'classId'},
    {name: 'phone', align: 'center', label: '电话', field: 'phone'},
    {name: 'emergencyPhone', align: 'center', label: '紧急电话', field: 'emergencyPhone'},
    {name: 'crateTime', align: 'center', label: '创建时间', field: 'crateTime'},
    {name: 'status', align: 'center', label: '学生状态', field: 'status'},
    {name: 'enable', align: 'center', label: '账号状态', field: 'enable'},
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
    {name: 'status', align: 'center', label: '学生状态', field: 'status', type: 'bool', new: false},
    {name: 'enable', align: 'center', label: '账号状态', field: 'enable', type: 'bool', new: true, update: true},
    {name: 'handle', align: 'center', label: '操作', field: 'handle', new: false},
]
export const teacherColumns: any = [
    {name: 'id', align: 'center', label: 'id', field: 'id', type: 'primary-key'},
    {name: 'name', align: 'center', label: '姓名', field: 'name', type: 'input'},
    {name: 'number', align: 'center', label: '工号', field: 'number', type: 'number'},
    {name: 'collegeId', align: 'center', label: '学院', field: 'collegeId', type: 'number'},
    {name: 'role', align: 'center', label: '角色', field: 'role', type: 'number'},
    {name: 'enable', align: 'center', label: '账号状态', field: 'enable', type: 'bool'},
    {name: 'handle', align: 'center', label: '操作', field: 'handle'},
]