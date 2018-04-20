// VARIABLES
var EROGENOUS_ZONES = ["Mouth","Nipples","Ass","Breasts","Clitoris","Vulva","Vagina","Dick"];
var TITLE_SPANS = ["when","who","does","what"];
var current_instruction = null;
var active_instructions = [];

// OBJECTS
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
		var exceptions = getExceptions("trigger");
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
		var exceptions = getExceptions("task");
		exceptions.when = [this.when];
		var task = getRandomTorD(task_pool, exceptions);
		this.task = task;

		var what = task.title;
		what = what.splitOptions();
		what = what.replaceArchetype();
		this.what = what;
	}

	updateHeader(span_id) {
		if(span_id) {
			var string = this[span_id];
			if(span_id == "when") string = string.capitalizeFirst();
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

// PROTOYPES
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

	var archetypes = {"bodypart": getCheckedBoxes($("#parts li :checkbox"), true), "erogenous_zone": EROGENOUS_ZONES, "toy": getCheckedBoxes($("#toys li :checkbox"), true), "clothing": getCheckedBoxes($("#clothing li :checkbox"), true)};
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

	var exceptions = {"is":"are", "their":"your", "has":"have"};
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

String.prototype.capitalizeFirst = function() {
	var string = this.toString();

	string = string.charAt(0).toUpperCase() + string.slice(1);

	return string;
}

// SETUP SCRIPTS
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

var makeScale = function(parent, category) {
	var div = document.createElement("div");
	div.id = category;
	div.style.marginBottom = "10px";

	div.append(category.capitalizeFirst());
	div.append(document.createElement("br"));

	var em = document.createElement("em");
	em.textContent = parent[category].description;
	div.append(em)

	var subdiv = document.createElement("div");
	subdiv.className = "rating";
	for(var level in parent[category].levels) {
		var input = document.createElement("input");
		input.type = "checkbox";
		input.value = level;
		subdiv.append(input);
	}

	div.append(subdiv);
	return div;
}

var selectDefaults = function() {
	$("#parts span.enabled input").prop("checked", false);
	$("#toys span.enabled input").prop("checked", false);
	$("#restrictions span.enabled input").prop("checked", false);
	$("#clothing span.enabled input").prop("checked", false);

	var EVERYONE_HAS_THESE = ["Mouth","Cheeks","Nipples","Ass cheeks","Ass","Phone"];
	var JUST_ENOUGH_SETTINGS = {"lewdness": [0, 1, 2], "intimacy": [0, 1], "exposure": [0, 1], "frequency": ["Low", "Medium", "High"]}

	for(var setting in JUST_ENOUGH_SETTINGS) {
		JUST_ENOUGH_SETTINGS[setting].forEach(function(rating) {
			$("#" + setting + " input[value='" + rating + "']").prop("checked", true);
		});
	}

	EVERYONE_HAS_THESE.forEach(function(part) {
		$("#parts li:contains('" + part + "') span.enabled input").prop("checked", true);
		$("#toys li:contains('" + part + "') span.enabled input").prop("checked", true);
	});

	var EVERYONE_WEARS_THESE = ["Shirt", "Pants", "Underwear", "Socks"]
	EVERYONE_WEARS_THESE.forEach(function(clothes) {
		$("#clothing li:contains('" + clothes + "') span.enabled input").prop("checked", true);
	});
}

var fillGames = function(games) {
	games.forEach(function(game) {
		var option = document.createElement("option");
		option.value = game.replace(" ", "_").toLowerCase();
		option.textContent = game;
		$("#game select").append(option);
	});
}

var fillLists = function(game) {
	var trigger_list = {"divs":[$("[id='game-specific triggers']"), $("[id='universal triggers']")], "pools": [game["Triggers"], defaults["Triggers"]]};
	var task_list = {"divs":[$("[id='game-specific tasks']"), $("[id='universal tasks']")], "pools": [game["Tasks"], defaults["Tasks"]]};
	var available_list = {"divs":[$("#parts .hide"), $("#toys .hide")], "pools": [availables["Available parts"], availables["Available toys"]]};
	var modes_list = {"divs":[$("#modes .hide")], "pools": [getTypesOfAttribute(game["Triggers"], "modes")]};
	var roles_list = {"divs":[$("#roles .hide")], "pools": [getTypesOfAttribute(game["Triggers"], "roles")]};
	var requirements_list = {"divs":[$("#restrictions .hide")], "pools": [{"No:": ["Partner", "Noise", "Visibility", "Voice"]}]};
	var clothing_list = {"divs":[$("#clothing .hide")], "pools": [availables["Clothing"]]};
	var background_list = {"divs": [$("#backgrounds .hide")], "pools": [game["Backgrounds"]]};

	var lists = [trigger_list, task_list, available_list, modes_list, roles_list, requirements_list, clothing_list, background_list];

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

var fillSettings = function() {
	var div = $("#settings .hide");

	for(var setting in settings) {
		div.append(makeScale(settings, setting))
	}
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

var addRerollListener = function() {
	context = this;
	$("#reroll").click(function() {
		randomize(context[$("#game select").val()]);
	});
}

var setBackground = function(game) {
	var backgrounds = game["Backgrounds"];
	var images = []
	for(var character of backgrounds) {
		for(var i=1; i<character.number + 1; i++) {
			images.push(character.title + i + ".jpg");
		}
	}

	$("body").animate("slow").css("background-image", "url(backgrounds/" + game.Title.replace(" ", "_").toLowerCase() + "/" + images.random() + ")");
}

// JSON OBJECT INTERPRETATION
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
		// console.log(tord);
		// compare it with every type of exception...
		for(var key in exceptions) {
			// console.log(key);
			// if the object doesn't have that exception listed, try to add the default.
			var needs = tord[key];
			if(needs == null && key in settings) needs = [settings[key].default]
			if(needs != null) {
				// if this is not a list, make it one. Thanks .js.
				if(typeof needs != "object") var needs = [needs];
				// if it has a need for one included in the exceptions, break!
				if(exceptions[key].some(function(exception) {
					return needs.includes(exception);
				})) {
					// console.log("we found this one. Bye bye tord!");
					return;
				}
			}
		}

		// otherwise, push it!
		possible_tords.push(tord);
	});

	return possible_tords.random();
}

// HTML INTERPRETATION
var getExceptions = function(tord) {
	var exceptions = {};

	if(tord === "trigger") {
		exceptions.title = getCheckedBoxes($("#triggers li :checkbox"), false);
		exceptions.modes = getCheckedBoxes($("#modes li :checkbox"), false);
		exceptions.requirements = getCheckedBoxes($("#requirements :checkbox"), true);
		exceptions.frequency = $.map($("#frequency :checkbox:not(:checked)"), function(box) {
			return $(box).val();
		});
	} else if(tord === "task") {
		exceptions.title = getCheckedBoxes($("#tasks li :checkbox"), false);
		exceptions.parts = getCheckedBoxes($("#parts li :checkbox"), false);
		exceptions.toys = getCheckedBoxes($("#toys li :checkbox"), false);
		exceptions.requirements = getCheckedBoxes($("#requirements :checkbox"), true);
		exceptions.intimacy = $.map($("#intimacy :checkbox:not(:checked)"), function(box) {
			return parseInt($(box).val());
		});
		exceptions.lewdness = $.map($("#lewdness :checkbox:not(:checked)"), function(box) {
			return parseInt($(box).val());
		});
	}

	return exceptions;
}

var getCheckedBoxes = function(inputs, is_checked) {
	var titles = [];

	$(inputs).each(function() {
		if(this.checked == is_checked) {
			titles.push($(this).closest("li").find("span.title").text());
		}
	});

	return titles;
}

// THAT GOOD RANDOM
var randomize = function(game) {
	current_instruction = new Instruction(defaults, game);

	current_instruction.updateHeader();
}

// SETUP FUNCTIONS
var setup = function(game_title) {
	// General
	active_game = this[game_title];
	fillLists(active_game);

	// Random task
	randomize(active_game);

	// Set background
	setBackground(active_game);

	// Put focus
	$("#reroll").focus();
}

$(document).ready(function() {
	fillGames(["any", "Diablo 3", "Overwatch"]);
	addRerollListener();

	// Listeners
	addTitleListeners();
	addMinimizeListeners();

	// Defaults
	fillSettings();
	selectDefaults();

	// Visuals
	greyUnchecked();

	setup($("#game select").val());
});
