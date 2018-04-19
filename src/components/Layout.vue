<template>
    <div>
        <navigation></navigation>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Navigation from "./Navigation"

export default {
    name: 'GamePlaying',
    components: { Navigation },
    data() {
        return {
        }
    }
}
</script>

<style>
    .content {
        width: 100%;
        height: 100%;
    }
</style>