//学生列表
export const registerColumns: any = [
    {name: 'id', align: 'center', label: '学生id', 'field': 'primary-key'},
    {name: 'name', align: 'center', label: '姓名', 'field': 'name'},
    {name: 'number', align: 'center', label: '学号', 'field': 'number'},
    {name: 'classId', align: 'center', label: '班级id', 'field': 'classId'},
    {name: 'phone', align: 'center', label: '电话', 'field': 'phone'},
    {name: 'emergencyPhone', align: 'center', label: '紧急电话', 'field': 'emergencyPhone'},
    {name: 'crateTime', align: 'center', label: '创建时间', 'field': 'crateTime'},
    {name: 'status', align: 'center', label: '学生状态', 'field': 'status'},
    {name: 'enable', align: 'center', label: '账号状态', 'field': 'enable'},
    {name: 'handle', align: 'center', label: '操作', 'field': 'handle'},
]
export const studentColumns: any = [
    {name: 'studentId', align: 'center', label: '学生id', 'field': 'studentId', 'type': 'primary-key'},
    {name: 'name', align: 'center', label: '姓名', 'field': 'name', 'type': 'input'},
    {name: 'number', align: 'center', label: '学号', 'field': 'number', 'type': 'number'},
    {name: 'className', align: 'center', label: '班级', 'field': 'className', 'type': 'other'},
    {name: 'major', align: 'center', label: '专业', 'field': 'major'},
    {name: 'grade', align: 'center', label: '年级', 'field': 'grade'},
    {name: 'college', align: 'center', label: '学院', 'field': 'college'},
    {name: 'phone', align: 'center', label: '电话', 'field': 'phone', 'type': 'number'},
    {name: 'emergencyPhone', align: 'center', label: '紧急电话', 'field': 'emergencyPhone', 'type': 'number'},
    {name: 'createTime', align: 'center', label: '创建时间', 'field': 'createTime'},
    {name: 'status', align: 'center', label: '学生状态', 'field': 'status', 'type': 'bool'},
    {name: 'enable', align: 'center', label: '账号状态', 'field': 'enable', 'type': 'bool'},
    {name: 'handle', align: 'center', label: '操作', 'field': 'handle'},
]
export const teacherColumns: any = [
    {name: 'id', align: 'center', label: 'id', 'field': 'id', 'type': 'primary-key'},
    {name: 'name', align: 'center', label: '姓名', 'field': 'name', 'type': 'input'},
    {name: 'number', align: 'center', label: '工号', 'field': 'number', 'type': 'number'},
    {name: 'collegeId', align: 'center', label: '学院', 'field': 'collegeId', 'type': 'number'},
    {name: 'role', align: 'center', label: '角色', 'field': 'role', 'type': 'number'},
    {name: 'enable', align: 'center', label: '账号状态', 'field': 'enable', 'type': 'bool'},
    {name: 'handle', align: 'center', label: '操作', 'field': 'handle'},
]