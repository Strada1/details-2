class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError extends MyError {
    constructor(nameCity){
        super(`Город "${nameCity}" не найден`);
        this.nameCity = nameCity;
    }
}

class RequestError extends MyError {
    constructor(request){
        super(`Запрос "${request}" завершился с ошибкой`);
    }
}

export { ValidationError, RequestError }