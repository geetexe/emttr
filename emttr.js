class Emttr {
    constructor(){
        this.subscribers = {};
    }

    subscribe(event, callback) {
        if(!this.subscribers[event]){
            this.subscribers[event] = [];
        }

        if(this.subscribers[event].includes(callback)){
            return {
                unsubscribe: () => {}
            };
        }
        this.subscribers[event].push(callback);

        return {
            unsubscribe: () => {
                this.subscribers[event] = (this.subscribers[event] || []).filter(cb => cb !== callback);
            }
        };
    }

    publish(event, data) {
        const callbacks = this.subscribers[event];
        if(callbacks?.length){
            callbacks.forEach(callback => {
                try{
                    callback(data);
                }
                catch(err){
                    console.error(`Emttr: error in subscriber for ${event}`, err);
                }
            });
        }
    }

    clear(event){
        if(event){
            delete this.subscribers[event];
        }
        else{
            this.subscribers = {};
        }
    }

    debug() {
        return {
            count: event => (this.subscribers?.[event] || []).length,
            subscribers: () => Object.fromEntries(
                Object.entries(this.subscribers).map(([event, callbacks]) => [event, [...callbacks]])
            )
        };
    }

}

export default Emttr;