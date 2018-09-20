<template>
    <div class="clock-comp shadow-lg rounded padded-bot" :class="'over-item-'+themeColor" id="clock-comp">
        <h2>Good {{timeOfDay}} {{user.displayName}}</h2>
        <h3>{{timeBlob.hour}}:{{timeBlob.minute}}:{{timeBlob.second}} <span v-if="!militaryTime">{{timeBlob.ampm}}</span></h3>
        <button class="btn btn-sm btn-dark" @click="militaryTime = !militaryTime">12h/24h</button>
    </div>
</template>


<script>
    export default {
        name: 'clock-comp',
        data() {
            return {
                timeBlob: {},
                militaryTime: true,
                timeOfDay: 'Morning'
            }
        },
        mounted() {
            this.doTime()
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            themeColor() {
                return this.$store.state.theme
            }
        },
        methods: {
            doTime() {
                let today = new Date();
                let h = today.getHours()
                let m = today.getMinutes()
                let s = today.getSeconds()
                this.timeBlob = {}
                this.timeBlob.hour = h
                this.timeBlob.minute = m
                this.timeBlob.second = s
                if (this.timeBlob.hour > 2 && this.timeBlob.hour < 12) {
                    this.timeOfDay = 'Morning'
                } else if (this.timeBlob.hour > 12 && this.timeBlob.hour < 18) {
                    this.timeOfDay = 'Afternoon'
                } else {
                    this.timeOfDay = 'Evening'
                }
                if (this.timeBlob.hour > 12 && !this.militaryTime) {
                    this.timeBlob.hour -= 12
                    this.timeBlob.ampm = 'PM'
                } else {
                    this.timeBlob.ampm = 'AM'
                }
                if (this.timeBlob.hour < 10) { this.timeBlob.hour = '0' + this.timeBlob.hour }
                if (this.timeBlob.minute < 10) { this.timeBlob.minute = '0' + this.timeBlob.minute }
                if (this.timeBlob.second < 10) { this.timeBlob.second = '0' + this.timeBlob.second }
                setTimeout(this.doTime, 500)
            },
        },
        components: {}
    }
</script>


<style scoped>

</style>