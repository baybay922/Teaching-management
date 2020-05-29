<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-select v-model="filters.studentNo" filterable placeholder="书单类型">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-select v-model="filters.schoolName" filterable placeholder="所属阶段">
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

         <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary">添加新书单</el-button>
                </el-form-item>
            </el-form>
        </el-col>

		<!--列表-->
		<el-table class="userTable" border :data="dataList" highlight-current-row v-loading="listLoading">
			<el-table-column fixed="left" prop="bookType" label="书单类型"></el-table-column>
            <el-table-column prop="bookLevel"  label="所属阶段"></el-table-column>
            <el-table-column prop="bookName"  label="书单名称"></el-table-column>
            <el-table-column prop="bookNo"  label="书单名称编号"></el-table-column>
            <el-table-column prop="bookRemark"  label="书单话术"></el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="checkDetail(scope.row.id)" type="text" size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

        <el-dialog :title="bookTile" class="dislog-content" center width="40%" :visible.sync="dialogFormVisible">
            <el-form :model="form">

                <el-form-item label="书单类型" class="form-item" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="所属阶段" class="form-item" label-width="120px">
                    <el-select v-model="form.region" placeholder="请选择所属阶段">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="书单名称" class="form-item" label-width="120px">
                    <!-- <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 
                    </el-tooltip> -->
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                    
                </el-form-item>

                <el-form-item label="书单名称编号" class="form-item" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="书单话术" class="form-textarea" label-width="120px">
                    <el-input
                        type="textarea"
                        placeholder="请输入内容"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
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
                bookTile:"新建书单",
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