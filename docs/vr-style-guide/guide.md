---
title: Zaius Style Guide
description: Writing standards and terminology guidelines for Zaius documentation contributors.
---
!!! abstract "About this sample"
    - **What this is:** Writing standards and terminology guidelines for documentation contributed to a VR product. It covers voice, tone, and language decisions for a dual audience of general consumers and developers.
    - **Audience:** Technical writers contributing to a VR product.
    - **Tools used:** MkDocs, Material for MkDocs, Markdown, Vale.
    - **What it demonstrates:** Defining how a product's documentation should sound when the domain is unfamiliar enough that generic style guide conventions don't hold. The guide had to establish terminology and voice from first principles rather than adapt an existing standard.  
    - **Behind the docs:** [Read the case study →](index.md)
    
# VR Style Guide

**Version:** 1.0
**Updated:** 03/13/2026

## Introduction

Welcome to the project. This style guide is for contributors, not end users, and provides guidance for creating clear, consistent documentation across Zaius products. We write for two main audiences: astronomy enthusiasts using Chronologue Relay VR for simulations and developers who build and integrate these products.

Please review the style rules below to ensure our documents are accessible to both groups. Before you start writing, check these guidelines carefully. If you have questions, reach out to the editorial team at [styleguide@zaiusinc.com](mailto:styleguide@zaiusinc.com).

## Our Preferred Style Guide

