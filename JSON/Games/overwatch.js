var overwatch = {
	"Title": "Overwatch",
	"Backgrounds": [
		{
			"title": "ana",
			"number": 6
		},
		{
			"title": "brigitte",
			"number": 3
		},
		{
			"title": "dva",
			"number": 6
		},
		{
			"title": "group",
			"number": 3
		},
		{
			"title": "mei",
			"number": 6
		},
		{
			"title": "mercy",
			"number": 6
		},
		{
			"title": "moira",
			"number": 2
		},
		{
			"title": "pharah",
			"number": 6
		},
		{
			"title": "sombra",
			"number": 6
		},
		{
			"title": "symmetra",
			"number": 5
		},
		{
			"title": "tracer",
			"number": 6
		},
		{
			"title": "widowmaker",
			"number": 7
		},
		{
			"title": "zarya",
			"number": 3
		}
	],
	"Triggers": {
		"when": [
			{
				"title": "takes an objective"
			},
			{
				"title": "leaves the payload",
				"frequency": "Constant",
				"roles": ["Tank"],
				"modes": ["Payload"]
			},
			{
				"title": "gets an elimination",
				"frequency": "High"
			},
			{
				"title": "gets a kill"
			},
			{
				"title": "tops up an ally's health",
				"frequency": "Constant",
				"roles": ["Support"],
				"who": ["you"]
			},
			{
				"title": "shields an ally from lethal damage",
				"frequency": "Medium",
				"roles": ["Tank"],
				"who": ["you"]
			},
			{
				"title": "gets full ultimate charge"
			},
			{
				"title": "dies"
			},
			{
				"title": "receives voice chat or text [compliments/abuse]",
				"frequency": "Low"
			},
			{
				"title": "pin/disables an enemy",
				"roles": ["Tank"]
			},
			{
				"title": "gets Play of the Game",
				"frequency": "Rare"
			},
			{
				"title": "receives more than 1 vote after the game",
				"frequency": "Low"
			},
			{
				"title": "receives more than [2/4] votes after the game",
				"frequency": "Rare"
			},
			{
				"title": "swaps [characters/roles]",
				"frequency": "Low"
			},
			{
				"title": "is [on/not on] the team that gets the Play of the Game",
				"frequency": "Low"
			},
			{
				"title": "is ordered or asked to do something in chat",
				"frequency": "Low"
			},
			{
				"title": "gets a kill"
			},
			{
				"title": "ends a game without any deaths",
				"frequency": "Rare"
			},
			{
				"title": "ends a game with less than 4 deaths",
				"frequency": "Low"
			},
			{
				"title": "ends a game",
				"frequency": "Low"
			},
			{
				"title": "ends a game with 1 gold medal",
				"frequency": "Low"
			},
			{
				"title": "ends a game with more than 2 gold medals",
				"frequency": "Rare"
			},
			{
				"title": "ends a game with more than 2 silver medals",
				"frequency": "Low"
			},
			{
				"title": "takes [a/a small/a large] health pack",
				"frequency": "Medium"
			}
		],
		"while": [
			{
				"title": "is on the payload",
				"modes": ["Payload"],
				"frequency": "High"
			},
			{
				"title": "is on the objective",
				"modes": ["Objective"],
				"frequency": "High"
			},
			{
				"title": "is ulting"
			},
			{
				"title": "is in the character select screen",
				"frequency": "Low"
			},
			{
				"title": "is watching Play of the Game",
				"frequency": "Low"
			},
			{
				"title": "has a gold medal",
				"who": ["you"]
			},
			{
				"title": "has a silver medal",
				"frequency": "High",
				"who": ["you"]
			}
		]
	},
	"Tasks": {
		"truths": [
		],
		"dares": [
			{
				"title": "thank your team in voice chat",
				"intimacy": 1,
				"exposure": 1,
				"requirements": ["Voice"]
			},
			{
				"title": "thank your partner in voice chat",
				"intimacy": 1,
				"exposure": 1,
				"requirements": ["Voice", "Partner"]
			},
			{
				"title": "apologize to your team for something you did poorly during the game",
				"intimacy": 2,
				"exposure": 1,
				"requirements": ["Voice"]
			}
		]
	}
}