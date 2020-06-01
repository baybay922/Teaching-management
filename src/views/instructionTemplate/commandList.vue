<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" @click="dialogFormVisible = true">新建指令</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table class="userTable" border :data="dataList" highlight-current-row v-loading="listLoading">
			<el-table-column prop="bookType" label="指令编号"></el-table-column>
            <el-table-column prop="bookLevel"  label="指令详情"></el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
                    <el-button @click="checkCommand(scope.row.id)" type="text" size="small">删除</el-button>
					<el-button @click="checkCommand(scope.row.id)" type="text" size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

        <el-dialog :title="dialogTitle" class="dislog-content" center width="40%" :visible.sync="dialogFormVisible">
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

	</section>
</template>

<script>
	import { booksList} from '../../api/api';

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
				dataList: [],
				pageSize: 10,
				pageNo: 1,
				total: 0,
				listLoading: false,
				options: [{
					value: '1',
					label: 'No1'
                }],
                dialogFormVisible: false,
                dialogTitle:"新建指令",
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
			}
		},
		methods: {
            checkCommand(){//查看指令库
                let path = {
                    path: '/commandList'
                };
                this.$router.push(path)
            },
			getSearchFilters(){
				console.log(this.filters)
			},
			checkDetail(id){//查看学生详情
				this.dialogFormVisible = true
			},
			resetSearch(){//重置搜索
				window.location.reload()
			},
			handleCurrentChange(val) {//
                this.pageNo = val;
                console.log(val)
				this.getUsers();
			},
			getUsers() {//获取用户列表
				let params = {
					"pageNum": this.pageNo,
					"pageSize": 10
				};
				this.listLoading = true;
				booksList(params).then((res) => {
					this.total = res.data.pageInfo.totalCount;
					this.dataList = res.data.pageList;
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
.form-item{
    width: 310px;

}
</style>