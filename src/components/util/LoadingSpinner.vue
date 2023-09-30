<template>
    <div class="loading__spinner__container">
        <div class="ring"></div>
        <span>Ładowanie...</span>
    </div>
</template>

<script>
    export default{
        setup(){

        }
    }
</script>

<style lang="scss" scoped>
    .loading__spinner__container{
        width: 100%;
        min-height: 100%;
        position: absolute;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(31, 36, 45, 0.9);

        .ring{
            width: 10rem;
            height: 10rem;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            animation: ring 2s linear infinite;
            @keyframes ring {
                0%{
                    transform: rotate(0deg);
                    box-shadow: 1px 5px 2px var(--main-color);
                }
                50%{
                    transform: rotate(180deg);
                    box-shadow: 1px 5px 2px var(--text-color);
                }
                100%{
                    transform: rotate(360deg);
                    box-shadow: 1px 5px 2px var(--main-color);
                }
            }
            .ring::before{
                content: "";
                height: 100%;
                width: 100%;
                position: absolute;
                border-radius: 50%;
                box-shadow: 0 0 5px rgba(255, 255, 255, .3);
            }
            @media (min-width: 500px) {
                width: 15rem;
                height: 15rem;
            }
        }
        span{
            position: absolute;
            font-size: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
            line-height: 200px;
            color: var(--main-color);
            animation: text 3s ease-in-out infinite;

            @keyframes text {
                50%{
                    opacity: 0;
                    color: var(--text-color);
                }
                100%{
                    opacity: 1;
                    color: var(--main-color);
                }
            }
        }
    }
</style>