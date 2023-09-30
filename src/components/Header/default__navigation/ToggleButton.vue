<template>
    <div class="toogle__button" @click="mobileNav">
        <svg :class="{'active': activeClassButton}" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
    </div>
</template>

<script>
import {ref, watch, toRefs} from 'vue'
    export default{
        props:["name","reset"],
        emits:['toggle-button'],
        setup(props, context){

            const {name, reset} = toRefs(props)
            const activeClassButton = ref(false)

            const mobileNav = () =>{
                activeClassButton.value = !activeClassButton.value;
                context.emit('toggle-button', {
                    activeClass: activeClassButton.value,
                    name: name.value,
                    resetToggle: null
                })
            }

            watch(reset, (newVal)=>{
                if(newVal){
                    mobileNav()
                }
            })

            return {activeClassButton, mobileNav}
        }
    }
</script>

<style lang="scss" scoped>
    .toogle__button{
        width: 2.5rem;
        height: 2.5rem;
        svg{
            width: 100%;
            height: 100%;
            fill: white;
            transition: 0.5s ease-in-out;
        }

        .active{
            transform: rotate(180deg);
        }
    }
</style>