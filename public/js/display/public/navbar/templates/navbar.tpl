<div class="container">
  <div class="navbar-header">
    <a class="navbar-brand" href="/">Siteify <span class="glyphicon glyphicon-off"></span></a>
  </div>
  <ul id="sf-primary-nav" class="nav navbar-nav"></ul>
  {{#if loggedin}}
    <ul class="nav navbar-nav navbar-right">
      <li><a href="modal:open:Profile"><span class="glyphicon glyphicon-user text-success"></span> Hey {{displayname}}</a></li>
      <li><a href="user:logout">Logout</a></li>
    </ul>
  {{else}}
    <ul class="nav navbar-nav navbar-right">
      <li><a href="modal:open:Login">Login</a></li>
      <li><a href="modal:open:Register">Register</a></li>
    </ul>
  {{/if}}
</div>