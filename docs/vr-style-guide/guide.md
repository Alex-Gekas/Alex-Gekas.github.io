!!! abstract "About this sample"

    - **What this is:** A contributor style guide for Zaius Inc., a fictional company in the [Chronologue](https://chronologue.dev) universe created by the [Good Docs Project](https://www.thegooddocsproject.dev/), with an accompanying [case study](index.md) outlining the decisions behind it.

    - **Audience:** Technical writers and documentation contributors working on Zaius products.

    - **Tools used:** Vale, MkDocs, Markdown

    - **What it demonstrates:**

        * Adapting an industry-standard style guide (Google) for a domain with its own constraints — specifically, writing about astronomical events across time from a consistent user perspective
        * Designing customized terminology lists for each audience (general vs. technical) enforced at the linting level
        * Integrating Vale prose linting into a docs-as-code review workflow, including custom rules for product-specific terminology
        * Building governance infrastructure — decision log, update cycle, escalation path — that scales beyond a single writer
        * Applying Diátaxis content-type thinking to guide contributors toward focused, single-purpose documents

# Zaius Style Guide

**Version:** 1.0  
**Updated:** 05/08/2026

## Introduction

Welcome to the Zaius documentation style guide. This guide is for contributors to Zaius documentation. Use it to create clear, consistent content across all Zaius products.

Before you begin, review the guidelines in each section, which cover how we write for our audiences, our default style guide, and linting practices.

## Our preferred style guide

Zaius documentation follows the [Google Developer Documentation Style Guide](https://developers.google.com/style) as its default. In this section, we highlight key rules from that guide and show how we adapt them for Zaius. For all other style questions, follow the Google Style Guide.

### Highlights from the Google Style Guide

Because Zaius products can be complex, the following highlights show rules from the Google Style Guide that are especially important when writing Zaius documentation.

#### Definitions of abstract concepts

**Google's rule:** Define new or abstract terms before using them.

Terms like "temporal observation" are not self-explanatory. Define them on first use, even if they appear in the product glossary.

**Example**

Don't use: "Chronologue Relay VR lets you make temporal observations."

Use: "Chronologue Relay VR lets you experience temporal observations, which are direct views of astronomical events as they occur at a specific point in time."

Use: "Chronologue Relay VR lets you experience temporal observations (direct views of astronomical events as they occur at a specific point in time)."

#### Context for product feature lists

**Google's rule:** Introductory sentences for procedures should focus on what the user wants to achieve, not just describe the feature.

Apply this at the sentence level when introducing procedures. Tell the user what they'll accomplish before describing the feature or listing steps.

Don't use: "Chronologue Relay VR has an event filter."

Use: "To find eclipses from a specific century, filter events by century in Chronologue Relay VR."

### How Zaius adapts the Google Style Guide

Because Chronologue Relay presents events across different points in time, writers need to provide a clear frame of reference. The following rules adapt the Google Style Guide for writing about time-based astronomical events.

#### Astronomical data formats

**Google's rule:** Use clear, consistent date and time formats. Spell out months in prose and use ISO 8601 for precise values.

**Zaius' adaptation:** API responses return date and time values in ISO 8601 format. For general audience documentation, always include a plain-language equivalent for the raw date value in the same sentence so readers without a technical background can understand the time reference. In technical documentation intended for developers, the raw ISO 8601 value alone is acceptable.

**Example:**

Don't use (in general audience docs): "The eclipse begins at 2024‑07‑18T23:45Z."

Use: "The eclipse begins at 2024‑07‑18T23:45Z (11:45 p.m. UTC on July 18, 2024)."

#### Past and future events

**Google's rule:** Use the present tense for statements that describe general behavior not tied to a specific time.

**Zaius' adaptation:** When writing about events shown in Chronologue Relay VR, always provide a time context and make the present viewing perspective clear. This helps readers distinguish between the user's current experience and the event being viewed.

**Examples:**

- **Past:** "You watch a supernova in 1054, viewed from the present through the Chronologue."
- **Present:** "You observe the International Space Station's current orbit in real time through the Chronologue."
- **Future:** "You watch the Andromeda galaxy collide with the Milky Way in 4 billion years, viewed from the present through the Chronologue."

#### User perspective

**Google's rule:** Write from the user's perspective.

**Zaius' adaptation:** Although the user is always physically on Earth, Chronologue Relay VR can simulate views from different points in space. Always make clear whether the description reflects the user's actual Earth-based position or a simulated vantage point. Do not assume readers will infer this distinction.

**Example:**

Don't use: "The planets orbit the Sun."

Use: "From Earth, you observe the planets' positions change as they orbit the Sun over time through the Chronologue."

### If the style guide doesn't cover your question

Start with the style rules from the sections above. If your question isn't answered, check the Google Style Guide. When the Zaius guide doesn't cover a topic, search the Google guide thoroughly. If you don't find it in the expected section, check the index or search the guide.

If you can't find the answer to your question, and you make a judgment call on an uncovered topic, document it in your work or merge request so the question can be reviewed for possible inclusion in the guide.

## Voice and tone

Zaius documentation supports two main audience types. Understanding the audience helps you choose the right level of detail, terminology, and tone.

**General audience:** Readers who use Chronologue Relay VR to explore and observe events across time, such as educators, students, and hobbyists. These readers focus on understanding what they see and may not be familiar with technical concepts, system configurations, or APIs.

**Technical audience:** Readers who configure systems, work with APIs, or manage event data. These readers are comfortable following technical instructions, interpreting structured data, and using system-specific terminology.

### Voice

Zaius uses an authoritative, scientific voice while remaining accessible to all audiences. Explain concepts clearly without oversimplifying them.

### Tone

Adjust tone based on the audience.

**General audience:** Guide readers as they explore the system. Use verbs that encourage discovery, such as *explore* and *observe*. Avoid overly technical language.

Don't use: "Click the Run Event button to start the process."

Use: "To explore the event and observe how the scene evolves, select Run Event."

**Technical audience:** Use a neutral, direct, command-based style with clear action verbs. Focus on tasks, inputs, and outputs.

Don't use: "Let's explore how this API brings the event to life."

Use: "To retrieve event data, run the request below."

## Glossary of preferred terms

Use these terms consistently in Zaius documentation to keep language clear and consistent. The table lists preferred terms and terms to avoid, in alphabetical order.

| Preferred Term | Avoid These Terms | Explanation |
|---|---|---|
| Chronologue Relay | Relay server, VR console, the system | The home console that stores and processes Chronologue data and connects to the Chronologue API and other Relay instances via P2P protocol. Use the full *Chronologue Relay* on first mention. Acceptable terms thereafter include *console*, *local console*, and *Relay console*. |
| Chronologue VR App | VR player, VR viewer, Chronologue Relay VR | The VR application that connects to the Chronologue Relay to provide an interactive astronomical experience. Use the full *Chronologue VR App* on first mention. Acceptable terms thereafter include *the VR App* and *the app*. |
| device | hardware, unit, machine | Any supported hardware used with Chronologue (for example, VR headsets). |
| event* | phenomenon, trigger, action | A specific occurrence in space and time (for example, a solar eclipse at a given time). *For technical audiences, an 'event' is also an API endpoint. |
| field of view (FoV) | field of vision | Standard term for the visible area in the headset. |
| headset | goggles, viewer, helmet | Standard VR hardware term. |
| launch | boot up, fire up | Standard term for starting an application. |
| navigate | walk, move through | Use to mean move through the VR environment or menus for consistency. |
| select | click, tap, press | Use to mean choose an item or activate an interface element. Other alternatives might be device-specific and misunderstood. |
| timeline | time axis, chronostream | Use to mean a visual representation of events over time. |
| Zaius's | Zaius' | Use *Zaius's*, not *Zaius'*, when writing the possessive form. The added "s" improves clarity. |

> **Notes:**
> - As terminology grows, new entries will be added here.
> - Vale (a prose linter) flags terms to avoid and suggests preferred replacements. For configuration details, see [Using linters](#using-linters).
> - Use these terms when explaining features, describing environments, or defining user actions so the language matches how VR is commonly described.

## Topic types and templates

Before you draft your document, clarify your reader's goal and the audience type — general or technical. This choice determines the tone, terminology, and Vale rules for your document.

This documentation uses four primary content types:

- Tutorials
- How-to guides
- Reference
- Concepts

Focus each document on a single purpose. Avoid mixing step-by-step instructions, explanations, and reference material unless necessary. This helps reduce confusion.

Templates are available to help you get started and stay focused. Using them is optional.

## Accessible writing

Make sure your documentation is easy to use for people on different devices and in different situations. Improving accessibility also makes documentation clearer and more helpful for everyone.

Zaius follows accessibility guidance from the Google Developer Documentation Style Guide and WCAG principles.

Some key practices:

- Write in plain language using short sentences and the active voice.
- Avoid directional language. Describe the action, not the location. Use: *See Installation for details.* Don't use: *See the section below.*
- Provide descriptive alt text for essential images.

## Inclusive and bias-free writing

Zaius products reach a global audience. Documentation should feel clear and neutral to all readers.

- Use gender-neutral language (for example, *they*, *users*).
- Avoid culturally specific references that may not be widely understood.
- Use precise geographic language, especially when describing historical or time-based contexts.
- When describing events across time, choose terms that match the historical or modern context without implying unintended meaning.

**Example:**

Don't use: "A solar eclipse appears over America in 1200."

Use: "A solar eclipse appears over North America in 1200."

## Using linters

Vale is a command-line linting tool that checks your writing for clarity, terminology, and formatting issues as you write. Running Vale before submitting a merge request is required. Documents that fail the Vale check will not be merged.

### Style standards

Vale enforces two layers of rules:

- **Google Developer Documentation Style Guide:** The industry standard for technical clarity and inclusivity.
- **Zaius Custom Rules:** Project-specific rules for astronomical perspectives, ISO 8601 formatting, and time-based context.

### Vale setup

After identifying your audience in the [topic types](#topic-types-and-templates) section, add the appropriate front matter tag to the top of your document:

```yaml
audience: general
```

```yaml
audience: technical
```

Vale uses this tag to determine which terminology list to apply to your document.

### Terminology lists

Vale checks terms against three controlled lists:

| List | Purpose |
|---|---|
| BaseTerms | Core product language used in all content |
| GeneralAudience | Plain-language preferences for learner-focused docs (tutorials, how-to guides) |
| TechnicalAudience | Terms for developer and API documentation |

You can view the terminology lists by audience in the Vale directory at:

```
/tools/vale/terms/
    BaseTerms.yml
    GeneralAudience.yml
    TechnicalAudience.yml
```

### How to run Vale

Run Vale from the command line in your document directory before submitting a merge request:

```bash
vale your-document.md
```

You can also install it in your text editor (like VS Code) to get real-time feedback.

Vale flags terminology, readability, and formatting issues directly in your terminal or editor. Resolve flagged issues before submitting your merge request. If you believe a flagged term is correct, note it in your merge request for editorial review.

---

## How the style guide is updated

The editorial team will review the Zaius Style Guide in full every six months to ensure it stays current with product updates and the needs of our users. In between major reviews, we make minor adjustments as needed, especially when new features are released or when contributors flag unclear or outdated guidelines.

All updates are tracked in the style guide Decision Log, and we communicate changes directly to documentation contributors. If you spot something that needs clarification, or you have a suggestion for improving the guide, contact the editorial team at [styleguide@zaiusinc.com](mailto:styleguide@zaiusinc.com).

## Decision log

As the project evolves, so will the Zaius Style Guide. The editorial team keeps a running Decision Log to document choices before implementing them. This helps us stay transparent and makes it easy to track why we made certain calls, like preferring one term over another, or deciding to make an exception to the Google Style Guide.