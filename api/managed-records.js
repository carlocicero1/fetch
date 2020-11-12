import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...

const retrieve = async (options = { page, colors }) => {
    const previousPage;
    const nextPage;
    const primaryColors = ['red', 'blue', 'yellow']
    let response;

    response = fetch(URI(window.path)
                .addSearch('colors', options.colors))
                .addSearch('page', options.page)
                .then(response => response.json())
                .then(data => buildResponse(data))


    function buildResponse(data) {
        const response = {};
        let ids = [];
        let pageUpperBound = data.page * 10;
        let pageLowerBound = pageUpperBound - 10;

        data.map(index => { if (index.id < 3) ids.push(index.id) })

        response.ids = data.filter(index => pageLowerBound <= index.id <= pageUpperBound)

        response.open = data.filter((index) => {
            if (index.disposition == 'open') {
                index.isPrimary = primaryColors.includes(index.color);
            }
        })
        response.closedPrimaryCount = data.filter(index => index.disposition == 'closed' && index.isPrimary == true);
        response.closedPrimaryCount = response.closedPrimaryCount.length();

        response.previousPage = previousPage = options.page > 1 ? options.page - 1 : null;
        response.nextPage = nextPage = options.page < 50 ? options.page + 1 : null;

        return response;

    }
    return response
}

export default retrieve;
