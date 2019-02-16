const Tree = {
    tree: '',
    renderTree: function() {
        let tree = document.createElement('div');
        tree.classList.add('tree');
        Tree.tree = tree;
        General.root.appendChild(Tree.tree);
    },
    renderSportList: function() {
        let loadSports = (data) => {
            let list = document.createElement('ul');
            data = General.sortDescOrAsc(data,'priority','desc');           
            data.forEach(sport => {
                let sportList = list.cloneNode(true);
                sportList.innerHTML = `<li class='item sport-list__item'><span class='name'>${sport.name}</span><span class='total'>${sport.total}</span></li>`;
                sportList.classList.add('sport-list','list'); 
                sport.countries = General.sortAlphabetically(sport.countries);
                sport.countries.forEach(country => {
                    let countryList = list.cloneNode(true);
                    countryList.innerHTML = `<li class='item'><span class='name'>${country.name}</span><span class='total'>${country.total}</span></li>`;
                    countryList.classList.add('sport-list__country-list','list');
                    sportList.firstChild.appendChild(countryList);
                    country.leagues = General.sortAlphabetically(country.leagues);
                    country.leagues.forEach(league => {
                        let leagueList = list.cloneNode(true);
                        leagueList.setAttribute('id',league.id);
                        leagueList.classList.add('sport-list__country-list__league-list','list');
                        leagueList.innerHTML = `<li class='item'><span class='name'>${league.name}</span><span class='total'>${league.total}</span></li>`;
                        countryList.firstChild.appendChild(leagueList);
                    })               
                });           
                Tree.tree.appendChild(sportList.cloneNode(true));     
            });
            Events.sportsBook();
        }
        General.ajaxRequest('tree',loadSports);
    },

    render: function() {
        Tree.renderTree();
        Tree.renderSportList();
    }
}