Zaius documentation is based on the [Google Developer Documentation Style Guide](https://developers.google.com/style). This guide sets the standard for technical content. It serves as our main style guide for Zaius. In this section, we highlight key rules from the Google Style Guide and show how we adapt them to our project.

### Highlights from the Google Style Guide

The following highlights show rules from the Google Style Guide that are important to follow when writing Zaius documentation.

#### Defining Abstract Concepts

**Google's rule:** Define new or abstract concepts before using them.

**Why it matters for Zaius:** Abstract terms can be interpreted in different ways. Don't rely on readers to guess their meaning. Define them the first time they appear in a document, even if they're already listed in the glossary.

| | Example |
|---|---|
| ❌ Don't use | "Chronologue Relay VR lets you experience temporal reconstructions." |
| ✅ Use | "Chronologue Relay VR lets you experience temporal reconstructions — simulations of astronomical events from the past or future." |

See Google's guidance: [Jargon](https://developers.google.com/style/jargon)

#### Using Analogies

**Google's rule:** Use examples and comparisons to make complex systems easier to understand.

**Why it matters for Zaius:** Explaining how Chronologue Relay VR works and the events it simulates can be technical and complex. Use analogies to familiar concepts to help readers understand without oversimplifying.

| | Example |
|---|---|
| ❌ Don't use | "Chronologue Relay VR simulates orbital mechanics." |
| ✅ Use | "Chronologue Relay VR simulates a celestial clockwork — planets and moons move in precise paths around each other." |

See Google's guidance: [Examples](https://developers.google.com/style/examples)

#### Providing Context When Listing Product Features

**Google's rule:** Focus on what users want to achieve. Provide clear steps to achieve a goal.

**Why it matters for Zaius:** Listing features alone doesn't explain why they are important. Provide context for each feature to help readers understand big-picture concepts or achieve a goal.

| | Example |
|---|---|
| ❌ Don't use | "Chronologue Relay VR lets you view eclipses from any century." |
| ✅ Use | "By letting you view eclipses from any century, Chronologue Relay VR shows how orbital mechanics repeat over time." |

See Google's guidance: [Prescriptive documentation](https://developers.google.com/style/prescriptive-documentation)

### How Zaius Adapts the Google Style Guide

The following rules adapt Google's guidance for writing about time-based astronomical events.

#### Formatting Astronomical Data

**Google's rule:** Covers code formatting but doesn't specify how to present scientific data.

**Zaius' rule:** Format dates, times, and coordinates consistently. Use internationally recognized standards when you need to be precise. Provide a plain-language version for general readers.

**Example:** `2024-07-18T23:45Z` (11:45 p.m. UTC on July 18, 2024)

#### Talking About Past and Future Events

**Google's rule:** Use the present tense for statements that describe general behavior not tied to a specific time.

**Zaius's rule:** When writing about events shown in Chronologue Relay VR, always include the time period or historical context. Don't use the present tense without a clear time context. Readers may not know whether you mean the user's current action or the simulated event.

| | Example |
|---|---|
| Google-style | "You watch the supernova explode in 1054." |
| Zaius-style | "Through Chronologue Relay VR, you observe a reconstruction of the supernova as it appeared in 1054." |

#### Describing the User's Perspective

**Google's rule:** Write from the user's perspective.

**Zaius' rule:** Write from the user's viewpoint when describing astronomical events, since VR allows multiple perspectives. State whether users are viewing from Earth, space, or another vantage point.

| | Example |
|---|---|
| ❌ Don't use | "The galaxy rotates slowly." |
| ✅ Use | "From your position 100,000 light-years above the galactic plane, you observe the Milky Way's rotation over millions of years." |

### If the Style Guide Doesn't Cover Your Question

Start with the style rules from the sections above. If your question isn't answered, check the Google Style Guide. When the Zaius guide doesn't cover a topic, search the Google guide thoroughly. If you don't find it in the expected section, look in related sections.

If a Google rule doesn't seem right for Zaius documentation, contact the editorial team before making an exception.

If you can't find the answer to your question and you make a judgment call on an uncovered topic, document it in your work or merge request so the question can be reviewed for possible inclusion in the guide.

## Voice and Tone

Zaius documentation supports two main audience types.

**General audience:** Readers who use Chronologue Relay VR to explore simulations, such as educators, students, and hobbyists. These readers may not work directly with system configuration or APIs.

**Technical audience:** Readers who configure systems, work with APIs, or manage simulation data. These readers are comfortable following technical instructions and using system terminology.

### Voice

Zaius documentation uses a scientific voice that is accurate and accessible. Explain concepts clearly without oversimplifying them.

### Tone

Adjust tone based on the audience.

- **General audience:** Guide readers as they explore the system. Use verbs that encourage discovery, such as *explore*, *observe*, and *simulate*.
- **Technical audience:** Use a neutral, direct, command-based style with clear action verbs.

### Examples

**Technical audience**

| | Example |
|---|---|
| ❌ Don't use | "Let's explore how this API brings the simulation to life." |
| ✅ Use | "Run the request below to retrieve simulation data from the API." |

**General audience**

| | Example |
|---|---|
| ❌ Don't use | "Click the Run Simulation button to start the process." |
| ✅ Use | "Explore the simulation by selecting Run Simulation and observing how the scene evolves." |

## Glossary of Preferred Terms

Use these terms consistently in Zaius documentation to keep language clear and consistent. The table lists preferred terms and terms to avoid, in alphabetical order.

| Preferred Term | Avoid These Terms | Explanation |
|---|---|---|
| Chronologue Relay VR | the Relay, the system | The full product name. Use on the first mention. Afterward, shorten to Chronologue. |
| connect | authenticate | Use to mean start a session or pair a device in general-audience documentation. Use *authenticate* only when referring specifically to credential checks. |
| device | hardware, unit, machine | Any supported hardware used with Chronologue (for example, VR headsets). |
| event | phenomenon, trigger, action | A specific occurrence in space and time (for example, a solar eclipse at a given time). |
| field of view (FoV) | field of vision | Standard term for the visible area in the headset. |
| headset | goggles, viewer, helmet | Standard VR hardware term. |
| launch | boot up, fire up | Standard term for starting an application. |
| navigate | walk, move through | Use to mean move through the VR environment or menus for consistency. |
| select | click, tap, press | Use to mean choose an item or activate an interface element. Other alternatives might be device-specific and misunderstood. |
| timeline | time axis, chronostream | Use to mean a visual representation of events over time. |

!!! note
    As terminology grows, new entries will be added here. Vale flags terms to avoid and suggests preferred replacements.

### Essential VR Terms

In addition to Zaius-specific preferred terms, writers can use the [Meta Quest (Oculus) VR Glossary](https://developer.oculus.com/documentation/native/android/mobile-glossary/) for common VR terms. Use these terms when explaining features, describing environments, or defining user actions so the language matches how VR is commonly described.

## Topic Types and Templates

Before you draft your document, clarify your reader's goal and the audience type — general or technical. This choice determines the tone, terminology, and Vale rules for your document. After that, select the topic type that best aligns with the reader's needs.

Here are some helpful templates for Zaius documentation:

- Tutorials
- How-to guides
- Reference
- Concepts

Focus each document on a single purpose. Avoid mixing step-by-step instructions, explanations, and reference material, unless necessary. This helps reduce confusion. Templates for each type are available to assist with drafting and maintaining focus. Using them is optional.

## Accessible Writing

Documentation should be accessible to people with disabilities and those using various input methods and devices. Improving accessibility also makes documentation clearer and more helpful for everyone. Zaius adheres to [Google's accessibility guidance](https://developers.google.com/style/accessibility) and the [WCAG principles](https://www.w3.org/WAI/standards-guidelines/wcag/) to ensure content is more accessible.

### Write in Plain Language

Use simple words, short sentences, and the active voice to make your writing easy to understand. Avoid jargon, metaphors, and complex phrasing that might confuse people using screen readers and non-native English speakers.

### Avoid Directional Language

Describe the action, not the location.

| | Example |
|---|---|
| ❌ Don't use | "To your left, you can see the outlines of an eclipse beginning to form." |
| ✅ Use | "An eclipse appears on the screen." |

### Provide Descriptive Alt Text

Every essential image needs alt text that communicates its purpose. Mark decorative images as decorative.

**Example:** `"Screenshot of the Event Timeline showing Halley's Comet in 12 BCE"`

For additional resources on making your writing more accessible, see:

- [plainlanguage.gov](https://www.plainlanguage.gov) — Guidelines for clear communication.
- [Hemingway Editor](https://hemingwayapp.com) — A tool to test the readability of your writing.

## Inclusive and Bias-Free Writing

Zaius products reach a global audience. Our documentation should feel welcoming to everyone who reads it. Follow the [Google Style Guide's principles for inclusive language](https://developers.google.com/style/inclusive-documentation).

### Use Gender-Neutral Language

When referring to a person whose gender you don't know, use neutral terms like *they*, *users*, or *people*.

| | Example |
|---|---|
| ✅ Use | "They operated the controls in the observation station." |
| ❌ Don't use | "He manned the controls." |

### Avoid Cultural Assumptions

Readers come from different countries, traditions, and backgrounds. Use references that make sense to all of them.

| | Example |
|---|---|
| ✅ Use | "A comet that appeared on December 24, 2000." |
| ❌ Don't use | "A comet on Christmas Eve." |

### Use Precise Geographic Language

Place names change over time and can have political or cultural implications. When writing about time and space scenarios for Chronologue Relay VR, use the term that matches the context.

**Modern context** — use the current country or region name.
> "Northern Mexico, near Monterrey."

**Historical context** — use the name used during that period.
> "The Aztec capital of Tenochtitlan (now Mexico City)."

Avoid using terms interchangeably, and be cautious about implying ownership or political claims through wording.

- ✅ Use "North America" when referring to the continent as a whole.
- ✅ Use "United States" when the topic is country-specific.
- ❌ Avoid "America" when only the U.S. is intended — it may exclude Canada and other regions.

## Using Linters

Vale is a command-line linting tool that checks your writing for clarity, terminology, and formatting issues as you write. Running Vale before submitting a merge request is required. Documents that fail the Vale check will not be merged.

### Before You Run Vale

After identifying your audience in the topic types section, add the appropriate front matter tag to the top of your document:
```yaml
audience: general
```
```yaml
audience: technical
```

Vale uses this tag to determine which terminology list to apply to your document.

### Terminology Lists

Vale checks terms against three controlled lists:

| List | Purpose |
|---|---|
| `BaseTerms` | Core product language used in all content |
| `GeneralAudience` | Plain-language preferences for learner-focused docs (tutorials, how-to guides) |
| `TechnicalAudience` | Terms for developer and API documentation |

You can view the terminology lists by audience in the Vale directory at:
```
/tools/vale/terms/
├── BaseTerms.yml
├── GeneralAudience.yml
└── TechnicalAudience.yml
```

### How to Run Vale

Run Vale from the command line in your document directory before submitting a merge request:
```bash
vale your-document.md
```

You can also install it in your text editor (like VS Code) to get real-time feedback. Vale flags terminology, readability, and formatting issues directly in your terminal or editor. Resolve flagged issues before submitting your merge request. If you believe a flagged term is correct, note it in your merge request for editorial review.

## How the Style Guide Is Updated

The editorial team will review the Chronologue Style Guide in full every six months to ensure it stays current with product updates and the needs of our users. In between major reviews, we make minor adjustments as needed, especially when new features are released or when contributors flag unclear or outdated guidelines.

All updates are tracked in the style guide changelog, and we communicate changes directly to documentation contributors. If you spot something that needs clarification, or you have a suggestion for improving the guide, contact the editorial team at [styleguide@zaiusinc.com](mailto:styleguide@zaiusinc.com).

## Decision Log

As the project evolves, so will the Chronologue Style Guide. The editorial team keeps a running Decision Log to document choices before implementing them. This helps us stay transparent and makes it easy to track why we made certain calls, like preferring one term over another, or deciding to make an exception to the Google Style Guide.