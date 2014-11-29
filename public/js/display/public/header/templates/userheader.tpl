{{#if loggedin}}
    <li><a href="modal:open:Profile"><span class="glyphicon glyphicon-user text-success"></span> Hey {{displayname}}</a></li>
    <li><a href="user:logout">Logout</a></li>
{{else}}
    <li><a href="modal:open:Login">Login</a></li>
    <li><a href="modal:open:Register">Register</a></li>
{{/if}}