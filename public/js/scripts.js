const Events = {
    sportsBook: function() {
        let dropDownSport = function(e) {
            let countryItems = this.querySelectorAll('.sport-list__country-list');
            countryItems.forEach(countryItem => {
                countryItem.classList.toggle('show');
            });
        }
        let dropDownCountry = function(e) {
            e.stopPropagation();
            let leagues = this.querySelectorAll('.sport-list__country-list__league-list');
            leagues.forEach(league => {
                league.classList.toggle('show');                
            });
        }
        let dropDownLeague = function(e) {
            e.stopPropagation();
            let id = this.getAttribute('id');
            General.ajaxRequest('matches',Grid.renderGridBody,id);
        }

        let sportItems = document.querySelectorAll('.sport-list__item');
        let countryILists = document.querySelectorAll('.sport-list__country-list');
        let leagues = document.querySelectorAll('.sport-list__country-list__league-list');

        sportItems.forEach(sportItem => {
            sportItem.addEventListener('click',dropDownSport);
        });

        countryILists.forEach(countryIList => {
            countryIList.addEventListener('click',dropDownCountry);
        });

        leagues.forEach(league => {
            league.addEventListener('click',dropDownLeague);
        });
    }
}
