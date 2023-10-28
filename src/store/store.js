import {defineStore} from 'pinia'

export const tasks = defineStore('task',{
    state:()=>({
        tasks:[
            {
                id:1,
                done: false,
                text: 'Foobar',
            },
            {
                id:2,
                done: true,
                text: 'Fizzbuzz',
            },
        ],
    }),
    getters:{
        Complete(){
            return this.tasks.filter(done => done.done)
        }
    },
    actions:{
        create(text){
            if(!text) return;
            this.tasks.push({
                id:Math.floor(Math.random()*10000000),
                done:false,
                text:text
            })
        },
        addtolike(id){
            const index = this.tasks.findIndex(i => i.id === id)
            this.tasks[index].done = !this.tasks[index].done
        },
        deleteTask(id){
            const index = this.tasks.findIndex(index => index.id === id)
            this.tasks.splice(index,1)
        },
        editTask(id,text){
            const index = this.tasks.findIndex(index => index.id === id)
            if(index == -1){
                tasks.text = tasks[index].text
            }else{
                this.tasks[index].text = text
            }
        }
    }
})