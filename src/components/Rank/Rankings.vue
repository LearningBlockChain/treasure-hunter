<template>
    <div>
        <h1>Rankings...</h1>
        <b-table
                striped
                hover
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :items="items"
                :fields="fields"
        >
            <template slot="index" slot-scope="data">
                {{data.index + 1}}
            </template>

            <template slot="table-caption">
                Reward: ether
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    name: 'Rankings',
    data() {
        return {
          sortBy: 'reward',
          sortDesc: true,
          fields: [
            {key: 'index', sortable: false},
            {key: 'rounds', sortable: true},
            {key: 'address', sortable: false},
            {key:'reward', sortable: true},
            {key: 'date', sortable: true}
          ],
          items: [
            { rounds: 1, address: '0x10239md3k32kjkl2jldljfl', reward: '3', date: '2018-01-01'},
            { rounds: 2, address: '0xkjljdfkljlksaflksj33235', reward: '10', date: '2018-02-01'},
            { rounds: 3, address: '0xjlkj3d91ldlei3kfkd3ofkd', reward: '100', date: '2018-03-01'},
            { rounds: 4, address: '0xj1hj31239imdjlkjeqoqoeo', reward: '4', date: '2018-04-01'},
            { rounds: 5, address: '0x2j12jkdljqoqodkcmwoqjdj', reward: '1', date: '2018-05-01'},
            { rounds: 6, address: '0x30djfkladsjlkl3j1j1jzld', reward: '7', date: '2018-06-01'},
            { rounds: 7, address: '0x3kdeieiqkdkdmvnn033991k', reward: '15', date: '2018-07-01'},
          ]
        }
    }
}
</script>

<style>

</style>