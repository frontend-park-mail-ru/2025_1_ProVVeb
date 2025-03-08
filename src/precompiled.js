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
templates['card.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
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

  return "<div class=\"card\">\r\n	<form action=\"\" class=\"innerCard\">\r\n		<div class=\"headerCard\">\r\n			"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"progressBar") || (depth0 != null ? lookupProperty(depth0,"progressBar") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"progressBar","hash":{},"data":data,"loc":{"start":{"line":4,"column":3},"end":{"line":4,"column":22}}}) : helper))) != null ? stack1 : "")
    + "\r\n			<h2>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"cardTitle") || (depth0 != null ? lookupProperty(depth0,"cardTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardTitle","hash":{},"data":data,"loc":{"start":{"line":5,"column":7},"end":{"line":5,"column":22}}}) : helper)))
    + "</h2>\r\n			"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"linkToPage") || (depth0 != null ? lookupProperty(depth0,"linkToPage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkToPage","hash":{},"data":data,"loc":{"start":{"line":6,"column":3},"end":{"line":6,"column":21}}}) : helper))) != null ? stack1 : "")
    + "\r\n		</div>\r\n		<div class=\"fieldsCard\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"fields") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":3},"end":{"line":11,"column":12}}})) != null ? stack1 : "")
    + "		</div>\r\n		"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"button") || (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"button","hash":{},"data":data,"loc":{"start":{"line":13,"column":2},"end":{"line":13,"column":16}}}) : helper))) != null ? stack1 : "")
    + "\r\n	</form>\r\n</div>";
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