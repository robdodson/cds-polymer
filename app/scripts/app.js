(function(document) {
  'use strict';

  var DEFAULT_ROUTE = 'all';

  var app = document.querySelector('#app');
  app.pages = [
    {
      name: 'All Contacts',
      hash: 'all',
      url: '/elements/contact-list/contact-list.html',
      el: 'contact-list'
    },
    {
      name: 'Starred',
      hash: 'starred',
      url: '/elements/starred-list/starred-list.html',
      el: 'starred-list'
    },
    {
      name: 'Circles',
      hash: 'circles',
      url: '/elements/circles-list/circles-list.html',
      el: 'circles-list'
    }
  ];

  app.addEventListener('template-bound', function() {
    var main = document.querySelector('main');

    this.init = function() {
      this.route = this.route || DEFAULT_ROUTE;
      this.loadPage(this.route);
    };

    this.onRouteChange = function(e, detail, sender) {
      var hash = detail;
      this.loadPage(hash);
    }

    this.loadPage = function(hash) {
      var page = this.findPageByHash(hash);
      if (!page) {
        return;
      }
      var url = page.url;
      var el = page.el;

      // Load imports async
      // We get caching for free from HTML Imports (even in polyfill)
      // Replace the contents of main with the newly imported element
      Polymer.import([url], function() {
        var newEl = document.createElement(el);
        if (main.firstElementChild) {
          return main.replaceChild(newEl, main.firstElementChild);
        }
        main.appendChild(newEl);
      });

      // scaffold.closeDrawer();
    };

    this.findPageByHash = function(hash) {
      var foundPage;
      app.pages.forEach(function(page) {
        if (page.hash === hash) {
          foundPage = page;
        }
      });
      return foundPage;
    };

    this.init(); // LIFTOFF!
  });

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
