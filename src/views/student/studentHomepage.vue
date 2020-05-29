<template>
    <section >
        <el-tabs v-model="activeName" class="tabs" type="border-card">
            <el-tab-pane label="学员基本信息" name="first">
                <el-form ref="form" :inline="true" :model="form" label-width="150px">
                    <el-form-item label="中文名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="英文名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option label="男" value="man"></el-option>
                            <el-option label="女" value="female"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="出生日期">
                        <el-date-picker
                        v-model="name"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="年龄">
                        <el-input v-model="form.name" type="number"></el-input>
                    </el-form-item>

                    <el-form-item label="计划入学时间">
                        <el-date-picker
                        v-model="name"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="入学校区">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option label="男" value="man"></el-option>
                            <el-option label="女" value="female"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="入学班型">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option label="男" value="man"></el-option>
                            <el-option label="女" value="female"></el-option>
                        </el-select>
                    </el-form-item>
                    
                </el-form>
                <el-form ref="form" :inline="true" :model="form" label-width="150px">
                    <el-form-item label="家长姓名">
                            <el-input v-model="form.name" type="number"></el-input>
                    </el-form-item>

                    <el-form-item label="家长关系">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option label="男" value="man"></el-option>
                            <el-option label="女" value="female"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="联系电话">
                        <el-input v-model="form.name" type="number"></el-input>
                    </el-form-item>
                </el-form>

                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="英语学习经历" class="maxWidth">
                        <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="textarea">
                            </el-input>
                    </el-form-item>
                </el-form>

                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="孩子的兴趣爱好描述" class="maxWidth">
                        <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="textarea">
                            </el-input>
                    </el-form-item>
                </el-form>

                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="从哪里了解艾诺迪">
                        <el-input v-model="form.name" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="介绍人">
                        <el-input v-model="form.name" type="number"></el-input>
                    </el-form-item>

                </el-form>

                 <el-form ref="form" :model="form" label-width="180px">

                    <el-form-item label="孩子有无特殊禁忌或疾病史">
                        <el-input v-model="form.name" type="number"></el-input>
                    </el-form-item>

                </el-form>
            </el-tab-pane>
            
        </el-tabs>
    </section>
</template>

<script>
export default {
    data(){
        return{
            activeName: 'first',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
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