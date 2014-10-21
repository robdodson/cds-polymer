Polymer({
  dispatchPage: function(e, detail, sender) {
    e.preventDefault();
    this.fire('page-change', {url: sender.href});
  }
});
