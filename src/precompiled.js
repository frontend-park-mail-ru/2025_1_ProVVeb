(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['button.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button class=\"button\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"buttonText") || (depth0 != null ? lookupProperty(depth0,"buttonText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"buttonText","hash":{},"data":data,"loc":{"start":{"line":1,"column":23},"end":{"line":1,"column":39}}}) : helper)))
    + "</button>";
},"useData":true});
templates['card.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['input.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"inputContainer\">\r\n	<input type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"typeInput") || (depth0 != null ? lookupProperty(depth0,"typeInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"typeInput","hash":{},"data":data,"loc":{"start":{"line":2,"column":14},"end":{"line":2,"column":27}}}) : helper)))
    + "\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"idInput") || (depth0 != null ? lookupProperty(depth0,"idInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idInput","hash":{},"data":data,"loc":{"start":{"line":2,"column":33},"end":{"line":2,"column":44}}}) : helper)))
    + "\" name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"nameInput") || (depth0 != null ? lookupProperty(depth0,"nameInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nameInput","hash":{},"data":data,"loc":{"start":{"line":2,"column":52},"end":{"line":2,"column":65}}}) : helper)))
    + "\" placeholder=\" \" required>\r\n	<label for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"idInput") || (depth0 != null ? lookupProperty(depth0,"idInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idInput","hash":{},"data":data,"loc":{"start":{"line":3,"column":13},"end":{"line":3,"column":24}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelText") || (depth0 != null ? lookupProperty(depth0,"labelText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelText","hash":{},"data":data,"loc":{"start":{"line":3,"column":26},"end":{"line":3,"column":39}}}) : helper)))
    + "</label>\r\n</div>";
},"useData":true});
templates['progressBar.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"progressBarContainer\">\r\n	<div class=\"progressBarLine\" data-percent=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"progressPercent") || (depth0 != null ? lookupProperty(depth0,"progressPercent") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"progressPercent","hash":{},"data":data,"loc":{"start":{"line":2,"column":44},"end":{"line":2,"column":65}}}) : helper)))
    + "\"></div>\r\n</div>";
},"useData":true});
templates['auth.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Авторизация</h1>\r\n<a id='loginLink'>Создать аккаунт</a>\r\n\r\n";
},"useData":true});
templates['login.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Регистрация</h1>\r\n<a id='authLink'>Уже есть аккаунт? Войти</a>";
},"useData":true});
})();