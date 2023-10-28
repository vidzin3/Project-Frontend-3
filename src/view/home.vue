<template>
    <v-container>
        <v-card title="Note Vue Pinia" class="d-flex align-center justify-space-between">
            <v-spacer></v-spacer>
        </v-card>
        <note />
    </v-container>
</template>

<script>
    import note from '../components/note.vue';

    export default {
        components:{
            note
        }
    }
</script>