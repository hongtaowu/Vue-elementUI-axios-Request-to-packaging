

const customer = {
    namespaced:true,
    state:{
        lists:[
            {
               key:'A' ,
               citys:[
                   {
                       label:"上海市"
                   },
                   {
                       label:"北京市"
                   },
                   {
                       label:"厄尔多尔市"
                   },
               ]
            }
        ],
        mapDatas:[],
        classification:[
            {
                categories:"交通",
                smallClass:[
                    { name:"地铁" },
                    { name:"公交" },
                ]
            },
            {
                categories:"教育",
                smallClass:[
                    { name:"培训机构" },
                    { name:"高等教育" },
                    { name:"初等教育" },
                    { name:"学前教育" },
                    { name:"中等教育" },
                ]
            },
            {
                categories:"医疗",
                smallClass:[
                    { name:"综合医院" },
                    { name:"社区医疗" },
                    { name:"诊所" },
                    { name:"药店" },
                    { name:"急救中心" },
                    { name:"中医医院" },
                    { name:"职工医院" },
                    { name:"医疗保健" },
                ]
            },
            {
                categories:"购物",
                smallClass:[
                    { name:"批发市场" },
                    { name:"集市" },
                    { name:"电器商场" },
                    { name:"综合商场" },
                    { name:"购物中心" },
                    { name:"家居建材" },
                    { name:"烟酒茶叶" },
                    { name:"超市" },
                    { name:"文化办公" },
                    { name:"母婴儿童" },
                ]
            },
            {
                categories:"生活",
                smallClass:[
                    { name:"便利店" },
                    { name:"美容美发" },
                    { name:"洗衣" },
                    { name:"干洗" },
                    { name:"电信营业厅" },
                    { name:"文印图文" },
                    { name:"公厕" },
                    { name:"家电维修" },
                ]
            },
            {
                categories:"娱乐",
                smallClass:[
                    { name:"洗浴按摩" },
                    { name:"歌舞厅" },
                    { name:"夜总会" },
                    { name:"娱乐城" },
                    { name:"ktv" },
                    { name:"休闲广场" },
                    { name:"电影院" },
                    { name:"网吧" },
                ]
            },
        ]
    },

    actions:{
        getLists(context, payload){
            return context.state.lists;
        },
        getServiceLists(context, payload){
            return context.state.classification;
        },
        mapChanges (context,payload){
           console.log("payload",payload)
         return context.state.mapDatas = payload;
       }
    
    },
    mutations:{
        mapChanges (state,payload){
           console.log("payload",payload)
        // return state.mapDatas = payload;
       }
    }
}

export default customer;
