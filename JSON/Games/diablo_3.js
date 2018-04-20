var diablo_3 = {
	"Title": "Diablo 3",
	"Backgrounds": [
		{
			"title": "barbarian",
			"number": 1
		},
		{
			"title": "crusader",
			"number": 2
		},
		{
			"title": "demon hunter",
			"number": 5
		},
		{
			"title": "diablo",
			"number": 1
		},
		{
			"title": "leah",
			"number": 1
		},
		{
			"title": "monk",
			"number": 2
		},
		{
			"title": "necromancer",
			"number": 3
		},
		{
			"title": "witch doctor",
			"number": 1
		},
		{
			"title": "wizard",
			"number": 3
		} 
	],
	"Triggers": {
		"when": [
			{
				"title": "kills [an/a blue/a gold] elite pack",
				"frequency": "High"
			},
			{
				"title": "kills a Keywarden",
				"modes": ["Bounties"],
				"frequency": "Low"
			},
			{
				"title": "completes a bounty",
				"modes": ["Bounties"],
				"frequency": "High"
			},
			{
				"title": "completes a rift",
				"modes": ["Rifting"]
			},
			{
				"title": "dies"
			},
			{
				"title": "resurrects another",
				"frequency": "Low"
			},
			{
				"title": "uses a potion",
				"frequency": "High"
			},
			{
				"title": "picks up a [nephalem glory/health] orb",
				"frequency": "Constant"
			},
			{
				"title": "finds a [legendary/set piece]"
			},
			{
				"title": "finds an ancient [legendary/set piece]",
				"frequency": "Low"
			},
			{
				"title": "clears a floor",
				"frequency": "High",
				"modes": ["Rifting"]
			},
			{
				"title": "activates a pylon",
				"frequency": "High"
			},
			{
				"title": "levels up",
				"frequency": "High"
			},
			{
				"title": "finds a white item",
				"frequency": "High"
			}
		],
		"while": [
			{
				"title": "is in avatar mode (e.g. Archon)",
				"frequency": "High"
			},
			{
				"title": "is in a rift",
				"modes": ["Rifting"]
			},
			{
				"title": "are listening to a journal",
				"modes": ["Story"],
				"who": ["you"]
			},
			{
				"title": "are listening to an NPC",
				"who": ["you"]
			},
			{
				"title": "is under the effect of a pylon",
				"frequency": "High"
			},
			{
				"title": "is an [even/odd] level",
				"frequency": "High"
			}
		]
	},
	"Tasks": {	
		"truths": [
		],
		"dares": [
		]
	}
}
