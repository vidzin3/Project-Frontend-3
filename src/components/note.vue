<template>
    <v-row class="mt-2">
        <v-col>
            <v-text-field 
                v-model.trim="newTask"
                variant="solo" 
                label="What are you working on?" 
                @keydown.enter="() => createTask(newTask)"
            >
                <template v-slot:append-inner>
                    <v-btn
                        v-show="newTask"
                        icon="mdi-plus-circle"
                        variant="text"
                        @click="createTask(newTask)"
                    >
                    </v-btn>
                </template>
            </v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn class="mr-3" theme="dark" @click="filter = 'all'">all</v-btn>
            <v-btn class="mr-3" theme="dark" @click="filter = 'done'">Complete</v-btn>
        </v-col>
    </v-row>
    <v-row v-if="filter === 'all'">
        <v-col v-for="v in task.tasks" cols="12">
            <v-card theme=dark>
                <v-card-title class="d-flex align-center justify-space-between" :class="{active: isActive, 'text-decoration-line-through text-red': v.done}">{{ v.text }}
                    <div>
                        <v-dialog width="500">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" @click="() => editTaskText(v.id)" icon="mdi-pencil"></v-btn>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <v-card title="Dialog">
                                    <v-text-field class="pa-4"
                                        v-model="taskEdit" 
                                        theme="light" 
                                        label="Label" 
                                        variant="solo" 
                                    >
                                    </v-text-field>
                                    <v-card-actions>
                                        <v-btn @click="editTaskText(v.id),isActive.value = false">Save</v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                        text="Close Dialog"
                                        @click="isActive.value = false"
                                        ></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                        <v-tooltip text="DONE" location="start">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" @click="() => addtolike(v.id)" icon="$vuetify"></v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="DELETE" location="start">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" @click="() => deleteTask(v.id)" icon="mdi-delete" title="trash"></v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </v-card-title>
            </v-card>
        </v-col>
    </v-row>
    <v-row v-if="filter === 'done'">
        <v-col v-for="v in task.Complete" cols="12">
            <v-card theme=dark>
                <v-card-title class="d-flex align-center justify-space-between" :class="{active: isActive, 'text-decoration-line-through text-red': v.done}">{{ v.text }}
                    <div>
                        <v-tooltip text="Tooltip" location="start">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="mdi-pencil"></v-btn>
                            </template>
                        </v-tooltip>
                        <v-btn @click="() => addtolike(v.id)" icon="$vuetify"></v-btn>
                        <v-btn @click="() => deleteTask(v.id)" icon="mdi-delete" title="trash"></v-btn>
                    </div>
                </v-card-title>
            </v-card>
        </v-col>
    </v-row>
    
</template>

<script>
    import { ref } from 'vue'
    import {tasks} from '../store/store'

    export default {
        setup(){
            const task = tasks()

            const {addtolike,create,Complete,deleteTask,editTask} = task

            const isActive = ref("text-decoration-line-through")

            const done = ref(task.tasks.find(p => p.done))

            const newTask = ref("")
            const filter = ref('all')
            
            const createTask = (text) =>{
                create(text),
                newTask.value = ""
            }

            const taskEdit = ref("")

            const editTaskText = (id) =>{
                editTask(id, taskEdit.value)
                taskEdit.value = ""
            }

            return{
                task,
                create,
                addtolike,
                isActive,
                done,
                newTask,
                createTask,
                Complete,
                filter,
                deleteTask,
                editTaskText,
                editTask,
                taskEdit
            }
        }
    }
</script>