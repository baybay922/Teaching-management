<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-select v-model="filters.studentNo" filterable placeholder="学号代码">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-select v-model="filters.schoolName" filterable placeholder="当前就读校区">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-select v-model="filters.className" filterable placeholder="当前班型">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-select v-model="filters.clickBookName" filterable placeholder="点读进度">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-select v-model="filters.fingerBookName" filterable placeholder="指读进度">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-select v-model="filters.scoreName" filterable placeholder="学员状态评分">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="getSearchFilters">查询</el-button>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="resetSearch">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table class="userTable" border :data="users" highlight-current-row v-loading="listLoading">
			<el-table-column fixed="left" prop="studentNo"  label="学号" width="120"></el-table-column>
			<el-table-column prop="studentName" label="姓名" width="120"></el-table-column>
			<el-table-column prop="englishName" label="英文名" width="120"></el-table-column>
			<el-table-column prop="birthday" label="出生日期" width="120"></el-table-column>
			<el-table-column prop="age" label="年龄" width="120"></el-table-column>
			<el-table-column prop="studentType" label="学员类型" width="120"></el-table-column>
			<el-table-column prop="schoolName" label="当前校区" width="120"></el-table-column>
			<el-table-column prop="className" label="当前班型" width="120"></el-table-column>
			<el-table-column prop="firstExamTime" label="入学测试时间" width="120"></el-table-column>
			<el-table-column prop="abilityExamTime" label="最后一次能力测试时间" width="180"></el-table-column>
			<el-table-column prop="admissionTime" label="入学时间" width="120"></el-table-column>
			<el-table-column prop="clickBookName" label="点读进度" width="120"></el-table-column>
			<el-table-column prop="fingerBookName" label="只读进度" width="120"></el-table-column>
			<el-table-column prop="scoreName" label="学员状态评分" width="120"></el-table-column>
			
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="checkStudentDetail(scope.row.id)" type="text" size="small">查看</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
	import { studentList} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					studentNo: '',
					schoolName:'',
					className:'',
					clickBookName:'',
					fingerBookName:'',
					scoreName:''
				},
				users: [],
				pageSize: 10,
				pageNo: 1,
				total: 0,
				listLoading: false,
				options: [{
					value: '1',
					label: 'No1'
				}],
			}
		},
		methods: {
			getSearchFilters(){
				console.log(this.filters)
			},
			checkStudentDetail(id){//查看学生详情
				let path = {
						path: '/studentHomepage', 
						query: {
							id: id
						}
				};
				this.$router.push(path);
			},
			resetSearch(){//重置搜索
				window.location.reload()
			},
			handleCurrentChange(val) {//
				this.pageNo = val;
				this.getUsers();
			},
			getUsers() {//获取用户列表
				let params = {
					"pageNum": 0,
					"pageSize": 0
				};
				this.listLoading = true;
				studentList(params).then((res) => {
					this.total = res.data.pageInfo.totalPageCount;
					this.users = res.data.pageList;
					this.listLoading = false;
				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped lang="scss">
.toolbar{
	padding-bottom: 0px;
}
.userTable{
	width: 100%
}
</style>