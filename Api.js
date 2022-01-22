class Api{

    newPromise(url, method, body=null){
        this.callApiProblem = null
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.open(method, url, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:8888');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => {
                if(xhr.statusText == ''){
                    this.callApiProblem = 'NETWORK_OR_CORS_PROBLEM'
                    reject(this.callApiProblem)
                }
                else{
                    reject(xhr.statusText);
                }
            }
            xhr.send(JSON.stringify(body));
        });
    }
}