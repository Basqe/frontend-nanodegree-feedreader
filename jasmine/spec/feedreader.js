/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */

    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('has a URL defined and URL is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('has name defined and name is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* New test suite named "The menu" */

    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */

        it('element is hidden by default', function() {
            let body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('changes visibility when the menu icon is clicked', function() {
            let body = document.querySelector('body');
            let burger = document.querySelector('.menu-icon-link');
            burger.click();
            expect(body.classList).not.toContain('menu-hidden');
            burger.click();
            expect(body.classList).toContain('menu-hidden');
        });
    });

    /* New test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('there is at least a single entry element in feed container', function() {
            let entries = document.querySelector('.feed .entry');
            expect(entries.length).not.toBe(0);
        });
    });

    /* New test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {

        let firstFeed, secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                loadFeed(1, function() {
                    secondFeed = $('.feed').html();
                    done();
                })
            })
        });

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        it('has updated the feed', function() {
            expect(secondFeed).not.toBe(firstFeed);
        });
    });
}());
