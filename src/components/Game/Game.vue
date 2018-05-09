<template>
    <div>
        <ring-loader :loading="loading" class="center"></ring-loader>
        <div v-if="!loading">
            <game-playing v-if="isGameStarted" @gameInvest="gameInvest"></game-playing>
            <game-investing v-if="!isGameStarted" @gameStart="gameStart"></game-investing>
        </div>
    </div>
</template>

<script>
    import GameInvesting from '@/components/Game/GameInvesting.vue'
    import GamePlaying from '@/components/Game/GamePlaying.vue'
    import RingLoader from 'vue-spinner/src/RingLoader.vue'

    export default {
        name: 'Game',
        components: { GameInvesting, GamePlaying, RingLoader },
        beforeCreate () {
            console.log('registerWeb3 Action dispatched.')
            this.$store.dispatch('registerWeb3')
            console.log('dispatching getContractInstance.')
            this.$store.dispatch('getContractInstance').then((res) => {
                this.loading = false
            })
        },
        data() {
            return {
                isGameStarted: false,
                loading: true,
            }
        },
        methods: {
            gameStart() {
                this.isGameStarted = true
            },
            gameInvest() {
                this.isGameStarted = false
            }
        }
    }
</script>

<style>

</style>