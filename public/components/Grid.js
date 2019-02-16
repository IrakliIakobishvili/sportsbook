const Grid = {
    table: '',
    oddsOrder: [],
    renderGridTable: function() {
        let table = document.createElement('table');
        table.classList.add('grid-table');
        Grid.table = table;
        General.root.appendChild(Grid.table);
    },
    renderGridHeader: function() {
        let loadLayout = (data) => {
            let tr = document.createElement('tr');
            tr.classList.add('grid-table__tr');
            let td = document.createElement('td');
            data = General.sortDescOrAsc(data,'priority','asc'); 
            let dateTd = td.cloneNode(true);
            dateTd.classList.add('grid-table__tr__td','grid-table__tr__td--date');
            let pairTd = td.cloneNode(true);
            pairTd.classList.add('grid-table__tr__td','grid-table__tr__td--pair');
            dateTd.innerHTML = 'Date';
            pairTd.innerHTML = 'Pair';
            tr.appendChild(dateTd);
            tr.appendChild(pairTd);
            Grid.oddsOrder.push('date');
            Grid.oddsOrder.push('pair');
            data.forEach((layout) => {       
                layout.odds = General.sortDescOrAsc(layout.odds,'priority','asc');
                layout.odds.forEach(odd => {                    
                    let headerTd = td.cloneNode(true);
                    headerTd.innerHTML = odd.name;
                    headerTd.classList.add('grid-table__tr__td');
                    headerTd.setAttribute('title',odd.name);
                    Grid.oddsOrder.push(odd.id);
                    tr.appendChild(headerTd);
                });
            });
            Grid.table.appendChild(tr);
        }
        General.ajaxRequest('layouts',loadLayout);
    },
    renderGridBody: function(data) {
            let table = document.querySelector('.grid-table');
            let i = table.children.length;
            while(--i) {
                table.children[i].parentNode.removeChild(table.children[i]);
            }
            let td = document.createElement('td');
            td.classList.add('grid-table__tr__td','grid-table__tr__td--body');
            let checkProp = (array,prop,value,targetEl,parentEl,testVal) => {
                for(let i = 0; i < Object.values(array).length; i++) {
                    let arr = Object.values(array);
                    let newArr = arr[i];
                    for(let j = 0; j < newArr.length; j++) {
                        if(newArr[j][`${prop}`] == testVal) {
                            targetEl.innerHTML = newArr[j][`${value}`];
                            break;
                        }
                    }
                }
            }
            let renderTr = (match) => {
                let tr = document.createElement('tr');
                tr.classList.add('grid-table__tr');
                for(let i = 0; i < Grid.oddsOrder.length; i++) {
                    let bodyTd = td.cloneNode(true);
                    bodyTd.setAttribute('name',Grid.oddsOrder[i]);
                    switch(bodyTd.getAttribute('name')) {
                        case 'date':
                            let currentFormat = match.sd;
                            currentFormat.split('T');
                            let newFormat = currentFormat.split('T')[0].split('-')[2]+'-'+currentFormat.split('T')[0].split('-')[1] +' '+currentFormat.split('T')[1].split(':')[0]+':'+currentFormat.split('T')[1].split(':')[1];
                            bodyTd.innerHTML = newFormat;
                        break
                        case 'pair':
                            bodyTd.innerHTML = match.h +' - '+ match.a;
                        break
                        case '1':
                            checkProp(match.odds,'name','value',bodyTd,tr,1);
                        break
                        case '2':
                            checkProp(match.odds,'name','value',bodyTd,tr,2);
                        break
                        case 'x':
                            checkProp(match.odds,'name','value',bodyTd,tr,'x');
                        break
                        case '1x':
                            checkProp(match.odds,'name','value',bodyTd,tr,'1x');
                        break
                        case '12':
                            checkProp(match.odds,'name','value',bodyTd,tr,'12');
                        break
                        case 'x2':
                            checkProp(match.odds,'name','value',bodyTd,tr,'x2');
                        break
                        case '01':
                            checkProp(match.odds,'name','value',bodyTd,tr,'01');
                        break
                        case '02':
                            checkProp(match.odds,'name','value',bodyTd,tr,'02');
                        break
                        case 'yes':
                            checkProp(match.odds,'name','value',bodyTd,tr,'yes');
                        break
                        case 'no':
                            checkProp(match.odds,'name','value',bodyTd,tr,'no');
                        break
                        case 'under':
                            checkProp(match.odds,'name','value',bodyTd,tr,'under');
                        break
                        case 'over':
                            checkProp(match.odds,'name','value',bodyTd,tr,'over');
                        break
                    }
                    tr.appendChild(bodyTd);
                }
                Grid.table.appendChild(tr);
            }
            data.forEach(match => {
                renderTr(match);
            });
    },
    render: function() {
        Grid.renderGridTable();
        Grid.renderGridHeader();
    }
}