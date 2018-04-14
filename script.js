//PROTOYPES

Array.prototype.random = function() {

	return this[Math.floor(Math.random() * this.length)];
}

//JSON interaction
var get_all_triggers = function(objects, search_string) {
	var triggers = [];
	var keywords = ["when","during"]

	objects.forEach(function(object) {
		keywords.forEach(function(keyword) {
			if(!search_string || search_string === keyword) triggers = triggers.concat(object["Triggers"][keyword]);
		});
	});

	return triggers;
}

var get_all_tasks = function(objects, search_string) {
	var tasks = [];
	var keywords = ["Truths","Dares"]

	objects.forEach(function(object) {
		keywords.forEach(function(keyword) {
			if(!search_string || search_string === keyword) tasks = tasks.concat(object[keyword]);
		});
	});

	return tasks;
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

var make_available_category = function(title, items) {
	var ul = document.createElement("ul");
	items.forEach(function(item) {
		var li = document.createElement("li");
		var label = document.createElement("label");
		var span = document.createElement("span");
		var input = document.createElement("input");
		input.type = "checkbox";
		label.textContent = item;

		span.append(input);
		label.append(span);
		li.append(label);

		ul.append(li);
	});

	return ul;
}

var make_tord_category = function(title, items) {
	var li = document.createElement("li");
	li.textContent = title;
	li.className = "category";
	items.forEach(function(item) {
		var sub_li = document.createElement("li");
		var label = document.createElement("label");
		var span = document.createElement("span");
		var input = document.createElement("input");
		input.type = "checkbox";
		input.checked = true;
		label.textContent = item.title;

		span.append(input);
		label.append(span);
		sub_li.append(label);

		li.append(sub_li);
	});

	return li;
}

var select_defaults = function() {
	var everyone_has_these = ["Mouth","Cheeks","Nipples","Ass cheeks","Ass","Phone"];
	everyone_has_these.forEach(function(part) {
		$("li:contains('" + part + "')").find("input").prop("checked", true);
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

var set_modes = function() {
	var game = this[$("#game select").children(":selected").attr("value")];
	var triggers = get_all_triggers([game]);
	var modes = new Set();

	triggers.forEach(function(trigger) {
		if(trigger.modes) trigger.modes.forEach(function(mode) {
			modes.add(mode);
		});
	});

	modes.forEach(function(mode) {
		var row = document.createElement("li");
		var label = document.createElement("label");
		label.textContent = mode;
		var span = document.createElement("span");
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = true;
		span.append(checkbox);
		label.append(span);
		row.append(label);

		$("#modes").append(row);
	});
}

var fill_triggers = function() {
	var game = this[$("#game select").children(":selected").attr("value")];
	var game_triggers = [get_all_triggers([game], "when"), get_all_triggers([game], "during")];
	var default_triggers = [get_all_triggers([defaults], "when"), get_all_triggers([defaults], "during")];

	$("#triggers #game-specific").append(make_tord_category("Every time:", game_triggers[0]));
	$("#triggers #game-specific").append(make_tord_category("During the time:", game_triggers[1]));

	$("#triggers #universal").append(make_tord_category("Every time:", default_triggers[0]));
	$("#triggers #universal").append(make_tord_category("During the time:", default_triggers[1]));
}

var fill_availables = function() {
	console.log("hi");

	var sections = ["parts", "toys"];
	sections.forEach(function(section) {
		var div = $("#" + section);
		console.log(div);
		for(var category in availables["Available " + section]) {
			div.append(category);
			var ul = document.createElement("ul");
			ul.append(make_available_category(category, availables["Available " + section][category]));
			div.append(ul);
		}
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

	var archetypes = {"bodypart": get_available("parts"), "toys": get_available("toys")};

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

var get_available = function(div_id) {
	available = [];

	$("#Available" + "\\ " + div_id).find("label").get().forEach(function(lab) {
		if($(lab).find("input").is(":checked")) available.push($(lab).text());
	});

	return available;
}

var get_random_tord = function(pool, exceptions) {
	var tords = [];

	// for each tord object...
	pool.forEach(function(tord) {
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
		tords.push(tord);
	});

	return tords.random();
}

var get_boxes = function(div_id, is_checked) {
	var boxes = [];

	$("#" + div_id + " label").each(function() {
		if($(this).find("input").is(":checked") == is_checked) boxes.push(this.textContent);
	});

	return boxes;
}

// THAT GOOD RANDOM

var randomize = function() {
	var game = this[$("#game select").children(":selected").attr("value")];

	$("#title").find("h2").fadeTo(1000, 0, function() {
		var trigger = get_trigger(game);
		if(!trigger) return;
		var when = get_when(trigger, get_all_triggers([defaults, game], "during"));
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
	var trigger_pool = get_all_triggers([defaults, game]);
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
	var task_pool = get_all_tasks([defaults, game]);
	var task = get_random_tord(task_pool, {});
	return task;
}

$(document).ready(function() {
	// General
	// populate_seriousnesses();
	fill_availables();
	select_defaults();

	// Game-specific
	set_modes();
	fill_triggers();

	// Random task
	randomize();

});