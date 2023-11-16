$(document).ready(function () {
    // Initial content items display
    var originalItems = $('#content-section').children('.content-item').clone();
    filterAndSortContent('all', 'none');

    // Filter buttons click event
    $('#filter-buttons button').click(function () {
        $('#filter-buttons button').removeClass('active');
        $(this).addClass('active');
        var category = $(this).data('filter');
        var sortType = $('#sort-buttons button.active').data('sort');
        filterAndSortContent(category, sortType);
    });

    // Sort buttons click event
    $('#sort-buttons button').click(function () {
        $('#sort-buttons button').removeClass('active');
        $(this).addClass('active');
        var sortType = $(this).data('sort');
        var category = $('#filter-buttons button.active').data('filter');
        filterAndSortContent(category, sortType);
    });

    // Date filter buttons click event
    $('#date-filter-buttons button').click(function () {
        $('#date-filter-buttons button').removeClass('active');
        $(this).addClass('active');
        var dateFilterType = $(this).data('date-filter');
        filterByDate(dateFilterType);
    });

    // Filtering and sorting function
    function filterAndSortContent(category, sortType) {
        var items = originalItems.clone(); // Clone the original items

        // Filter by category
        if (category !== 'all') {
            items = items.filter('[data-category="' + category + '"]');
        }

        // Sort
        switch (sortType) {
            case 'name-asc':
                items.sort(function (a, b) {
                    return $(a).find('h3').text().localeCompare($(b).find('h3').text());
                });
                break;
            case 'name-desc':
                items.sort(function (a, b) {
                    return $(b).find('h3').text().localeCompare($(a).find('h3').text());
                });
                break;
            case 'date-asc':
                items.sort(function (a, b) {
                    var dateA = new Date($(a).data('date'));
                    var dateB = new Date($(b).data('date'));
                    return dateA - dateB;
                });
                break;
            case 'date-desc':
                items.sort(function (a, b) {
                    var dateA = new Date($(a).data('date'));
                    var dateB = new Date($(b).data('date'));
                    return dateB - dateA;
                });
                break;
            // Add more sorting cases as needed
        }

        $('#content-section').html(items);
    }

    // Date filtering function
    function filterByDate(dateFilterType) {
        var currentDate = new Date();
        var items = originalItems.clone(); // Clone the original items

        switch (dateFilterType) {
            case 'recent':
                items = items.filter(function () {
                    var itemDate = new Date($(this).data('date'));
                    return itemDate >= currentDate;
                });
                break;
            case 'old':
                items = items.filter(function () {
                    var itemDate = new Date($(this).data('date'));
                    return itemDate < currentDate;
                });
                break;
            // Add more date filtering cases as needed
        }

        $('#content-section').html(items);
    }
});
