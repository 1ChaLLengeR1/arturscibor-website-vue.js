<template>
    <div class="technologies__container">
        <h3>Technologie użytę w projekcie</h3>
        <ul>
            <li v-for="item in technologies" :key="item.id">
                <p>{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['technologies'],
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
    .technologies__container{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        padding: 0.5rem;

        h3{
            font-size: 15px;
            text-align: center;
            color: var(--text-color);
            border-bottom: 1px solid var(--main-color);

            @media (min-width: 750px){
                font-size: 30px;
                border-bottom: 1px solid var(--main-color);
            }
        }

        ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            justify-content: center;
            list-style: none;

            li{
                width: 15rem;
                height: 3rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background: var(--secend-bg-color);
                border: 1px solid var( --main-color);
                box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 1);
                p{
                    font-size: 20px;
                    font-weight: bold;
                    color: var( --main-color);
                }
            }
            @media (min-width: 750px){
                width: 70%;
            }
        }
    }
</style>