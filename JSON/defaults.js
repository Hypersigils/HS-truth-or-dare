var defaults = {
	"Triggers": {
		"when": [
			{
				"title": "says [\"yes\"/\"no\"/\"what\"]"
			},
			{
				"title": "completes an objective"
			}
		],
		"during": [
			{
				"title": "is talking"
			},
			{
				"title": "is looking at you",
				"requirements": ["partner"],
				"who": ["your partner", "anyone"]
			}
		]
	},
	"Truths": [
		{
			"title": "talk about a kink you want to write",
			"lewd": true,
			"intimacy": 1
		},
		{
			"title": "say your [favorite/least favorite] thing about [your partner/yourself]",
			"lewd": false,
			"intimacy": 2
		},
		{
			"title": "name a naughty secret",
			"lewd": true,
			"intimacy": 1
		},
		{
			"title": "name something that makes you [happy/sad/angry/annoyed]",
			"lewd": false,
			"intimacy": 0
		},
		{
			"title": "name something you're thankful for about your partner",
			"lewd": false,
			"intimacy": 2
		},
		{
			"title": "name something [embarrassing/cute/exciting] about yourself",
			"lewd": true,
			"intimacy": 2
		},
		{
			"title": "describe a hobby you [have/want to have]",
			"lewd": false,
			"intimacy": 0
		}
	],
	"Dares": [
		{
			"title": "tease your $bodypart$ [lightly/strongly/harshly] [on bare skin/through your clothes]",
			"lewd": true,
			"intimacy": 1
		},
		{
			"title": "slap your $bodypart$",
			"lewd": true,
			"intimacy": 2
		},
		{
			"title": "spank yourself",
			"lewd": true,
			"intimacy": 2
		},
		{
			"title": "do a sexy dance",
			"lewd": true,
			"intimacy": 1
		},
		{
			"title": "tease your $bodypart$",
			"lewd": true,
			"intimacy": 1
		},
		{
			"title": "give your partner your best flirt",
			"lewd": false,
			"intimacy": 1,
			"requirements": ["partner"]
		},
		{
			"title": "flash your partner your $bodypart$",
			"lewd": true,
			"intimacy": 3,
			"requirements": ["partner"]
		},
		{
			"title": "blow your partner a kiss",
			"lewd": false,
			"intimacy": 1,
			"requirements": ["partner"]
		},
		{
			"title": "repeat what your partner says",
			"lewd": false,
			"intimacy": 0,
			"requirements": ["partner"]
		},
		{
			"title": "[thank/apologize to/praise] your partner",
			"lewd": false,
			"intimacy": 1,
			"requirements": ["partner"]
		}
	]
}