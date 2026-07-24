package content

type Lang string

const (
	LangEN Lang = "en"
	LangFA Lang = "fa"
)

func ParseLang(raw string) Lang {
	switch raw {
	case "fa", "fa-IR", "fa_IR", "persian", "farsi":
		return LangFA
	default:
		return LangEN
	}
}

type Pillar struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Subtitle    string `json:"subtitle"`
	Description string `json:"description"`
}

type SectionBlock struct {
	Title   string   `json:"title"`
	Lead    string   `json:"lead,omitempty"`
	Bullets []Bullet `json:"bullets,omitempty"`
	Body    string   `json:"body,omitempty"`
}

type Bullet struct {
	Label string `json:"label"`
	Text  string `json:"text"`
}

type Page struct {
	Slug     string         `json:"slug"`
	Title    string         `json:"title"`
	Headline string         `json:"headline"`
	Lead     string         `json:"lead"`
	Sections []SectionBlock `json:"sections"`
	Closing  string         `json:"closing,omitempty"`
	Tags     []string       `json:"tags,omitempty"`
	Handle   string         `json:"handle,omitempty"`
	Lang     string         `json:"lang"`
}

type NameMeaning struct {
	WordEN   string `json:"wordEn"`
	WordFA   string `json:"wordFa"`
	GlossEN  string `json:"glossEn"`
	GlossFA  string `json:"glossFa"`
	VisionEN string `json:"visionEn"`
	VisionFA string `json:"visionFa"`
	Body     string `json:"body"`
}

type SiteMeta struct {
	Brand         string      `json:"brand"`
	Tagline       string      `json:"tagline"`
	Handle        string      `json:"handle"`
	Founder       string      `json:"founder"`
	Tags          []string    `json:"tags"`
	Pillars       []Pillar    `json:"pillars"`
	Manifesto     string      `json:"manifesto"`
	WelcomeLead   string      `json:"welcomeLead"`
	WelcomeBody   string      `json:"welcomeBody"`
	Name          NameMeaning `json:"name"`
	HeroLead      string      `json:"heroLead"`
	EcosystemLead string      `json:"ecosystemLead"`
	EcosystemBody string      `json:"ecosystemBody"`
	ManifestoLead string      `json:"manifestoLead"`
	Lang          string      `json:"lang"`
}

func Meta(lang Lang) SiteMeta {
	if lang == LangFA {
		return metaFA()
	}
	return metaEN()
}

func Philosophy(lang Lang) Page {
	if lang == LangFA {
		return philosophyFA()
	}
	return philosophyEN()
}

func Methodology(lang Lang) Page {
	if lang == LangFA {
		return methodologyFA()
	}
	return methodologyEN()
}

func Whitepaper(lang Lang) Page {
	if lang == LangFA {
		return whitepaperFA()
	}
	return whitepaperEN()
}

func sharedName(body string) NameMeaning {
	return NameMeaning{
		WordEN:   "Atra",
		WordFA:   "آترا",
		GlossEN:  "spark · fire",
		GlossFA:  "جرقه · آتش",
		VisionEN: "A fiery future",
		VisionFA: "آینده‌ای آتشین",
		Body:     body,
	}
}
