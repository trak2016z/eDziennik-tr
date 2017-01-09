<span id="errorMessage" name="errorMessage"></span>
<span id="successMessage" name="successMessage"></span>
<div>
    <form id="userDataForm">
        <fieldset>
            <label for="userName">Imię: </label>
            <input type="text" id="userName" name="userName" />
        </fieldset>
        <fieldset>
            <label for="userSurname">Nazwisko: </label>
            <input type="text" id="userSurname" name="userSurname" />
        </fieldset>
        <fieldset>
            <label for="userLogin">Login: </label>
            <input type="text" id="userLogin" name="userLogin" />
        </fieldset>
        <fieldset>
            <label for="userGroup">Grupa: </label>
            <input type="text" id="userGroup" name="userGroup" disabled />
        </fieldset>
        <fieldset>
            <label for="newUserPassword">Nowe hasło: </label>
            <input type="password" id="newUserPassword" name="newUserPassword" />
        </fieldset>
        <fieldset>
            <label for="newUserPasswordAgain">Powtórz nowe hasło: </label>
            <input type="password" id="newUserPasswordAgain" name="newUserPasswordAgain" />
        </fieldset>
        <input type="submit" id="changeUserData" name="changeUserData" value="Zapisz" />
    </form>
</div>
<script src="js/userAccountScript.js" type="text/javascript"></script>