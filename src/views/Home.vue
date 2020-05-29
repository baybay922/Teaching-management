<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				<div class="logo-content" v-if="!collapsed">
					<img src="../images/logo.svg" alt="">
					<p>教务管理系统</p>
				</div>
				<div class="logo-content" v-else>
					<img src="../images/logo.svg" alt="">
				</div>
			</el-col>
			
			<el-col :span="4" class="userinfo">
				<div class="collapsed-button" @click="changeCollapse">
					<i :class="[collapsed?'el-icon-s-unfold':'el-icon-s-fold']"></i>
				</div>
				<el-dropdown trigger="hover">
					<div class="el-dropdown-link userinfo-inner">
						
						<i class="fa fa-user-circle"></i>
						<p>欢迎，{{sysUserName}}</p>
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided @click.native="logout" style="margin:0!important;">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>

		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo open" 
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>

			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>

		</el-col>
	</el-row>
</template>

<script>
	import { signOut } from '../api/api';
	export default {
		data() {
			return {
				sysName:'管理后台',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
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
		},
		methods: {
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					let params = {
						userId: sessionStorage.getItem('userId')
					}
					signOut(params).then(data => {
						if (data.code == 0) {
							sessionStorage.removeItem('user');
							let path = {path: '/'};
							this.$router.push(path);
						} else {
							this.$message({
								message: data.message,
								type: 'error'
							});
						}
					});
				})

			},
			//折叠导航栏
			changeCollapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				this.sysUserName = user;
			}
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;

		.header {
			height: 60px;
			line-height: 60px;
			background: #fff;
			color:#fff;
			display: flex;

			.userinfo {
				width: 100%;
				text-align: right;
				padding-right: 35px;
				flex: 1;
				display: flex;
				justify-content: space-between;
				box-shadow: 0 1px 4px rgba(0,21,41,.08);

				.userinfo-inner {
					cursor: pointer;
					color:#4a4a4a;
					display: flex;
					align-items: center;

					i{
						font-size: 24px;
						margin-right: 5px;
					}
					
					
				}
			}
			.logo {
				height:60px;
				font-size: 22px;
				background: rgba(0, 33, 64, 1);
				
				img {
					width: 40px;
					margin-right: 5px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			
			aside {
				flex:0 0 230px;
				width: 230px;
				.el-menu{
					height: 100%;
					border: none!important;
					background:rgba(0, 21, 41, 1);
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				flex:1;
				overflow: hidden;
				padding: 20px;
				background: #f0f2f5;

				.grid-content{
					display: flex;
					flex-direction: column;
					height: 100%;
				}	

				.breadcrumb-container {
					display: flex;
					justify-content: space-between;
					align-items: center;
					background: #fff;
					padding: 10px;
					border-radius: 2px;
					margin-bottom: 10px;

					.title {
						width: 200px;
						float: left;
						color: #475669;
						display: flex;
						align-items: center;

						&::before{
							content: "";
							width: 3px;
							height: 15px;
							display: block;
							margin-right: 5px;
							background: #409EFF;

						}
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
					border-radius: 2px;
					height: 100%;overflow-y: scroll;
				}
			}
		}
	}

	.logo-content{
		height: 100%;
		margin: 0 15px;
		display: flex;
		align-items: center;
		justify-content: center;

		img{
			width: 35px;
			height: 35px;
		}

		p{
			font-size: 18px;
		}
	}

	.collapsed-button{
		margin-left: 24px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		i{
			font-size: 24px;
			color:#4a4a4a;
		}
	}

	.el-menu-vertical-demo.open{
		width:230px!important;
	}
</style>