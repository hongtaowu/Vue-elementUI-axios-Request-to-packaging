<template>
  <p>123</p>
</template>
<script>
export default {
  name:"Login",
  data(){
    return{

    }
  },
  mounted(){
    
  },
  methods:{
    text(){
      this.$https.get('/properties/getProperties',{
        propType: 'countryOfOrigin'
      }).then(res => {
        console.log(res);
      })
    }
  }
}
</script>
