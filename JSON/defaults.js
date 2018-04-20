var defaults = {
	"Triggers": {
		"when": [
			{
				"title": "says [\"yes\"/\"no\"/\"what\"]",
				"requirements": ["Voice"]
			},
			{
				"title": "touch your partner's character model",
				"requirements": ["Partner"],
				"who": ["you"],
			}
		],
		"while": [
			{
				"title": "is talking",
				"frequency": "High"
			},
			{
				"title": "is looking at you",
				"requirements": ["Partner"],
				"who": ["your partner", "anyone"],
				"frequency": "High"
			}
		]
	},
	"Tasks": {
		"truths": [
			{
				"title": "talk about a kink you want to explore",
				"lewdness": 1,
				"intimacy": 2
			},
			{
				"title": "say your [favorite/least favorite] thing about [your partner/yourself]",
				"lewdness": 1,
				"intimacy": 2
			},
			{
				"title": "name a naughty secret",
				"lewdness": 1,
				"intimacy": 1
			},
			{
				"title": "name something that makes you [happy/sad/angry/annoyed]",
			},
			{
				"title": "name something you're thankful for about your partner",
				"intimacy": 3
			},
			{
				"title": "name something [embarrassing/cute/exciting] about yourself",
				"intimacy": 2
			},
			{
				"title": "describe a hobby you [have/want to have]",
				"intimacy": 1
			},
			{
				"title": "describe a taboo fantasy",
				"lewdness": 2,
				"intimacy": 2
			},
			{
				"title": "describe your worst relationship",
				"intimacy": 1
			},
			{
				"title": "confess a dirty secret",
				"lewdness": 2,
				"intimacy": 2
			},
			{
				"title": "describe a time you broke the law",
				"intimacy": 1
			},
			{
				"title": "describe a time you almost got caught doing something dirty",
				"lewdness": 2,
				"intimacy": 2
			},
			{
				"title": "describe a fantasy of yours",
				"lewdness": 1,
				"intimacy": 2
			}
		],
		"dares": [
			{
				"title": "tease your $erogenous_zone$ [lightly/strongly/harshly] [on bare skin/through your clothes]",
				"lewdness": 3
			},
			{
				"title": "slap your $bodypart$",
				"lewdness": 3,
				"requirements": ["Noise"]
			},
			{
				"title": "spank yourself",
				"lewdness": 3,
				"requirements": ["Noise"]
			},
			{
				"title": "do a sexy dance",
				"lewdness": 2,
				"intimacy": 3,
				"requirements": ["Visibility"]
			},
			{
				"title": "tease your $erogenous_zone$",
				"lewdness": 3
			},
			{
				"title": "give your partner your best flirt",
				"intimacy": 1,
				"requirements": ["Partner"]
			},
			{
				"title": "flash your partner your $bodypart$",
				"lewdness": 4,
				"intimacy": 3,
				"exposure": 4,
				"requirements": ["Partner", "Visibility"]
			},
			{
				"title": "blow your partner a kiss",
				"intimacy": 1,
				"requirements": ["Partner"]
			},
			{
				"title": "repeat what your partner says",
				"exposure": 1,
				"requirements": ["Partner", "Voice"]
			},
			{
				"title": "[thank/apologize to/praise] your partner",
				"intimacy": 1,
				"requirements": ["Partner"]
			},
			{
				"title": "[moan/moan your partner's name]",
				"lewdness": 2,
				"intimacy": 2,
				"exposure": 1,
				"requirements": ["Noise", "Voice"]
			},
			{
				"title": "rub against a pillow",
				"lewdness": 3,
				"intimacy": 2
			},
			{
				"title": "talk dirty",
				"lewdness": 4,
				"intimacy": 2,
				"exposure": 1,
				"requirements": ["Voice"]
			},
			{
				"title": "beg your partner about something of their choosing",
				"lewdness": 1,
				"intimacy": 2,
				"requirements": ["Partner"]
			},
			{
				"title": "invert your power roles",
				"intimacy": 4
			},
			{
				"title": "follow one command involving your $toy$",
				"lewdness": 4,
				"intimacy": 3
			},
			{
				"title": "pinch your $erogenous_zone$",
				"lewdness": 3,
				"intimacy": 2
			},
			{
				"title": "take off your $clothing$",
				"lewdness": 2,
				"intimacy": 1
			},
			{
				"title": "tug your underwear up",
				"lewdness": 2,
				"intimacy": 2,
				"parts": ["Vagina"],
				"clothing": ["Underwear"]
			},
			{
				"title": "share one of your favorite naughty videos",
				"lewdness": 2,
				"intimacy": 1
			},
			{
				"title": "bounce up and down",
				"lewdness": 1,
				"parts": ["Breasts"]
			},
			{
				"title": "play with yourself loudly",
				"lewdness": 4,
				"intimacy": 3,
				"exposure": 1,
				"requirements": ["Noise"]
			},
			{
				"title": "send a picture of the mess you're making",
				"lewdness": 4,
				"intimacy": 4,
				"exposure": 3,
				"when": ["every"],
				"requirements": ["Visibility"]
			},
			{
				"title": "send a picture with your $erogenous_zone$ barely hidden",
				"lewdness": 3,
				"intimacy": 3,
				"exposure": 3,
				"requirements": ["Visibility"]
			},
			{
				"title": "play with your $toy$ like you would your partner",
				"lewdness": 3,
				"intimacy": 2
			},
			{
				"title": "take orders on how to touch your $erogenous_zone$",
				"lewdness": 4,
				"intimacy": 3
			},
			{
				"title": "describe your favorite character in the game and why",
				"requirements": ["Game"]
			},
			{
				"title": "describe the hottest character in the game and why",
				"lewdness": 1,
				"intimacy": 1,
				"requirements": ["Game"]
			},
			{
				"title": "find dirty art of the character you're playing and give it to your partner",
				"lewdness": 1,
				"intimacy": 1,
				"requirements": ["Game", "Partner"]
			},
			{
				"title": "find dirty art of the character you're playing and make it your avatar",
				"lewdness": 2,
				"intimacy": 3,
				"requirements": ["Game"],
				"frequency": ["Low"]
			},
			{
				"title": "change your status to a sentence of your partner's choice",
				"requirements": ["Game"],
				"frequency": ["Rare"]
			}
		]
	}
}
