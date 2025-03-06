(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['loginInput.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a id=\"toReg\">Регистрациыыы</a>";
},"useData":true});
templates['auth.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Авторизация</h1>\r\n<a id='loginLink'>Создать аккаунт</a>";
},"useData":true});
templates['login.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Регистрация</h1>\r\n<a id='authLink'>Уже есть аккаунт? Войти</a>";
},"useData":true});
})();