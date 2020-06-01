import Login from '../views/Login.vue';
import NotFound from '../views/404.vue';
import Home from '../views/Home.vue';
// 学生管理
import StudentList from '../views/student/studentList';
import StudentHomepage from '../views/student/studentHomepage';

//指令于模版
import BooksList from "../views/instructionTemplate/booksList";
import TestDetail from "../views/instructionTemplate/testDetail";
import InstructionList from "../views/instructionTemplate/instructionList";
import CommandList from "../views/instructionTemplate/commandList";

//话术编辑
import AboutTalk from "../views/wordEditing/aboutTalk";
import FeedbackSpeech from "../views/wordEditing/feedbackSpeech";

//课件管理
import CoursewareList from "../views/courseware/coursewareList";

//课程管理
import CurriculumList from "../views/curriculum/curriculumList";
import PreparationClass from "../views/curriculum/preparationClass";
import FollowClass from "../views/curriculum/followClass";

//教师管理
import TeacherList from "../views/teacher/teacherList";
import ClassStatistics from "../views/teacher/classStatistics";

let routes = [
    {
        path: '/',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/main',
        component: Home,
        name: '学生管理',
        iconCls: 'fa fa-child',//图标样式class
        children: [
            { path:'/studentList',component: StudentList, name:'学生列表'},
            { path:'/studentHomepage',component: StudentHomepage, hidden:true, name:'学生主页'},
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '指令于模版',
        iconCls: 'fa fa-first-order',//图标样式class
        children: [
            { path:'/booksList',component: BooksList, name:'书单列表'},
            { path:'/testDetail',component: TestDetail, name:'测试详情'},
            { path:'/instructionList',component: InstructionList, name:'测试指令'},
            { path:'/commandList',component: CommandList,hidden:true, name:'指令库'}
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '话术编辑',
        iconCls: 'fa fa-comments-o',//图标样式class
        children: [
            { path:'/aboutTalk',component: AboutTalk, name:'约谈话术'},
            { path:'/feedbackSpeech',component: FeedbackSpeech, name:'反馈话术'},
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '课件管理',
        iconCls: 'el-icon-s-claim',//图标样式class
        children: [
            { path:'/coursewareList',component: CoursewareList, name:'课件列表'},
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '课程管理',
        iconCls: 'fa fa-tasks',//图标样式class
        children: [
            { path:'/curriculumList',component: CurriculumList, name:'课程列表'},
            { path:'/preparationClass',component: PreparationClass, name:'备程列表'},
            { path:'/followClass',component: FollowClass, name:'跟程列表'},
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '教师管理',
        iconCls: 'fa fa-users',//图标样式class
        children: [
            { path:'/teacherList',component: TeacherList, name:'教师列表'},
            { path:'/classStatistics',component: ClassStatistics, name:'课时统计'},
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;