class historyData {

    // getHistory() {
    //     return new Promise((resolve, reject) => {

    //         fetch('http://localhost:3001/calcApi/history', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         }).then(response => {
    //             return response.json();
    //         }).then(data => {
    //             console.log('Success_Azz:', data);
    //             return resolve(data);
    //         }).catch((error) => {
    //             console.error('Error:', error);
    //             return reject(error);
    //         });
    //     })
    // }

    getHistory() {
        return new Promise((resolve, reject) => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            // var raw = JSON.stringify(historyItem);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                // body: raw,
                redirect: 'follow'
              };

            fetch("http://localhost:3300/calcApi/historyList", requestOptions)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log('get history data')
                console.log(data)
                return resolve(data);
            }).catch((error) => {
                console.error('Error:', error);
                return reject(error);
            });
        })
    }



    addNewHistory(historyItem) {
        
        return new Promise((resolve, reject) => {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(historyItem);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };

            fetch("http://localhost:3300/calcApi/history", requestOptions)
            .then(response => {
                return response.json();
            }).then(data => {
                return resolve(data);
            }).catch((error) => {
                console.error('Error:', error);
                return reject(error);
            });

            }
        )

    }

    


    removeHistory() {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3300/calcApi/history`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(res => {
                    console.log(res);
                    return resolve(res);
                })
                .catch(err => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

}


export default historyData ;

