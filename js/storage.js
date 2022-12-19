export class StorageTask{
    constructor(key){
        this.key = key;
        let list = localStorage.getItem(key);
        this.taskList = new Map(JSON.parse(list))
        let id = [...this.taskList.keys()].slice(-1)[0] || 'task_0';
        this.lastId = id.split('_')[1];
    }
    getList(){
        return this.taskList;
    }
    getTask(id){
        return this.taskList.get(id)
    }
    getId(){
        return `task_${this.lastId}`;
    }
    addTask(task){
        this.taskList.set(`task_${++this.lastId}`, task);
        this.saveToLocal();
    }
    removeTask(id){
        this.taskList.delete(id);
        this.saveToLocal();
    }
    saveToLocal(){
        let jsonList = JSON.stringify([...this.taskList] || []);
        localStorage.setItem(this.key, jsonList);
    }
}