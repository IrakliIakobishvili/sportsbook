const General = {
    root: document.getElementById('root'),
    ajaxRequest: function(url,callBack,sendValue='') {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function(){
            if(xhr.status == 200) {
                let response = JSON.parse(this.responseText); 
                callBack(response);
            }        
        }
        if(!sendValue) {
            xhr.send();
        }else {
            xhr.send(JSON.stringify({value:sendValue}))
        }
    },
    sortDescOrAsc: function(arr,prop,sortType) {
        let result = '';
        result = arr.sort(function(a, b) {
            if(sortType == 'desc') {
                return parseFloat(b[`${prop}`]) - parseFloat(a[`${prop}`]);
            }else if(sortType == 'asc') {
                return parseFloat(a[`${prop}`]) - parseFloat(b[`${prop}`]);
            }
        });
        return result;
    },
    sortAlphabetically: function(arr) {
        let result = '';
        result = arr.sort(function(a, b){
            let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
            if (nameA < nameB)
             return -1;
            if (nameA > nameB)
             return 1;
            return 0;
        });
        return result;
    }
}