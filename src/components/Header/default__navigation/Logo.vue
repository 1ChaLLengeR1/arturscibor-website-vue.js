<template>
    <router-link class="logo" :to="{name:'pass'}">Portfolio.</router-link>
</template>

<style lang="scss" scoped>
    .logo{
        font-size: 1.5rem;
        color: var(--text-color);
        font-weight: 600;
        cursor: default;
        animation: slideRight 1s ease forwards;

        @media (min-width: 1000px){
            margin-left: 4rem;
            font-size: 2.5rem;
        }

        @keyframes slideRight {
            0%{
                transform: translateX(-100px);
                opacity: 0;
            }
            100%{
                transform: translateX(0);
                opacity: 1;
            }
        }


    }
</style>