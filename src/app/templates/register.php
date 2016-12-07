<span id="errorMessage" name="errorMessage"></span>
<form id="registerForm" name="registerForm">
    <fieldset>
        <label for="name">Name: </label>
        <input type="text" id="name" name="name" />
    </fieldset>
    <!--<span id="nameMessage"></span>-->
    <fieldset>
        <label for="surname">Surname: </label>
        <input type="text" id="surname" name="surname" required />
    </fieldset>
    <!--<span id="surnameMessage"></span>-->
    <fieldset>
        <label for="login">Login: </label>
        <input type="text" id="login" name="login" required />
    </fieldset>
    <!--<span id="loginMessage"></span>-->
    <fieldset>
        <label for="password">Password: </label>
        <input type="password" id="password" name="password" required />
    </fieldset>
    <!--<span id="passwordMessage"></span>-->
    <fieldset>
        <label for="passwordAgain">Password repeat: </label>
        <input type="password" id="passwordAgain" name="passwordAgain" required />
    </fieldset>
    <!--<span id="passwordAgainMessage"></span>-->
    <input type="submit" id="register" name="register" value="Register" />
</form>
<script src="../src/app/js/registerScript.js" type="text/javascript"></script>

<script type="text/javascript">

</script>

<style>
    label{
        width: 200px;
        display: inline-block;
    }
    fieldset{
        border: none;
    }

    input.error{
        border: 1px solid red;
    }
    .valid{
        border: 1px solid green;
    }
</style>