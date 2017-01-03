<span id="errorMessage" name="errorMessage"></span>
<form id="registerForm" name="registerForm">
    <fieldset>
        <label for="name">Name: </label>
        <input type="text" id="name" name="name" />
    </fieldset>
    <fieldset>
        <label for="surname">Surname: </label>
        <input type="text" id="surname" name="surname" required />
    </fieldset>
    <fieldset>
        <label for="login">Login: </label>
        <input type="text" id="login" name="login" required />
    </fieldset>
    <fieldset>
        <label for="password">Password: </label>
        <input type="password" id="password" name="password" required />
    </fieldset>
    <fieldset>
        <label for="passwordAgain">Password repeat: </label>
        <input type="password" id="passwordAgain" name="passwordAgain" required />
    </fieldset>
    <input type="submit" id="register" name="register" value="Register" />
</form>
<script src="js/registerScript.js" type="text/javascript"></script>

