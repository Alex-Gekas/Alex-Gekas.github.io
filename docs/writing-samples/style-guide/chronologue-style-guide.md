!!! info "Project Status"
    This style guide defines the voice, tone, terminology, and formatting standards used in documentation for Chronologue Relay VR (a fictional virtual reality product). It was created as part of ongoing documentation work with [The Good Docs Project](https://www.thegooddocsproject.dev/){target=_blank}.

    It is currently under review for integration into the Chronologue Relay VR documentation workflow.  
    For discussion, revision history, and editorial notes, see the related GitLab issue:  
    [Chronologue Relay VR Style Guide — Editorial Review](https://gitlab.com/tgdp/chronologue/chronologue-project/-/issues/21)

    **Thought Process**  
    This style guide blends guidance from the Google Developer Documentation Style Guide with the needs of Chronologue Relay VR’s mixed audience of developers, educators, and general users. Because the product spans astronomy, VR interaction, and software, these rules emphasize clarity, consistency, and predictable terminology. Where Google’s guidance did not fully address VR or scientific concepts, new rules were introduced to reduce ambiguity and support both technical precision and accessible explanations.


### **Introduction**

The Chronologue Relay VR Style Guide is a reference for writing clear, consistent documentation for Zaius Inc.’s Chronologue Relay VR product. Use it when creating tutorials, support content, conceptual explanations, and developer documentation.

Chronologue Relay VR connects consumer headsets to the Chronologue API, allowing users to explore simulated astronomical events across historical and future timelines. Our documentation serves a broad audience: hobbyists, educators, museum professionals, and developers building advanced experiences with the Chronologue API.

Because Chronologue Relay spans VR, astronomy, and software, the docs must be clear and consistent. This is where we define the terminology, tone, formatting, and audience standards we follow.

### **Intended Audience and Scope**

This guide is for everyone who contributes to Chronologue Relay VR documentation–product managers, engineers, technical writers, and community contributors. When we understand who we’re writing for, it’s easier to keep our voice consistent and adjust the tone to fit the audience. The main audiences for Chronologue Relay VR documentation are:

- **General Audiences** — people exploring Chronologue Relay through the Home-VR experience: hobbyists, educators, and museum professionals.

- **Technical Audiences** — developers and engineers who use the Chronologue API and related tools. Technical audiences come in with a solid base of knowledge and expect documentation that’s clear, detailed, and to the point.

- **Universal Readers** — the overlap between both groups who use concept documentation to connect the creative and technical sides of Chronologue Relay VR.

These guidelines apply to all **on-stage documentation**–public-facing materials such as manuals, tutorials, and troubleshooting articles. Future versions may extend to marketing or community-authored content. Internal material like UI text, developer notes, and source-code comments are considered **off-stage** and are outside the scope of this guide.

### **Our preferred style guide**

For all Chronologue Relay VR documentation, we follow the [**<u>Google Developer Documentation Style Guide</u>**](https://developers.google.com/style) as our default reference. It helps us build developer-focused content that’s clear, precise, and easy to understand.

Chronologue Relay VR also serves educators, museum visitors, and the public. To keep our writing accessible and engaging for these audiences, we adapt or expand upon Google’s rules–especially when describing complex concepts or unique product features.

The **Chronologue Relay VR Style Rules** section outlines how we differ from Google’s style and defines our voice and preferred terms. They maintain consistency and give writers a clear process for handling exceptions and resolving style questions.

### **Chronologue Relay VR Style Rules**

**Rule 1: Voice and Tone**

**Google’s rule:**  
Google recommends using *you* and the imperative mood to keep instructions clear and direct. to help readers take action.

**Chronologue Relay VR’s rule:**  
We start from Google’s approach but adjust tone and phrasing to match our audiences.

- For **general audiences**, guide readers as if you’re exploring with them. Use verbs that encourage participation and discovery–*explore, observe, simulate*–instead of strict procedural commands like *click, execute,* or *run*.

- For **technical audiences**, maintain the neutral, command-based style.

| **Context** | **Don’t Use** | **Use** |
|----|----|----|
| **Developers** | *Let’s explore how this API brings the simulation to life*. | *Run the request below to retrieve simulation data from the API.* |
| **General Audiences** | *Click the Run Simulation button to start the process.* | *Explore the simulation by selecting **Run Simulation** and observing how the scene evolves.* |

**Rule 2: Entity Names**

**Google’s rule**

Google recommends using official product and feature names as published. Writers should:

- use the full name on first mention

- capitalize names according to the product team’s standard

- avoid nicknames, unofficial abbreviations, or invented short forms such as *the Relay* or *the Chronologue*)

Google also allows adjusting capitalization in headings or in sentences when it improves readability.

**Chronologue’s rule:**

Chronologue follows Google’s rule but adds one requirement for entities that are part of the Chronologue Canon, such as **KronoPy**, **Chronologue Relay**, and **OCTAVIA**.

**Keep the exact capitalization of each Chronlogue Canon entity in all contexts**  
**Do not adjust capitalization in headings, tables, diagrams, or example–even if the surrounding sentence structure would normally justify a change.**

**Examples**

- KronoPy Features (not **Kronopy features**)

- **Chronologue Relay configuration**  
  (not **Relay configuration**)

- **Zaius Inc.**  
  (not **Zaius** or **Zaius inc.**)

This custom rule overrides Google’s flexibility with capitalization. Chronologue Relay VR follows the rest of Google’s guidance unless specified otherwise.

The following table lists the main entities in the Chronologue Canon and how to refer to them in documentation.

| **Entity** | **Description / Role** | **Usage Example** |
|----|----|----|
| **OCTAVIA** | A multinational, government-sponsored organization that developed, built, and launched the **Chronologue Telescope**. OCTAVIA maintains the telescope and controls access to it but makes all collected data public through the **Chronologue API**. | *OCTAVIA* operates the Chronologue Telescope and provides open access to its data through the Chronologue API. |
| **KronoPy** | An open-source community of Python developers–mostly scientists, professors, and researchers–who build libraries to extract, process, and analyze data from the **Chronologue API**. | The *KronoPy* library simplifies data retrieval from the Chronologue API for academic research. |
| **Zaius Inc.** | A commercial company that builds consumer products using the **Chronologue API**. Its flagship product, the **Chronologue Relay VR**, connects the API to home VR headsets so users can explore astronomical events across time. | *Zaius Inc.* developed the Chronologue Relay VR, which lets users experience historic sky events from their living rooms. |

### **Rule 3: Terminology and Glossary**

**Google’s Rule:** Use consistent, precise terminology and clear definitions for unfamiliar terms.

**Chronologue Relay VR’s rule**:  
Chronologue expands on this with its own vocabulary of VR and astronomical concepts. Use approved terms exactly as they appear in the preferred terms list and glossary. When introducing specialized vocabulary, reference or link the glossary definition on first use. Avoid using synonyms that could alter the meaning or cause confusion.

### **Rule 4: Formatting Astronomical Data**

**Google’s rule:** 
 Google’s style guide covers code formatting but doesn’t specify how to present scientific data.

**Chronologue Relay VR’s rule:**  
Write dates, times, and coordinates in a clear, consistent format. Use internationally recognized standards when precision matters, and include a simple, plain-language version for general readers.

**(Example: 2024-07-18 T23:45 Z (11:45 p.m. UTC on July 18, 2024))**

### **Rule 5: System Feedback and Error Messages**

**Google’s rule:**

Google recommends keeping error messages concise, polite, and focused on solutions rather than blame.

**Chronologue Relay VR’s Rule:**

Phrase system feedback to explain what’s happening under the hood or what’s needed next–not what the user did wrong. Avoid fault-finding language. Focus on the action the user *should* take.

| **Don’t Use** | **Use** |
|----|----|
| “Error: event not found.” | “The simulation can’t display this event yet.” |
| “You’ve entered the invalid coordinates” | “Coordinates must follow a specific format. Check the format and try again.” |

### **Rule 6: Audience Specification**

**Google’s rule:**

Google emphasizes writing with the reader in mind and adjusting tone and content to match audience needs.

**Chronologue Relay VR’s Rule:**  
We go a step further by clearly defining the audience for every piece of documentation. Before you start writing, decide whether you’re speaking to a **technical audience** or a **general audience**. Your tone, examples, and level of detail should reflect that choice.

**Example:** 
A tutorial written for museum educators should use plain language, visual descriptions, and a sense of discovery. An API guide written for developers should stay concise, precise, and procedural.

## **Glossary of Preferred Terms**

Use these terms consistently in Chronologue Relay VR documentation. The definitions clarify how we use these terms across all types of documentation. Use the following list of terms to keep language clear and consistent.

**Chronologue Relay VR** The full product name. Use on first mention per page. Afterward, shorten to **Chronologue Relay**

**Relay**.  
**Avoid:** the Relay, the system

**connect** Start a session or pair a device in general-audience docs.  
*Avoid:* authenticate (unless referring to credential checks)

**device  
** Any supported hardware (e.g., VR headset, input controllers).  
*Avoid:* hardware, unit, machine

**event  
** A specific occurrence in the simulation (e.g., a solar eclipse at a given time).  
*Avoid:* phenomenon, trigger, action

**field of view (FoV)  
** The visible area in the headset.  
*Avoid:* field of vision

**headset  
** Standard VR hardware term.  
*Avoid:* goggles, viewer, helmet

**inspect  
** Examine or view details of an object to learn more.  
*Avoid:* witness (too passive), look at (too informal)

**interface  
** Any screen layout, menu, or control surface.  
*Avoid:* dashboard, console (UI-specific terms unless technically correct)

**launch  
** Start an application or experience.  
*Avoid:* boot up, fire up

**navigate  
** Move through the VR environment or menus.  
*Avoid:* walk, move through, teleport (unless referring to a specific mechanic)

**select  
** Choose an item or activate an interface element.  
*Avoid:* click, tap, press (device-specific language)

**timeline  
** A visual representation of events over time.  
*Avoid:* time axis, chronostream (sci-fi jargon)

**Notes:**

- These terms support Rule 3.0 (Terminology and Glossary Use)

- As terminology grows, new entries will be added here

- Vale rules will flag avoided terms and suggest replacements

#### **Essential VR Terms**

In addition to Chronologue Relay-specific terminology, writers can reference the **[<u>Oculus VR Glossary</u>](https://creator.oculus.com/getting-started/immersive-media-glossary/)** for a list of industry-standard terms.

Use them when explaining features, describing environments, or defining user actions to keep terminology consistent with the broader VR community.

**Topic types and templates**

Different users come to documentation with different goals. To help them find what they need quickly, for Chronologue Relay VR, we organize content using the [**<u>Diátaxis</u>**](https://diataxis.fr/) documentation framework: *tutorials*, *how-to guides*, *reference*, and *concepts*. This structure keeps information goal-oriented and prevents mixing instruction with explanation.

We use templates from [**<u>The Good Docs Project</u>**](https://www.thegooddocsproject.dev/template). They provide consistent structure and allow writers to focus on writing clear documentation without worrying about formatting.

**Templates for Chronologue Relay VR Documentation**

| **Topic type** | **Purpose** | **When to use it** |
|----|----|----|
| **Tutorial** | Help a beginner learn by doing | First-time tasks that build confidence and spark curiosity (for example, how to configure Chronologue VR to view your first event) |
| **How-to guide** | Enable users to achieve a specific goal | Step-based instructions for users who already know the basics |
| **Reference** | Provide fast, exact answers | API parameters, responses, event format definitions–mainly for technical audiences |
| **Concept** | Explain ideas and context | Background knowledge users need to understand the system or workflow (for example, how Chronologue synchronizes events across time) |
| **Troubleshooting** | Unblock users | Known errors, quick diagnostics, and problem-solving steps. |

When planning a document, pick the type based on the user’s goal–*learn*, *do*, *look up*, or *understand*. If your document has multiple purposes, split the content. We encourage contributors to use these templates when creating documentation. They’re designed to support both **general** and **technical** audiences.

###  **General Writing Guidelines**

Follow the Google Style Guide for clarity, sentence structure, and inclusive wording. The notes below add advice specific to Chronologue Relay or reinforce writing habits that make complex topics easier to understand.

- **Keep sentences short and simple  
  ** Use short, direct sentences. Favor verbs over nouns. Avoid wordy qualifiers and stacked prepositional phrases. If a sentence has more than one idea, split it.

- **Use concrete language  
  ** Prefer specific actions and objects to abstract concepts. Show readers what something does before naming how it works.

- **Name new ideas once  
  ** Introduce terms where they first come up. Use the same term consistently afterward. If a definition is longer than a sentence and there no existing definition in the Glossary of Terms, suggest including it with the editorial team.

- **Use simple flow  
  ** Avoid marketing tone, metaphors that obscure meaning, and clever phrasing that distracts the reader. Focus on helping the reader achieve their goals quickly.

These guidelines help writers stay focused on what the reader needs. When in doubt: simplify the sentence, clarify the reader’s goals, and guide the user to the next step.

## **Accessible writing**

Chronologue Relay documentation should work for everyone–including people using screen readers, voice navigation, and other assistive tools. Follow the Google Style Guide’s accessibility guidance and the [<u>WCAG principles</u>](https://www.w3.org/TR/UNDERSTANDING-WCAG20/intro.html) of making content more accessible.

The practices below come from [<u>WCAG accessibility standards</u>](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contents), with examples tailored for Chronologue Relay documentation.

**Write in plain language  
** Keep sentences short, direct, and avoid of jargon or idioms. This lowers cognitive load and improves parsing for assistive technologies.

*Instead of:* “Initialize the environment for session execution.”  
*Write:* “Set up your viewing session.”

**Use descriptive link text  
** Readers should know where a link leads without guessing.  
*Good:* “View simulation options.”  
*Avoid:* “Click here.”

**Organize with correct heading levels  
**Headings communicate structure to screen readers. Move in order: H2 → H3 → H4. Don’t skip levels.

*Example:  
* H2: Setting up your headset  
H3: Pairing with Chronologue Relay

**Avoid directional language  
**Interfaces shift between devices and layouts. Describe the action, not the location.

*Instead of:* “See the section on the right.”  
*Write:* “Open the **Controls** panel in the main menu.”

**Provide descriptive alt text  
** Every essential image needs alt text that communicates its purpose. Mark decorative images as decorative.

*Example:* “Screenshot of the Event Timeline showing Halley’s Comet in 12 BCE

## **Inclusive and bias-free writing**

Chronologue Relay reaches a global audience. Our documentation should feel welcoming to everyone who reads it. Follow the Google Style Guide’s principles for inclusive language: write to inform, not to assume.

**Use gender-neutral language  
** When referring to a person whose gender you don’t know, use neutral terms like *they*, *users*, or *people*.

*Example:* “They operated the controls in the observation station.”  
(Not: “He manned the controls.”)

**Avoid cultural assumptions  
**Readers come from different countries, traditions, and backgrounds. Use references that make sense to all of them.

*Example:* “A comet that appeared on December 24, 2000.”  
(Not: “A comet on Christmas Eve.”)

**Use precise geographic language  
**Place names change over time and can have political or cultural implications. When writing about time and space scenarios for Chronologue Relay VR. Use the term that matches the context:

- **Modern context** - current country or region name  
  *Example:* “Northern Mexico, near Monterrey.”

- **Historical context** - the name used during that period  
  *Example:* “The Aztec capital of Tenochtitlan (now Mexico City).”

Avoid using terms interchangeably, and be cautious about implying ownership or political claims through wording.

*Good:* “North America” when referring to the continent as a whole  
*Good:* “United States” when the topic is country-specific  
*Avoid:* “America” when only the U.S. is intended - it may exclude Canada and other regions

When in doubt, choose the term that makes the most sense for the reader with the **least assumed background knowledge**.

**Describe people the way they describe themselves  
** Use current terminology. Don’t generalize or rely on stereotypes.

**Using linters**

Linters help writers stay consistent without having to memorize every style rule. Chronologue Relay uses [<u>Vale</u>](https://vale.sh/) to check for clarity, terminology, and formatting issues as you write.

Vale enforces:

- Google Style Guide

- Our **Custom Rules** for audience and tone

- Chronologue Relay terminology

This gives writers quick feedback and keeps our content consistent across different document types.

### **Terminology lists**

Vale checks terms against three controlled lists:

| **List** | **Purpose** |
|----|----|
| **BaseTerms** | Core product language used in all content |
| **GeneralAudience** | Plain-language preferences for learner-focused docs (tutorials, how-to guides) |
| **TechnicalAudience** | Terms and phrasing for developer and API documentation |

You can find these files in the repository:

/tools/vale/terms/

├── BaseTerms.yml

├── GeneralAudience.yml

└── TechnicalAudience.yml

### **How to use Vale**

Run Vale while writing or before you submit a merge request. The tool highlights:

- unclear or inconsistent terminology

- missing or incorrect front-matter fields (like audience:)

- issues with readability or structure that may block users

Resolve flagged issues or add new terminology for review when appropriate.

You can run Vale from the command line or install it in your text editor (like [<u>VS Code</u>](https://marketplace.visualstudio.com/items?itemName=errata-ai.vale-server)) to get real-time feedback.

## **How the style guide is updated**

The editorial team will review the Chronologue Style Guide in full every six months to ensure it stays current with product updates and the needs of our users. In between major reviews, we make minor adjustments as needed, especially when new features are released or when contributors flag unclear or outdated guidelines.

All updates are tracked in the style guide changelog, and we communicate changes directly to documentation contributors. If you spot something that needs clarification, or you have a suggestion for improving the guide, contact the editorial team at **styleguide@zaiusinc.com**

## **Revision history**

We record all major and minor updates in the Change Log. The most current changes and versions are listed at the top of the file ([<u>changelog.md</u>](http://changelog.md)). We use **Semantic Versioning** to track editions of the style guide:

- **0.x** for drafts before official release

- **1.0** for the first published version

- **1.1**, **1.2**, etc., for minor updates

- **2.0**, **3.0**, etc., for major revisions

## **Decision log**

As the project evolves, so will the Chronologue Style Guide. The editorial team keeps a running [<u>Decision Log</u>](https://docs.google.com/document/d/1YSQbkrMsRjII9cL1tcxP6Y0f3Egz6QPhmWcuBsvlJ44/edit?tab=t.0) to document choices before implementing them. This helps us stay transparent and makes it easy to track why we made certain calls, like preferring one term over another, or deciding to make an exception to the Google Style Guide.