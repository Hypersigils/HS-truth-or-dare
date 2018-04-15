//PROTOYPES

Array.prototype.random = function() {

	return this[Math.floor(Math.random() * this.length)];
}

//SETUP SCRIPTS

var make_checkbox_list = function(json_object) {
	$.each(json_object, function(top_title, top) {
		var div = document.createElement("div");
		div.id = top_title;
		div.className = "white";

		var h3 = document.createElement("h3");
		h3.textContent = top_title;
		div.append(h3);

		$.each(top, function(middle_title, middle) {
			div.append(middle_title);

			var ul = document.createElement("ul");
			$.each(middle, function(bottom_title, bottom) {
				var li = document.createElement("li");
				li.innerHTML = "<label>" + bottom + "<span><input type=\"checkbox\"></span>";
				ul.append(li);
			});
			div.append(ul);
		});
		$("#middle").append(div);
	});
}

var make_ul = function(items, include_erogenous) {
	var ul = document.createElement("ul");
	items.forEach(function(item) {
		var li = document.createElement("li");
		var label = document.createElement("label");
		var erogenous_span = document.createElement("span");
		var text_span = document.createElement("span");
		var enabled_span = document.createElement("span");
		var erogenous_input = document.createElement("input");
		var enabled_input = document.createElement("input");

		if(include_erogenous) {
			erogenous_span.className = "erogenous";
			erogenous_input.type = "checkbox";
			erogenous_input.checked = true;
			erogenous_span.append(erogenous_input);
			li.append(erogenous_span);
		}

		text_span.className = "title";
		if(typeof item == "object") text_span.textContent = item.title;
		else text_span.textContent = item;
		label.append(text_span);

		enabled_span.className = "enabled";
		enabled_input.type = "checkbox";
		enabled_input.checked = true;
		enabled_span.append(enabled_input);
		label.append(enabled_span);

		li.append(label);
		ul.append(li);
	});

	return ul;
}

var select_defaults = function() {
	$(".available#parts span.enabled input").prop("checked", false);
	$(".available#toys span.enabled input").prop("checked", false);

	var EVERYONE_HAS_THESE = ["Mouth","Cheeks","Nipples","Ass cheeks","Ass","Phone"];
	var NOT_EVERYONE_LIKES_THESE = ["Cheeks","Ass cheeks","Ass"];

	EVERYONE_HAS_THESE.forEach(function(part) {
		$(".available li:contains('" + part + "') span.enabled input").prop("checked", true);
	});
	NOT_EVERYONE_LIKES_THESE.forEach(function(part) {
		$(".available#parts li:contains('" + part + "') span.erogenous input").prop("checked", false);
	});
}

// var populate_seriousnesses = function() {
// 	$("select.seriousness").each(function() {
// 		for(i=0; i<5; i++) {
// 			var elem = document.createElement("option");
// 			elem.textContent = i;
// 			$(this).append($(elem));	
// 		};
// 	});
// }

var get_modes = function(game) {
	var triggers = game["Triggers"];
	var modes = new Set();

	for(var category in triggers) {
		// console.log(triggers[category])
		triggers[category].forEach(function(trigger) {
			if(trigger.modes) trigger.modes.forEach(function(mode) {
				modes.add(mode);
			});
		});
	}	

	return Array.from(modes);
}

var fill_lists = function() {
	var game = this[$("#game select").children(":selected").attr("value")];

	var trigger_list = {"divs":["game-specific triggers", "universal triggers"], "pools":[game["Triggers"], defaults["Triggers"]], "erogenous":[false, false]};
	var task_list = {"divs":["game-specific tasks", "universal tasks"], "pools":[game["Tasks"], defaults["Tasks"]], "erogenous":[false, false]};
	var available_list = {"divs":["parts","toys"], "pools":[availables["Available parts"], availables["Available toys"]], "erogenous":[true, false]};
	var modes_list = {"divs":["modes"], "pools":[get_modes(game)], "erogenous":[false]};

	var lists = [trigger_list, task_list, available_list, modes_list];

	// For each list we've got...
	lists.forEach(function(list) {
		// console.log(list);
		// For each div we're filling with that list...
		for(var i=0; i<list.divs.length; i++) {
			// Get the div...
			var div = $("[id='" + list.divs[i] + "']");
			// If it's just a list, go for it
			// console.log(list.pools[i]);
			if(list.pools[i].length) {
				div.append(make_ul(list.pools[i], list.erogenous[i]));
			} else {
				// if it's an object with categories, loop it instead.
				for(var category in list.pools[i]) {
					div.append(category);
					div.append(make_ul(list.pools[i][category], list.erogenous[i]));
				}
			}
		}
	});
}

