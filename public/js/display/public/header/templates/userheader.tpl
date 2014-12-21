{{#if loggedin}}
    <li><a href="#" modal="Profile"><span class="glyphicon glyphicon-user text-success"></span> Hey {{displayname}}</a></li>
    <li><a href="user:logout">Logout</a></li>
{{else}}
    <li><a href="#" modal="Login">Login</a></li>
    <li><a href="#" modal="Register">Register</a></li>
{{/if}}