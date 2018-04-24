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
        data() {
            return {
                isGameStarted: true
            }
        }
    }
</script>

<style>

</style>