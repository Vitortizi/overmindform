(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        $("#slider").checked = false;
        $("#register").removeClass("btn-outline-dark");
        $("#register").addClass("btn-outline-light");
    } else {
        setTheme('theme-light');
        $("#slider").checked = true;
        $("#register").removeClass("btn-outline-light");
        $("#register").addClass("btn-outline-dark");
    }
})();

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        $("#register").removeClass("btn-outline-light");
        $("#register").addClass("btn-outline-dark");
    } else {
        setTheme('theme-dark');
        $("#register").removeClass("btn-outline-dark");
        $("#register").addClass("btn-outline-light");
    }
}

function validPassword() {
    var pass1 = $("#inputPassword").val();
    var pass2 = $("#inputPasswordValidate").val();

    if (pass1 != "" && pass2 != "" && pass1 == pass2) {
        $("#inputPasswordValidate").removeClass("is-invalid");
        return true;
    } else {
        $("#inputPasswordValidate").addClass("is-invalid");
        return false;
    }
}

function validEmail() {
    var email = $("#inputEmail").val();
    var pattern = new RegExp(/^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i);

    if (email) {
        if (!pattern.test(email)) {
            $("#inputEmail").addClass("is-invalid");
            return;
        }

        $("#inputEmail").removeClass("is-invalid");
        return;
    }
}

function mask(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmask()", 1)
}

function execmask() {
    v_obj.value = v_fun(v_obj.value)
}

function phone(v) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos

    return v;
}

function validPhone() {
    var phone = $("#inputPhone").val();

    phone.length < 14 ? $("#inputPhone").addClass("is-invalid") : $("#inputPhone").removeClass("is-invalid");
}

function validFilds() {
    var isValid = true;

    $('input[type=text], input[type=email]').each(
        function (index, element) {
            if ($(element).val().length == 0) {
                $(element).addClass("is-invalid");
                isValid = false;
            } else {
                $(element).removeClass("is-invalid")
            }
        }
    )

    return isValid;
}

function sendEmail() {
    validPassword();

    if (validFilds() && validPassword()) {
        var subject = "Cadastro";
        var body = "Informações de cadastro:\r\n\r\n";
        body += "Nome: " + $("#inputName").val() + "\r\n";
        body += "E-mail: " + $("#inputEmail").val() + "\r\n";
        body += "Telefone: " + $("#inputPhone").val() + "\r\n";
        body += "Senha: " + $("#inputPassword").val() + "\r\n";

        var uri = "mailto:contato@overmind.ai?subject=" + subject + "&body=" + encodeURIComponent(body);
        window.open(uri);

        $('#myModal').modal('show');
    } else {
        $('#myModalError').modal('show');
    }
}