var grey_unchecked = function() {

	$("span.enabled :checkbox").change(function() {
		if(this.checked) {
			$(this).closest("li").find("span.title").animate({opacity: 1});
			$(this).closest("li").find("span.erogenous").animate({opacity: 1});
		} else {
			$(this).closest("li").find("span.title").animate({opacity: .5});
			$(this).closest("li").find("span.erogenous").animate({opacity: .5});
		}
	});

	$("li:has(span.enabled input:checkbox:not(:checked))").each(function() {
		$(this).find("span.title").css("opacity", .5);
		$(this).find("span.erogenous").css("opacity", .5);
	});
}

//REGEX FUNCTIONS

var split_line = function(line) {

	while(true) {
		var match = line.match(/\[(.*?)\]/);
		if(!match) break;
		var options = match[1].split("/");
		line = line.replace(match[0], options.random());
	}

	return line;
}

var fill_archetype = function(line) {

	var archetypes = {"bodypart": get_boxes("parts", "enabled", true), "erogenous_zone": get_boxes("parts", "erogenous", true), "toy": get_boxes("toys", "enabled", true)};

	while(line.includes("$")) {
		var match = line.match(/\$(.*?)\$/);
		if(archetypes[match[1]]) {
			line = line.replace(match[0], archetypes[match[1]].random().toLowerCase());
		} else {
			break;
		}
	}

	return line;
}

//NATURAL LANGUAGE

var pronounize = function(line) {
	console.log(line);

	var exceptions = {"is": "are"};
	var words = line.split(" ");
	var first_word = words[0];

	for(var key in exceptions) {
		if(words[0] === key) {
			words[0] = exceptions[key];
			line = words.join(" ");
			return line;
		}
	}

	if(first_word[first_word.length - 1] === "s") line = line.replace(first_word, first_word.slice(0, -1));
	return line;
}

//THE REST

var get_random_tord = function(pools, exceptions) {
	var all_tords = [];
	for(var pool of pools) {
		for(var category in pool) {
			for(var item of pool[category]) {
				all_tords.push(item);
			}
		}
	}

	var possible_tords = [];
	// for each tord object...
	all_tords.forEach(function(tord) {
		// compare it with every type of exception...
		for(var key in exceptions) {
			// if the object has a need for something from that type...
			var needs = tord[key];
			if(needs) {
				// if this is not a list, make it one. Thanks .js.
				if(typeof needs != "object") var needs = [needs];
				// if it has a need for one included in the exceptions, break!
				if(exceptions[key].some(function(exception) {
					return needs.includes(exception);
				})) return;
			}
		}

		// otherwise, push it!
		possible_tords.push(tord);
	});

	return possible_tords.random();
}

var get_boxes = function(div_id, span_class, is_checked) {
	var boxes = [];

	$("#" + div_id + " label").each(function() {
		if($(this).find("span." + span_class + " input").is(":checked") == is_checked) boxes.push(this.textContent);
	});

	return boxes;
}

// THAT GOOD RANDOM

var randomize = function() {
	var game = this[$("#game select").children(":selected").attr("value")];

	$("#title").find("h2").fadeTo(1000, 0, function() {
		var trigger = get_trigger(game);
		if(!trigger) return;
		var when = get_when(trigger, defaults["Triggers"]["during"].concat(game["Triggers"]["during"]));
		var who = get_who(trigger);
		var task = get_what(defaults, game);
		
		$("#when").text(when + " time");
		$("#who").text(who);
		var trigger_name = trigger.title;
		if(who === "you") trigger_name = pronounize(trigger_name);
		$("#what").text(split_line(trigger_name));

		$("#do").text(split_line(fill_archetype(task.title)));

		$("#title").find("h2").fadeTo(1000, 1);
	});
}

var get_trigger = function(game) {
	var trigger_pool = [defaults["Triggers"], game["Triggers"]];
	var exceptions = {"title": get_boxes("triggers", false), "modes": get_boxes("modes", false)};
	return get_random_tord(trigger_pool, exceptions);
}

var get_when = function(trigger, durings) {
	var when = "Every";
	if(durings.includes(trigger)) when = "During the";
	return when;
}

var get_who = function(trigger) {
	var who = "[you/your partner/anyone]"
	if(trigger.who) who = trigger.who.random();
	else who = split_line(who);
	return who;
}

var get_what = function(defaults, game) {
	var task_pool = [defaults["Tasks"], game["Tasks"]];
	var task = get_random_tord(task_pool, {});
	return task;
}

$(document).ready(function() {
	// General
	// populate_seriousnesses();
	fill_lists();
	select_defaults();

	// Visuals
	grey_unchecked();

	// Random task
	randomize();

	// Put focus
	$("#reroll").focus();
});
