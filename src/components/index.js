import Vue from "vue"

let components={
    
}

for(let i in components){
    Vue.component(i,components[i])
}