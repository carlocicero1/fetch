import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...

const retrieve = async (options = { page, colors }) => {
    const ids;
    const open;
    const closedPrimaryCount;
    const previousPage;
    const nextPage;
    const primaryColors = ['red', 'blue', 'yellow']
    const response;

    function buildResponse(data) {
        const response = {};

        data.map(index => ids.push(index.id))

        response.ids = ids;
        response.open = open = data.filter((index) => {
            if (index.disposition == 'open') {
                index.isPrimary = primaryColors.includes(index.color);
            }
        })
        response.closedPrimaryCount = closedPrimaryCount = data.filter(index => index.disposition == 'closed' && index.isPrimary == true);
        response.previousPage = previousPage = options.page > 1 ? options.page - 1 : null;
        response.nextPage = nextPage = options.page < 50 ? options.page + 1 : null;

        return response;

    }
    fetch(URI(window.path)
        .addSearch('colors', options.colors))
        .addSearch('page', options.page)
        .then(response => response.json())
        .then(data => response = data);

        buildResponse(response)

    return response;
}

export default retrieve;
