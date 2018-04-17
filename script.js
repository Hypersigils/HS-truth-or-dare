//VARIABLES
var EROGENOUS_ZONES = ["Mouth","Nipples","Ass","Breasts","Clitoris","Vulva","Vagina","Dick"];
var TITLE_SPANS = ["when","who","does","what"];
var current_instruction = null;
var active_instructions = [];

//OBJECTS
class Instruction {
	constructor(default_pool, game_pool) {
		this.default_pool = default_pool;
		this.game_pool = game_pool;

		this.roll_does();
		this.roll_what();
	}

	roll_when() {
		var when = "when";
		var while_triggers = this.default_pool["Triggers"]["while"].concat(this.game_pool["Triggers"]["while"]);
		if(while_triggers.includes(this.trigger)) when = "while";
		this.when = when;
	}

	roll_who() {
		var who = "[you/your partner/anyone]"
		if(this.trigger.who) who = this.trigger.who.random();
		who = who.splitOptions();
		this.who = who;
	}

	roll_does() {
		var trigger_pool = [this.default_pool["Triggers"], this.game_pool["Triggers"]];
		var exceptions = {"title": getCheckedBoxes("triggers", "enabled", false), "modes": getCheckedBoxes("modes", "enabled", false), "restrictions": getCheckedBoxes("restrictions", "enabled", false), "settings": getCheckedBoxes("settings", "enabled", false)};
		this.trigger = getRandomTorD(trigger_pool, exceptions);

		this.roll_when();
		this.roll_who();

		var does = this.trigger.title;
		does = does.splitOptions();
		does = does.replaceArchetype();
		if(this.who = "you") does = does.pronounize();
		this.does = does;
	}

	roll_what() {
		var task_pool = [this.default_pool["Tasks"], this.game_pool["Tasks"]];
		var task = getRandomTorD(task_pool, {"when":[this.when]});
		this.task = task;

		var what = task.title;
		what = what.splitOptions();
		what = what.replaceArchetype();
		this.what = what;
	}

	updateHeader(span_id) {
		if(span_id) {
			var string = this[span_id];
			if(span_id == "when") string = string.charAt(0).toUpperCase() + string.slice(1);
			$("#" + span_id).fadeOut(1000, function() {
					$(this).text(string).fadeIn(1000);
				});
		} else {
			for(var id of TITLE_SPANS) {
				this.updateHeader(id);
			}
		}
	}
}

//PROTOYPES

Array.prototype.random = function() {

	return this[Math.floor(Math.random() * this.length)];
}

Array.prototype.includesAny = function(elem) {
	if(typeof elem == "object") {
		for(var item of elem) return this.includes(item);
	} else {
		return this.includes(elem);
	}
}

String.prototype.splitOptions = function() {
	var string = this.toString();

	while(string.includes("[")) {
		var match = string.match(/\[(.*?)\]/);
		if(!match) return;
		var options = match[1].split("/");
		string = string.replace(match[0], options.random());
	}

	return string;
}

String.prototype.replaceArchetype = function() {
	var string = this.toString();

	var archetypes = {"bodypart": getCheckedBoxes("parts", "enabled", true), "erogenous_zone": EROGENOUS_ZONES, "toy": getCheckedBoxes("toys", "enabled", true)};
	while(string.includes("$")) {
		var match = string.match(/\$(.*?)\$/);
		if(archetypes[match[1]]) {
			string = string.replace(match[0], archetypes[match[1]].random().toLowerCase());
		} else {
			return string;
		}
	}

	return string;
}

String.prototype.pronounize = function() {
	var string = this.toString();

	var exceptions = {"is":"are"};
	var words = string.split(" ");
	var first_word = words[0];

	for(var key in exceptions) {
		if(words[0] === key) {
			words[0] = exceptions[key];
			string = words.join(" ");
			return string;
		}
	}

	if(first_word[first_word.length - 1] === "s") string = string.replace(first_word, first_word.slice(0, -1));

	return string;
}

//SETUP SCRIPTS

