<template>
    <section >
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="firstVisible = true">编辑一级维度</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="secondVisible = true">编辑二级维度</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table class="userTable" border :data="dataList" highlight-current-row v-loading="listLoading">
            <el-table-column fixed="left" prop="bookType" label="一级维度"></el-table-column>
            <el-table-column prop="bookLevel"  label="二级维度"></el-table-column>
            <el-table-column prop="bookName"  label="话术"></el-table-column>
            <el-table-column prop="bookName"  label="操作人"></el-table-column>
            <el-table-column prop="bookNo"  label="操作时间"></el-table-column>
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
       
        <el-dialog title="编辑一级维度" class="dislog-content" center width="40%" :visible.sync="firstVisible">
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="firstVisible = false">取 消</el-button>
                <el-button type="primary" @click="firstVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑二级维度" class="dislog-content" center width="40%" :visible.sync="secondVisible">
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="secondVisible = false">取 消</el-button>
                <el-button type="primary" @click="secondVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import {feedackWordsList} from '../../api/api';
export default {
    data(){
        return{
            activeName: 'reading',
            dataList:[],
            ataList: [],
            pageSize: 10,
            pageNo: 1,
            total: 0,
            listLoading: false,
            firstVisible: false,
            secondVisible: false
        }
    },
    methods:{
        handleCurrentChange(val) {//
            let params = {
                "pageNum": val,
                "pageSize": this.pageSize
            };
            this.getDatalist();
        },
        getDatalist(params) {//获取用户列表
            this.listLoading = true;
            feedackWordsList(params).then((res) => {
                this.total = res.data.pageInfo.totalPageCount;
                this.users = res.data.pageList;
                this.listLoading = false;
            });
        }
    },
    mounted() {
        let params = {
                "pageNum": this.pageNo,
                "pageSize": this.pageSize
            };
        this.getDatalist(params);
    }
}
</script>
<style  lang="scss" scoped>
.title{
    border-bottom: 1px solid #4a4a4a;
}
.tabs{
    border:none;
    border-radius: 2px;
    overflow: hidden;
}

.el-date-editor,.el-select{
    width:180px;
}
.maxWidth{
    width: 100%;
}
</style>