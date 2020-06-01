<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-select v-model="filters.studentNo" filterable placeholder="课程类型">
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

        <el-col :span="24" class="toolbar">
            <el-form>
                <el-form-item>
                    <el-button type="primary" @click="getSearchFilters">新建文件夹</el-button>
                </el-form-item>
            </el-form>
			
		</el-col>

		<!--列表-->
		<el-table class="userTable" border :data="users" highlight-current-row v-loading="listLoading">
			<el-table-column prop="studentNo"  label="文件名"></el-table-column>
			<el-table-column prop="studentName" label="课程类型"></el-table-column>
			<el-table-column prop="englishName" label="编辑人"></el-table-column>
			<el-table-column prop="birthday" label="编辑时间"></el-table-column>
			
			<el-table-column fixed="right" label="操作" width="120">
				<template slot-scope="scope">
					<el-button @click="checkStudentDetail(scope.row.id)" type="text" size="small">编辑</el-button>
                    <el-button @click="checkStudentDetail(scope.row.id)" type="text" size="small">删除</el-button>
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
				this.getDatalist();
			},
			getDatalist() {//获取用户列表
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
			this.getDatalist();
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