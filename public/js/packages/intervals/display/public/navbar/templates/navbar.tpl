<div class="container">
  <div class="navbar-header">
    <a class="navbar-brand" href="/">Interval Filter <span class="glyphicon glyphicon-sound-7-1"></span></a>
  </div>
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