(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['personCard.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"personCard\" style=\"background-image: url('"
    + alias4(((helper = (helper = lookupProperty(helpers,"srcPersonPicture") || (depth0 != null ? lookupProperty(depth0,"srcPersonPicture") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"srcPersonPicture","hash":{},"data":data,"loc":{"start":{"line":1,"column":54},"end":{"line":1,"column":76}}}) : helper)))
    + "');\">\r\n	<div class=\"personInfo\">\r\n		<p class=\"personalData\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"personName") || (depth0 != null ? lookupProperty(depth0,"personName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"personName","hash":{},"data":data,"loc":{"start":{"line":3,"column":26},"end":{"line":3,"column":42}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"personAge") || (depth0 != null ? lookupProperty(depth0,"personAge") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"personAge","hash":{},"data":data,"loc":{"start":{"line":3,"column":43},"end":{"line":3,"column":58}}}) : helper)))
    + " лет</p>\r\n		<p class=\"personDescription\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"personDescription") || (depth0 != null ? lookupProperty(depth0,"personDescription") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"personDescription","hash":{},"data":data,"loc":{"start":{"line":4,"column":31},"end":{"line":4,"column":54}}}) : helper)))
    + "</p>\r\n	</div>\r\n	<div class=\"personCardBtns\">\r\n		<button class=\"iconButton\">\r\n			<img src=\"media/btn/actionBtnRepeat.svg\" alt=\"Кнопка Повтор\" width=\"56\" height=\"56\">\r\n		</button>\r\n		<button class=\"iconButton\">\r\n			<img src=\"media/btn/actionBtnDislike.svg\" alt=\"Кнопка Дизлайк\" width=\"70\" height=\"70\">\r\n		</button>\r\n		<button class=\"iconButton\">\r\n			<img src=\"media/btn/actionBtnStar.svg\" alt=\"Кнопка Звезда\" width=\"56\" height=\"56\">\r\n		</button>\r\n		<button class=\"iconButton\">\r\n			<img src=\"media/btn/actionBtnLike.svg\" alt=\"Кнопка Лайк\" width=\"70\" height=\"70\">\r\n		</button>\r\n		<button class=\"iconButton\">\r\n			<img src=\"media/btn/actionBtnLightning.svg\" alt=\"Кнопка Молния\" width=\"56\" height=\"56\">\r\n		</button>\r\n	</div>\r\n</div>";
},"useData":true});
templates['button.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button type=\"button\" class=\"button\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"buttonText") || (depth0 != null ? lookupProperty(depth0,"buttonText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"buttonText","hash":{},"data":data,"loc":{"start":{"line":1,"column":37},"end":{"line":1,"column":53}}}) : helper)))
    + "</button>";
},"useData":true});
templates['formCard.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			"
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"formCard\">\r\n	<form action=\"\" class=\"innerFormCard\">\r\n		<div class=\"headerFormCard\">\r\n			"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"progressBar") || (depth0 != null ? lookupProperty(depth0,"progressBar") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"progressBar","hash":{},"data":data,"loc":{"start":{"line":4,"column":3},"end":{"line":4,"column":22}}}) : helper))) != null ? stack1 : "")
    + "\r\n			<h2>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"cardTitle") || (depth0 != null ? lookupProperty(depth0,"cardTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardTitle","hash":{},"data":data,"loc":{"start":{"line":5,"column":7},"end":{"line":5,"column":22}}}) : helper)))
    + "</h2>\r\n			"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"linkToPage") || (depth0 != null ? lookupProperty(depth0,"linkToPage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkToPage","hash":{},"data":data,"loc":{"start":{"line":6,"column":3},"end":{"line":6,"column":21}}}) : helper))) != null ? stack1 : "")
    + "\r\n		</div>\r\n		<div class=\"fieldsFormCard\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"fields") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":3},"end":{"line":11,"column":12}}})) != null ? stack1 : "")
    + "		</div>\r\n		"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"button") || (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"button","hash":{},"data":data,"loc":{"start":{"line":13,"column":2},"end":{"line":13,"column":16}}}) : helper))) != null ? stack1 : "")
    + "\r\n	</form>\r\n</div>";
},"useData":true});
templates['header.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "greeting";
},"3":function(container,depth0,helpers,partials,data) {
    return "''";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"header "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isGreeting") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":19},"end":{"line":1,"column":62}}})) != null ? stack1 : "")
    + "\">\r\n    <div class=\"inner-header "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isGreeting") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":2,"column":29},"end":{"line":2,"column":72}}})) != null ? stack1 : "")
    + "\">\r\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"logotype") || (depth0 != null ? lookupProperty(depth0,"logotype") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"logotype","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":24}}}) : helper))) != null ? stack1 : "")
    + "\r\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"profile") || (depth0 != null ? lookupProperty(depth0,"profile") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profile","hash":{},"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":4,"column":23}}}) : helper))) != null ? stack1 : "")
    + "\r\n    </div>\r\n</div>";
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
    + "\" placeholder=\"\" required\r\n		autocomplete='"
    + alias4(((helper = (helper = lookupProperty(helpers,"autocompleteInput") || (depth0 != null ? lookupProperty(depth0,"autocompleteInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"autocompleteInput","hash":{},"data":data,"loc":{"start":{"line":3,"column":16},"end":{"line":3,"column":37}}}) : helper)))
    + "' />\r\n	<label for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"idInput") || (depth0 != null ? lookupProperty(depth0,"idInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idInput","hash":{},"data":data,"loc":{"start":{"line":4,"column":13},"end":{"line":4,"column":24}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelText") || (depth0 != null ? lookupProperty(depth0,"labelText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelText","hash":{},"data":data,"loc":{"start":{"line":4,"column":26},"end":{"line":4,"column":39}}}) : helper)))
    + "</label>\r\n</div>";
},"useData":true});
templates['linkTo.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a class=\"linkTo\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"idLink") || (depth0 != null ? lookupProperty(depth0,"idLink") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idLink","hash":{},"data":data,"loc":{"start":{"line":1,"column":22},"end":{"line":1,"column":34}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"linkText") || (depth0 != null ? lookupProperty(depth0,"linkText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkText","hash":{},"data":data,"loc":{"start":{"line":1,"column":36},"end":{"line":1,"column":50}}}) : helper)))
    + "</a>";
},"useData":true});
templates['logo.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"logotypeBlock\">\r\n	<img src=\"../../../media/logo/"
    + alias4(((helper = (helper = lookupProperty(helpers,"png_name") || (depth0 != null ? lookupProperty(depth0,"png_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"png_name","hash":{},"data":data,"loc":{"start":{"line":2,"column":31},"end":{"line":2,"column":45}}}) : helper)))
    + "\" alt=\"Логотип\">\r\n	<p class="
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":3,"column":10},"end":{"line":3,"column":20}}}) : helper)))
    + ">BeamEye</p>\r\n</div>";
},"useData":true});
templates['notification.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"3":function(container,depth0,helpers,partials,data) {
    return "success";
},"5":function(container,depth0,helpers,partials,data) {
    return "Ошибка!";
},"7":function(container,depth0,helpers,partials,data) {
    return "Успех!";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"cross\"><img src=\"../../../media/icons/cross"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isWarning") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":6,"column":79},"end":{"line":6,"column":117}}})) != null ? stack1 : "")
    + ".svg\" alt=\"cross\"></div>";
},"10":function(container,depth0,helpers,partials,data) {
    return " white";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"notification "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isWarning") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":25},"end":{"line":1,"column":64}}})) != null ? stack1 : "")
    + "\">\r\n    <div class=\"error-message\">\r\n        <h1>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isWarning") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":3,"column":12},"end":{"line":3,"column":57}}})) != null ? stack1 : "")
    + "</h1>\r\n        <p>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":4,"column":11},"end":{"line":4,"column":20}}}) : helper)))
    + "</p>\r\n    </div>\r\n    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isWithButton") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":4},"end":{"line":6,"column":148}}})) != null ? stack1 : "")
    + "\r\n</div>";
},"useData":true});
templates['profile.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"profile\">\r\n    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"profile_name") || (depth0 != null ? lookupProperty(depth0,"profile_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profile_name","hash":{},"data":data,"loc":{"start":{"line":2,"column":7},"end":{"line":2,"column":23}}}) : helper)))
    + "</p>\r\n    <div class=\"photo\">\r\n        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"path") || (depth0 != null ? lookupProperty(depth0,"path") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data,"loc":{"start":{"line":4,"column":18},"end":{"line":4,"column":28}}}) : helper)))
    + "\" alt=\"profile photo\">\r\n    </div>\r\n</div>";
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
})();