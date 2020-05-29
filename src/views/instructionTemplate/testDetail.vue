<template>
    <section >
        <el-tabs v-model="activeName" class="tabs" type="border-card">
            <el-tab-pane label="读书测试" name="reading">
                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button type="primary">编辑一级维度</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">编辑二级维度</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

                <!--列表-->
                <el-table class="userTable" border :data="dataList" highlight-current-row v-loading="listLoading">
                    <el-table-column fixed="left" prop="bookType" label="一级维度"></el-table-column>
                    <el-table-column prop="bookLevel"  label="二级维度"></el-table-column>
                    <el-table-column prop="bookName"  label="适用阶段"></el-table-column>
                    <el-table-column prop="bookNo"  label="选项值"></el-table-column>
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
            </el-tab-pane>
            <el-tab-pane label="辅导课" name="tutoring">
                
            </el-tab-pane>
            <el-tab-pane label="入学测试" name="admission">
                
            </el-tab-pane>
            <el-tab-pane label="能力测试" name="ability">
                
            </el-tab-pane>
            
        </el-tabs>
    </section>
</template>

<script>
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
        }
    },
    methods:{
        handleCurrentChange(val) {//
            this.pageNo = val;
            console.log(val)
            this.getUsers();
        },
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