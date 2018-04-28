<template>
    <div>
        <h1>Game Playing...</h1>
        <b-img
            v-if="!isSuccess"
            class="center"
            src="https://opengameart.org/sites/default/files/chest.png"
            fluid
        />
        <b-img
            v-if="isSuccess"
            class="center"
            src="https://static.wixstatic.com/media/b8bbf2_13b3b18c917f4f2799965e1608917120~mv2_d_7266_4775_s_4_2.jpg/v1/fill/w_792,h_430,al_c,q_80,usm_0.66_1.00_0.01/b8bbf2_13b3b18c917f4f2799965e1608917120~mv2_d_7266_4775_s_4_2.webp"
            fluid
        />

        <b-container fluid>
            <b-row class="my-1">
                <b-col sm="3">
                    <label>Reward(ether):</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input type="number" v-model="reward" disabled></b-form-input>
                </b-col>
            </b-row>
            <b-row class="my-1">
                <b-col sm="3">
                    <label>Betting-Price(wei):</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input type="number" v-model="bettingPrice" disabled></b-form-input>
                </b-col>
            </b-row>
            <b-row class="my-1">
                <b-col sm="3">
                    <label>Guess:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input type="number" v-model="guess" :state="guess.length === 3" placeholder="Enter three digits"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="put-right">
                <b-col>
                    <b-button variant="success" @click="bet" :disabled="guess.length !== 3">Betting!</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'GamePlaying',
    data() {
        return {
            isSuccess: false,
            reward: 10000,
            bettingPrice: 10,
            guess: 0
        }
    },
    methods: {
        bet() {
            console.log('You bet ' + this.guess)
        }
    }

}
</script>

<style>
</style>