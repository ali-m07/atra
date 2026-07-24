package content

func metaEN() SiteMeta {
	return SiteMeta{
		Lang:    string(LangEN),
		Brand:   "Atra",
		Tagline: "Structure creates behavior.",
		Handle:  "@atra_futures",
		Founder: "",
		Tags:    nil,
		Name: sharedName("In interpretive usage, Atra has been linked with spark and fire. That is background etymology for the institute name, not a headline claim. Atra is a cognitive laboratory for system dynamics and strategic foresight."),
		HeroLead:      "Atra is a cognitive laboratory for system dynamics and strategic foresight. Absolute randomness barely exists in complex systems; what we call accident is usually an admission of ignorance about structure. Structural literacy is built here.",
		WelcomeLead:   "Why Atra exists",
		WelcomeBody:   "Governments, cities, and organizations fail less from scarce data than from structural illiteracy. Atra investigates feedback, delays, and mental models that lock systems into failure. The work is independent, methodical, and built for people who decide under pressure, not for decorative strategy theater.",
		EcosystemLead: "Think tank, school, laboratory",
		EcosystemBody: "Three arms, one project. The think tank publishes independent structural research. The school teaches system dynamics and foresight methods to children and adults. The laboratory builds frameworks and redesign with organizations that need the analysis to leave the page. Work with Atra means structural diagnostics and clear redesign paths.",
		ManifestoLead: "We do not optimize broken systems.",
		Manifesto:     "Complexity is not random; it is unmodeled. Atra exists to replace linear comfort with structural foresight. Either we redesign systems from the root, or we continue to be crushed by their predictable collapse.",
		Pillars: []Pillar{
			{
				ID:          "think-tank",
				Title:       "Think Tank",
				Subtitle:    "Independent research",
				Description: "Objective diagnostics of urban paradoxes, governance failure, economic feedback, and policy blind spots. Research decision-makers can use when the stakes are real.",
			},
			{
				ID:          "school",
				Title:       "School",
				Subtitle:    "Children and adults",
				Description: "Training in system dynamics, mental models, and foresight methods for kids and adults. Serious literacy without cartoon packaging or academic fog.",
			},
			{
				ID:          "laboratory",
				Title:       "Laboratory",
				Subtitle:    "Frameworks and redesign",
				Description: "Turning foresight into scenarios, frameworks, and structural redesign for organizations that refuse to stay trapped in their own feedback.",
			},
		},
	}
}

func philosophyEN() Page {
	return Page{
		Lang:     string(LangEN),
		Slug:     "philosophy",
		Title:    "Identity",
		Headline: "A cognitive laboratory for systemic power",
		Lead:     "Atra sits where system dynamics, strategic foresight, and structural redesign meet. Not a marketing lab. Not an academic silo. A cognitive laboratory to decode the future through Think Tank, School, and Laboratory.",
		Handle:   "@atra_futures",
		Tags:     nil,
		Sections: []SectionBlock{
			{
				Title: "Name",
				Lead:  "The word Atra has long been associated with spark and fire in interpretive usage.",
				Body:  "We treat that association as background meaning, not as marketing slogan. The institute's public work is research, education, and laboratory practice for complex systems.",
			},
			{
				Title: "Institutional Model",
				Body:  "Think Tank: independent structural research. School: futures and system-dynamics literacy for children and adults. Laboratory: frameworks and redesign that leave the page. One intellectual project, the same analysis that cuts urban, economic, and governance cases.",
			},
			{
				Title: "The Logic of Systems",
				Lead:  "Absolute randomness does not exist in complex systems. What looks like luck or sudden crisis is usually the output of poorly modeled feedback.",
				Bullets: []Bullet{
					{Label: "Structural diagnostics", Text: "Map reinforcing and balancing loops, delays, and constraint shifts before they become crises."},
					{Label: "Mental model audit", Text: "Interrogate the assumptions of policymakers, planners, and executives that lock systems into failure."},
					{Label: "Boundary honesty", Text: "If an output keeps surprising the model, expand the model. Do not rename the surprise as accident."},
				},
			},
			{
				Title: "Mandate",
				Body:  "Organizations and societies fail less from scarce resources than from structural illiteracy. Atra strips short-term noise and exposes the architecture of reality. Redesign from the root, or accept predictable collapse.",
			},
		},
		Closing: "Independent foresight. Systemic redesign.",
	}
}

