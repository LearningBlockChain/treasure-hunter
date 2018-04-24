<template>
    <b-navbar toggleable="md" type="dark" variant="info" fixed>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="#">Treasure-Hunter</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item href="/game" :active="this.$route.path === '/game-playing'">Game</b-nav-item>
                <b-nav-item href="/rankings" :active="this.$route.path === '/rankings'">Rankings</b-nav-item>
                <b-nav-item href="/rules" :active="this.$route.path === '/rules'">Rules</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    name: 'Navigation',
    data() {
      return {
      }
    },
    mounted() {
    }

}
</script>

<style scoped>

</style>