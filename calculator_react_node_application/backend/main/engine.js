//histroy memory management
class Engine{
    constructor(){
        this.history=[];
    }

    //method tik liyaganna
    getHistory() {
        console.log("call getHistory")
        // console.log(this.history)
        return this.history;
    }
   
    setHistory(history) {
        console.log("call setHistory")
        this.history.push(history);

        return this.history;
    }

    deleteHistory(){
        this.history.length=0;
    }
}

module.exports=Engine;