func methodologyEN() Page {
	return Page{
		Lang:     string(LangEN),
		Slug:     "methodology",
		Title:    "Research Framework",
		Headline: "How Atra analyzes complex systems",
		Lead:     "Our method rejects linear description. We decode the structural architecture of socio-technical systems so decisions can be made with eyes open.",
		Handle:   "@atra_futures",
		Tags:     nil,
		Sections: []SectionBlock{
			{
				Title: "System Dynamics & Feedback Mapping",
				Lead:  "Urban gridlock, economic stagnation, and infrastructure collapse are driven by feedback, not isolated incidents.",
				Bullets: []Bullet{
					{Label: "Reinforcing loops (R)", Text: "Vicious cycles where symptom management accelerates collapse."},
					{Label: "Balancing loops (B)", Text: "Constraints that try to stabilize behavior, and where delayed regulation fails."},
					{Label: "Delay analysis", Text: "Temporal gaps that create false signals for decision-makers."},
				},
			},
			{
				Title: "Paradigm & Mental Model Diagnostics",
				Lead:  "Systems run on the mental models of their designers. We interrogate those assumptions.",
				Bullets: []Bullet{
					{Label: "Illusion of randomness", Text: "Remove labels like unprecedented or accidental; reveal structural outputs."},
					{Label: "Goal reversal", Text: "Expose short-term optimizations that destroy long-term viability."},
					{Label: "Constraint shifting", Text: "Show how linear fixes move bottlenecks instead of resolving them."},
				},
			},
			{
				Title: "Strategic Foresight & Scenarios",
				Lead:  "Foresight at Atra maps the structural boundaries of possibility. It does not sell a single prediction.",
				Bullets: []Bullet{
					{Label: "Induced demand", Text: "Track how behavior nullifies technical interventions."},
					{Label: "Interdependency cascades", Text: "Evaluate how disruption in one domain spreads non-linearly into others."},
				},
			},
		},
	}
}

func whitepaperEN() Page {
	return Page{
		Lang:     string(LangEN),
		Slug:     "whitepaper",
		Title:    "Whitepaper",
		Headline: "The Architecture of Reality",
		Lead:     "Modern governance and strategy fail less from missing data than from a systemic literacy crisis. This whitepaper outlines Atra's analytical architecture.",
		Handle:   "@atra_futures",
		Tags:     nil,
		Sections: []SectionBlock{
			{
				Title: "The Fallacy of Linear Modeling",
				Body:  "Traditional frameworks treat complex systems as linear machines. When models collapse, leaders blame randomness or error. Atra rejects that illusion. Rooted in system dynamics, foresight, and structural diagnostics, we show that so-called accidents are often deterministic outputs of unmodeled loops and delays.",
			},
			{
				Title: "From Symptoms to Structure",
				Lead:  "Institutions patch symptoms. We investigate network architecture.",
				Bullets: []Bullet{
					{Label: "Linear fallacy", Text: "Assuming proportional outcomes from isolated interventions."},
					{Label: "Deterministic reality", Text: "Interventions without structural modeling trigger compensatory feedback that can worsen the pathology."},
				},
			},
			{
				Title: "Methodological Instruments",
				Lead:  "Three instruments strip noise and expose causality.",
				Bullets: []Bullet{
					{Label: "Feedback topology", Text: "Map reinforcing and balancing structures to anticipate tipping points."},
					{Label: "Paradigm diagnostics", Text: "Audit governing assumptions of system designers."},
					{Label: "Demand and delay modeling", Text: "Quantify adaptation and lag that neutralize superficial fixes."},
				},
			},
			{
				Title: "Mandate for Structural Redesign",
				Body:  "Atra does not optimize broken systems into slower failure. We provide the cognitive tools to redesign them, or to accept their predictable collapse with eyes open.",
			},
		},
	}
}
