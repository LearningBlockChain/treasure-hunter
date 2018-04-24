<template>
    <div>
        <game-playing v-if="isGameStarted"></game-playing>
        <game-investing v-if="!isGameStarted"></game-investing>
    </div>
</template>

<script>
    import GameInvesting from '@/components/Game/GameInvesting.vue'
    import GamePlaying from '@/components/Game/GamePlaying.vue'
    export default {
        name: 'Game',
        components: { GameInvesting, GamePlaying },
        mounted () {
            console.log('registerWeb3 Action dispatched.')
            this.$store.dispatch('registerWeb3')
            console.log('dispatching getContractInstance.')
            this.$store.dispatch('getContractInstance')
        },
        data() {
            return {
                isGameStarted: false
            }
        }
    }
</script>

<style>

</style>