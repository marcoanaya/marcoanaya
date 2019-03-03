import { sampleProducts } from "./Data"


// Methods of this class are used to simulate calls to server. 
class Api {

    getItemUsingID(id) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                let res = sampleProducts.filter(x => x.id === parseInt(id, 10));
                resolve(res.length === 0 ? null : res[0]);

            }, 500)
        })
    }


    _sortData(data, sortval) {
        let items = JSON.parse(JSON.stringify(data));

        if (sortval === "lh") {
            items.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));

        } else if (sortval === "hl") {
            items.sort((a, b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0));

        }

        return items;
    }

    searchItems({ category, term, sortValue, itemsPerPage, popular, usePriceFilter, minPrice, maxPrice, page }) {


        return new Promise((resolve, reject) => {

            minPrice = parseInt(minPrice, 0);
            maxPrice = parseInt(maxPrice, 0);

            setTimeout(() => {

                let data = sampleProducts.filter(item => {

                    if (usePriceFilter && (item.price < minPrice || item.price > maxPrice)) {
                        return false;
                    }

                    if (category === "popular") {
                        return item.popular;
                    }

                    if (category !== "All categories" && category !== item.category)
                        return false;

                    if (term && !item.name.toLowerCase().includes(term.toLowerCase()))
                        return false;

                    return true;
                });

                if (sortValue) {
                    data = this._sortData(data, sortValue)
                }

                let totalLength = data.length;

                // Paging
                data = data.slice((parseInt(page, 0) - 1) * itemsPerPage, parseInt(page, 0) * itemsPerPage)

                resolve({ data, totalLength })


            }, 500)
        })


    }
}

export default new Api()
