<template>
  <el-container class="layout-aside">
    <el-scrollbar :native="false" style="height:100%;background-color: rgb(84, 92, 100);" wrapStyle="" wrapClass="" viewClass="" viewStyle="" :noresize='false' tag="section">
      <!-- 导航菜单 -->
      <!-- 1206 在此处添加了class做处理 -->
      <!-- <img class="logo" src="../assets/imgs/logo.gif" alt=""> -->
      <el-menu router unique-opened class="el-menu-vertical-demo asideMenu" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :default-active="$route.path" background-color="#545c64" text-color="#fff" :collapse-transition="false" active-text-color="#ffd04b">
        <div index="1" style="padding-left:0">
          <img slot="title" src="../assets/imgs/logo.jpg" alt width="100%" class="asideImg">
        </div>
        <el-submenu :index="menu1.path + ''" v-for="menu1 in menuList" :key="menu1.code">
          <template slot="title">
            <i :class="'el-icon-sj-' + menu1.icon"></i>
            <span slot="title">{{ menu1.name }}</span>
          </template>
          <el-menu-item :index="menu2.path + ''" v-for="menu2 in menu1.children" :key="menu2.code">
            <i :class="'el-icon-sj-' + menu2.icon"></i>
            <span slot="title">{{ menu2.name }}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
    <!-- 1206 在此处添加了class做处理 -->
    <div class="mainContent" ref="mainContentStyle" :style="{width:contentWidth}">
      <el-container>
        <!-- 头部 -->
        <el-header>
          <el-row class="layout-head">
            <el-col :span="1" class="icon-menu">
              <i class="el-icon-sj-caidan" @click="isFlex"></i>
            </el-col>
            <!-- 目前还未实现面包屑当前版本先注释掉 -->
            <el-col :span="14">
              <el-breadcrumb separator-class="el-icon-arrow-right" :replace="false">
                <el-breadcrumb-item>{{$t('routerName.home')}}</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path">{{$t(item.name)}}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="4" class="col-right">
              <el-button size="mini" :class="{active: active == 2}" @click="selectLg(2)">English</el-button>
              <el-button size="mini" :class="{active: active == 1}" @click="selectLg(1)">中文</el-button>
            </el-col>
            <el-col :span="5" class="col-right">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <strong class="user-n">{{ firstName + lastName }}</strong>
                  <i class="el-icon-arrow-down el-icon--right user-i"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="logout">{{ $t("button.logout") }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <!-- 内容 -->
        <!-- dmr 1206 在此处添加了class做处理 -->
        <el-main class="leftContet" :style="{width:contentWidth, height:contentHeight}">
          <router-view/>
        </el-main>
      </el-container>
    </div>
  </el-container>
</template>

<script>
export default {
    name: "layout",
    data() {
        return {
            firstName: "",
            lastName: "",
            menuList: [],
            isCollapse: false,
            active: 1,
            firstFlag: 0,
            reloadFlag: 0,
            contentWidth: `${window.innerWidth - 200}px`,
            sWidth: document.body.innerWidth,
            contentHeight: `${window.innerHeight - 50}px`,
            sHeight: document.body.innerHeight,
            levelList: null
        };
    },
    created() {
        // this.toggleMenu();
        // this.getUserName();
        // this.setDefaultLanguage();
        const w1 = window.innerWidth;
        const w2 = w1 - 200;
        this.contentWidth = `${w2}px`;
    },
    mounted() {
        const that = this;
        window.onresize = () => {
            const func = () => {
                that.sWidth = document.body.clientWidth;
                that.sHeight = document.body.clientHeight;
            };
            return func();
        };
        // this.getBreadcrumb();
    },
    methods: {
        // 获取登录名
        getUserName() {
            this.firstName = sessionStorage.getItem("firstName");
            this.lastName = sessionStorage.getItem("lastName");
        },
        // 按钮样式处理
        setDefaultLanguage() {
            if (this.$i18n.locale === "en") {
                this.active = 2;
            } else {
                this.active = 1;
            }
        },
        // 退出
        userLoginOut() {
            this.$http.post("/user/loginOut").then(res => {
                const redirectUrl = res.data.data;
                window.open(redirectUrl, '_self');
            });
        },
        logout() {
            this.$confirm(this.$t("prompt.exit"), {
                confirmButtonText: this.$t("list.yes"),
                cancelButtonText: this.$t("list.no"),
                type: "warning"
            })
                .then(() => {
                    sessionStorage.clear();
                    this.$message({
                        type: "success",
                        message: this.$t("prompt.exitSuccess")
                    });
                    this.userLoginOut();
                })
                .catch(() => {
                    return;
                });
        },
        // 获取左侧菜单
        getMenuList() {
            this.$http.post("/menu/getMenus").then(res => {
                const { status, data } = res.data;
                if (status) {
                    this.menuList = data;
                    if (this.isInArray(data) === false) {
                        this.$router.replace(data[0].children[0].path);
                    }
                } else {
                    this.$router.push("/login");
                }
            });
        },
        isInArray(data) {
            const currentPath = this.$route.path;
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].children.length; j++) {
                    if (
                        currentPath === data[i].children[j].path ||
                        currentPath === data[i].children[j].threeUrl
                    ) {
                        return true;
                    }
                }
            }
            return false;
        },
        // 中英文切换
        selectLg(flag) {
            this.active = flag;
            if (this.active === 1) {
                this.$i18n.locale = "cn";
                sessionStorage.setItem("locale", "cn");
                this.language = 0;
                this.refreshRouter(true);
            } else {
                this.$i18n.locale = "en";
                sessionStorage.setItem("locale", "en");
                this.language = 1;
                this.refreshRouter(true);
            }
        },
        // 切换菜单
        toggleMenu() {
            const that = this;
            that.refreshRouter(false);
        },
        // 以promise的形式来返回token信息
        languageAsync() {
            const lan = sessionStorage.getItem("locale");
            const localeLan = this.$i18n.locale;
            const lang = lan === "en" || localeLan === "en" ? 1 : 0;
            const that = this;
            const pro = new Promise((resovle, rej) => {
                that.$http
                    .get("/user/upadteLanguage", {
                        params: {
                            language: lang
                        }
                    })
                    .then(res => {
                        const { status, data, msg } = res.data;
                        if (status) {
                            resovle(data);
                        } else {
                            rej(msg);
                        }
                    });
            });
            return pro;
        },
        // 刷新页面方法
        refreshRouter(a) {
            const that = this;
            const pro = this.languageAsync();
            pro
                .then(res => {
                    // sessionStorage.setItem('token', res);
                    if (a) {
                        setTimeout(() => {
                            that.$router.go(0);
                        }, 300);
                    }
                    that.getMenuList();
                })
                .catch(err => {
                    that.$message.error(err);
                });
        },
        getBreadcrumb() {
            let matched = this.$route.matched;
            this.levelList = matched;
        },
        // // 折叠
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        isFlex() {
            this.isCollapse = !this.isCollapse;
            const w1 = window.innerWidth;
            if (this.isCollapse) {
                const w2 = w1 - 64;
                this.contentWidth = `${w2}px`;
            } else {
                const w2 = w1 - 200;
                this.contentWidth = `${w2}px`;
            }
        }
    },
    watch: {
        sWidth(val) {
            this.sWidth = val;
            if (this.isCollapse) {
                this.contentWidth = `${val - 64}px`;
            } else {
                this.contentWidth = `${val - 200}px`;
            }
        },
        sHeight(v) {
            this.sHeight = v;
            this.contentHeight = `${v - 50}px`;
        },

        $route(to, from) {
            this.getBreadcrumb();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.leftContet {
    width: 1100px;
}
/* 以上是处理在ie上的问题的代码 */
.layout-aside {
    height: 100%;
    display: flex;
    flex-flow: row;
    /* padding-right: 10px */
}
.el-aside {
    background-color: #545c64;
}
.logo {
    width: 100%;
    display: inline-block;
}
.el-menu {
    border-right: none;
}
.el-header {
    -webkit-box-shadow: 0 2px 3px -2px rgba(0, 0, 0, 0.15);
    box-shadow: 0 2px 3px -2px rgba(0, 0, 0, 0.15);
    background-color: white;
    z-index: 1;
    height: 50px !important;
    padding: 0;
    margin: 0 20px;
}
.icon-menu,
.layout-head .col-right,
.el-breadcrumb {
    line-height: 50px;
}
.el-dropdown {
    height: 50px;
}
.user-n {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 140px;
    display: inline-block;
    font-weight: normal;
    font-size: 12px;
}
.user-i {
    line-height: 50px;
    float: right;
}
.icon-menu {
    cursor: pointer;
}
.el-main {
    background-color: #f5f5f5;
}
.el-button + .el-button {
    margin-left: 0;
}
button.active {
    background: #409eff;
    color: #ffffff;
    border: 1px solid #409eff;
}
.el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>