var makeUL = function(items, secondary_checkbox) {	
	var ul = document.createElement("ul");
	items.forEach(function(item) {
		var li = document.createElement("li");
		var label = document.createElement("label");
		var text_span = document.createElement("span");
		var enabled_span = document.createElement("span");
		var enabled_input = document.createElement("input");

		if(secondary_checkbox) {
			var secondary_span = document.createElement("span");
			var secondary_input = document.createElement("input");

			secondary_span.className = secondary_checkbox;
			secondary_input.type = "checkbox";
			secondary_input.checked = true;
			secondary_span.append(secondary_input);
			li.append(secondary_span);
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

var selectDefaults = function() {
	$("#parts span.enabled input").prop("checked", false);
	$("#toys span.enabled input").prop("checked", false);

	var EVERYONE_HAS_THESE = ["Mouth","Cheeks","Nipples","Ass cheeks","Ass","Phone"];

	EVERYONE_HAS_THESE.forEach(function(part) {
		$("#parts li:contains('" + part + "') span.enabled input").prop("checked", true);
		$("#toys li:contains('" + part + "') span.enabled input").prop("checked", true);
	});
}

var fillLists = function() {
	var game = this[$("#game select").children(":selected").attr("value")];

	var trigger_list = {"divs":[$("[id='game-specific triggers']"), $("[id='universal triggers']")], "pools":[game["Triggers"], defaults["Triggers"]]};
	var task_list = {"divs":[$("[id='game-specific tasks']"), $("[id='universal tasks']")], "pools":[game["Tasks"], defaults["Tasks"]]};
	var available_list = {"divs":[$("#parts .hide"), $("#toys .hide")], "pools":[availables["Available parts"], availables["Available toys"]]};
	var modes_list = {"divs":[$("#modes .hide")], "pools":[getTypesOfAttribute(game["Triggers"], "modes")]};
	var roles_list = {"divs":[$("#roles .hide")], "pools":[getTypesOfAttribute(game["Triggers"], "roles")]};

	var lists = [trigger_list, task_list, available_list, modes_list, roles_list];

	// For each list we've got...
	lists.forEach(function(list) {
		// For each div we're filling with that list...
		for(var i=0; i<list.divs.length; i++) {
			var div = list.divs[i].get(0);
			// If it's just a list, go for it
			if(list.pools[i].length != null) {
				div.append(makeUL(list.pools[i]));
			} else {
				// if it's an object with categories, loop it instead.
				for(var category in list.pools[i]) {
					div.append(category);
					div.append(makeUL(list.pools[i][category]));
				}
			}
		}
	});
}

var greyUnchecked = function() {

	$("span.enabled :checkbox").change(function() {
		if(this.checked) {
			$(this).closest("li").find("span.title").animate({opacity: 1});
		} else {
			$(this).closest("li").find("span.title").animate({opacity: .5});
		}
	});

	$("li:has(span.enabled input:checkbox:not(:checked))").each(function() {
		$(this).find("span.title").css("opacity", .5);
	});
}

var addTitleListeners = function() {
	for(var span of TITLE_SPANS) {
		$("#" + span).click(function() {
			current_instruction["roll_" + $(this).attr('id')]();
			current_instruction.updateHeader($(this).attr('id'));
		});
	}
}

var addMinimizeListeners = function() {
	$(".minimize").click(function() {
		if($(this).text() == "+") {
			$(this).text("-");
		} else {
			$(this).text("+");
		}
		$(this).parent().find(".hide").toggle("slow");
	});
}

var setBackground = function(game) {
	var backgrounds = [];
	$.ajax({
	  url: "backgrounds/diablo_3",
	  success: function(data){
	     $(data).find("a:contains(.jpg)").each(function(){
	        // will loop through 
	        var images = $(this).attr("href");
	        console.log(images);
	     });
	  }
	});
}

//JSON OBJECT INTERPRETATION
var getTypesOfAttribute = function(pool, attribute) {
	var types = new Set();

	for(var category in pool) {
		pool[category].forEach(function(item) {
			if(item[attribute]) item[attribute].forEach(function(type) {
				types.add(type);
			});
		});
	}	

	return Array.from(types);
}

var getRandomTorD = function(pools, exceptions) {
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

//HTML INTERPRETATION
var getCheckedBoxes = function(div_id, span_class, is_checked) {
	var boxes = [];

	$("#" + div_id + " li").each(function() {
		if($(this).find("span." + span_class + " input").is(":checked") == is_checked) boxes.push(this.textContent);
	});

	return boxes;
}

// THAT GOOD RANDOM
var randomize = function() {
	var game = this[$("#game select").children(":selected").attr("value")];

	current_instruction = new Instruction(defaults, game);

	current_instruction.updateHeader();
}

$(document).ready(function() {
	// General
	fillLists();
	selectDefaults();

	// Listeners
	addTitleListeners();
	addMinimizeListeners();

	// Visuals
	greyUnchecked();

	// Random task
	randomize();

	// Put focus
	$("#reroll").focus();

	// Set background
	setBackground(this[$("#game select").children(":selected").attr("value")]);
});
