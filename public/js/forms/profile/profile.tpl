<h3>{{displayname}}'s Profile</h3>
<form role="form" class="clearfix">
  <div class="form-group">
    <label class="control-label" for="displayname-field">Display name</label>
    <input type="text" class="form-control" id="displayname-field" name="displayname" placeholder="{{displayname}}" />
  </div>
  <div class="form-group">
    <label class="control-label" for="company-field">Company details</label>
    <input type="text" class="form-control" id="company-field" name="company" placeholder="{{company}}" />
  </div>
  <div class="form-group">
    <label class="control-label" for="firstname-field">First name</label>
    <input type="text" class="form-control" id="firstname-field" name="firstname" placeholder="{{firstname}}" />
  </div>
  <div class="form-group">
    <label class="control-label" for="lastname-field">Last name</label>
    <input type="text" class="form-control" id="lastname-field" name="lastname" placeholder="{{lastname}}" />
  </div>
  <div class="form-group">
    <!-- <a class="pull-left btn btn-danger delete-user">Delete {{displayname}}</a> -->
    <button type="submit" class="pull-right btn btn-primary">Submit</button>
  </div>
</form>