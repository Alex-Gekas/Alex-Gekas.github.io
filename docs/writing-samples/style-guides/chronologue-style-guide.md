# Chronologue Relay Style Guide

Documentation style guide for a fictional virtual reality project, adapted from The Good Docs Project template.

!!! note "What I Did"
    I developed a style guide tailored for a VR product scenario, adapted a Good Docs Project template for consistency and standards, and defined voice, tone, and terminology guidance for mixed audiences.  


### **Introduction**

Welcome to the **Chronologue Relay VR Style Guide**—your practical reference for creating clear, engaging content that speaks with one consistent voice. Whether you're writing a tutorial, drafting support docs, or refining developer content, this guide helps keep our content unified across the board.

**Chronologue Relay VR** is an immersive Virtual Reality experience that connects to the Chronologue API to simulate astronomical events, either from ancient history or far into the future. Our documentation reaches a wide range of users, from hobbyists and educators to museum professionals and technical staff.

Since Chronologue Relay VR is built to engage users with unique experiences, our content should reflect that same sense of curiosity and clarity. This guide helps contributors choose the right tone for different audiences while keeping our brand voice consistent and recognizable in how we communicate.

**Intended Audience and Scope**

This guide is for anyone who contributes to Chronologue Relay VR’s documentation, whether you’re a product manager, engineer, technical writer, or a future contributor from our community. It offers practical advice for writing with clarity and consistency, especially when shifting between content for general audiences and more technical materials for support teams.

These formatting conventions apply to all *on-stage* Chronologue Relay documentation — public-facing content published in the official documentation site or distributed to customers. Currently, the guide covers user-facing materials like manuals, how-tos, tutorials, and troubleshooting articles. In the future, it may grow to include marketing pieces and community-submitted articles. It does **not** apply to UI text, internal developer notes, or source code comments, which follow looser style and formatting rules.


### **Our preferred style guide**

We use the[ Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/) as our default reference for grammar, punctuation, and general writing style to keep things consistent. It is well recognized, easy to adopt across teams, and well suited to the mix of technical and general audiences we write for.

At the same time, Chronologue Relay VR has its own brand personality—exploratory, inspiring, and educational—so we sometimes adapt the rules to better reflect that voice.

Here are a few ways we differ from Microsoft’s default guidance:



* **Tone**: We allow, and encourage, more expressive, imaginative language, especially when writing for general audiences like hobbyists and educators. If it helps spark curiosity or a sense of wonder. 

* **Clarity over precision**: When writing for non-technical audiences, we may simplify technical language to keep things clear and engaging. 

* **Product terminology**: We follow Chronologue Relay VR ’s own naming conventions and branding standards. You can find those in the Brand Terminology Guide. 


Striking the right balance between the Microsoft Style Guide and our voice helps us stay consistent, without losing the feeling of curiosity and wonder that makes Chronologue Relay VR so engaging.


## **Glossaries of Preferred Terms**

Every project builds its own vocabulary over time, whether through technical terms, product-specific language, or phrases that just feel right for the audience. This glossary lists the terms we prefer when writing about Chronologue Relay, especially where they differ from the Microsoft Style Guide.

Our goal is to keep things clear and accessible, so we avoid unnecessary jargon, overhyped language, made-up buzzwords, and science-fiction terms that might distract or confuse readers. Whenever possible, we stick to established standard terms in educational technology, astronomy, and VR. If a term is already defined in the Microsoft Style Guide, we defer to that definition.


## **Brand Terminology**

Use this table to maintain consistent, reader-centered language when writing about Chronologue Relay VR. These choices reflect our style decisions and override or tweak Microsoft Style Guide defaults.


<table>
  <tr>
   <td><strong>Use</strong>
   </td>
   <td><strong>Don’t Use</strong>
   </td>
   <td><strong>Reasoning</strong>
   </td>
  </tr>
  <tr>
   <td><strong>Zaius, Inc.</strong>
   </td>
   <td>Not Zaius
   </td>
   <td>Consistency in legal name for entity
   </td>
  </tr>
  <tr>
   <td><strong>headset</strong>
   </td>
   <td>goggles, viewer, helmet
   </td>
   <td>Standard industry term; others sound outdated or informal
   </td>
  </tr>
  <tr>
   <td><strong>Chronologue Relay VR</strong>
   </td>
   <td>the Relay, Chronologue Relay, the system
   </td>
   <td>Always use the full name
   </td>
  </tr>
  <tr>
   <td><strong>field of view (FoV)</strong>
   </td>
   <td>field of vision, viewing area/space
   </td>
   <td>Standard in VR; more precise
   </td>
  </tr>
  <tr>
   <td><strong>live session</strong>
   </td>
   <td>stream, broadcast
   </td>
   <td>More neutral; fits educational/interactive context
   </td>
  </tr>
  <tr>
   <td><strong>connect</strong>
   </td>
   <td>authenticate (in general docs)
   </td>
   <td>Friendlier for users; “authenticate” is reserved for technical docs
   </td>
  </tr>
  <tr>
   <td><strong>event</strong>
   </td>
   <td>phenomenon, trigger, action
   </td>
   <td>“Event” clearly refers to celestial and time-based experiences
   </td>
  </tr>
  <tr>
   <td><strong>session</strong>
   </td>
   <td>journey, ride
   </td>
   <td>“Session” is unambiguous
   </td>
  </tr>
  <tr>
   <td><strong>device</strong>
   </td>
   <td>hardware, unit, machine
   </td>
   <td>“Device” is clearer and consistent across platforms
   </td>
  </tr>
  <tr>
   <td><strong>observe</strong>
   </td>
   <td>witness, view
   </td>
   <td>“Observe” is precise in context
   </td>
  </tr>
  <tr>
   <td><strong>navigate</strong>
   </td>
   <td>walk, move through, teleport
   </td>
   <td>Standard UX term; other terms might evoke different meanings
   </td>
  </tr>
  <tr>
   <td><strong>timeline</strong>
   </td>
   <td>time axis, chronostream
   </td>
   <td>“Timeline” is familiar and visual; avoids sci-fi jargon
   </td>
  </tr>
  <tr>
   <td><strong>real-time</strong>
   </td>
   <td>realtime (no hyphen), live feed
   </td>
   <td>Hyphenated per Microsoft Style Guide
   </td>
  </tr>
  <tr>
   <td><strong>recording</strong>
   </td>
   <td>replay, simulation (generic)
   </td>
   <td>Clearer for stored sessions; “simulation” only for procedural content
   </td>
  </tr>
  <tr>
   <td><strong>interface</strong>
   </td>
   <td>dashboard, screen, console
   </td>
   <td>“Interface” is broad and precise; “dashboard” is UI-specific
   </td>
  </tr>
  <tr>
   <td><strong>launch</strong>
   </td>
   <td>boot up, fire up, initiate
   </td>
   <td>“Launch” is standard for apps; others are too casual or overly technical
   </td>
  </tr>
  <tr>
   <td><strong>disconnect</strong>
   </td>
   <td>log off, drop, unpair
   </td>
   <td>“Disconnect” is clear and consistent for hardware and session endings
   </td>
  </tr>
</table>


**Essential VR Terms**

To support clarity and consistency, we include a selection of **established VR terms** that appear in Chronologue Relay VR documentation. These terms are based on widely accepted usage in educational technology and VR platforms.


### **Chronologue Relay VR – Terminology**


<table>
  <tr>
   <td><strong>Term</strong>
   </td>
   <td><strong>Definition</strong>
   </td>
   <td><strong>Reasoning</strong>
   </td>
  </tr>
  <tr>
   <td><strong>headset</strong>
   </td>
   <td>A device you wear on your head that shows the VR environment.
   </td>
   <td>Standard VR hardware; used across all content.
   </td>
  </tr>
  <tr>
   <td><strong>controller</strong>
   </td>
   <td>A handheld device you use to interact with the VR world. It may have buttons or motion sensors.
   </td>
   <td>Describes user input hardware simply.
   </td>
  </tr>
  <tr>
   <td><strong>field of view (FoV)</strong>
   </td>
   <td>How much of the VR world you can see at one time through the headset. Abbreviate only after spelling it out first.
   </td>
   <td>Common VR spec; define for clarity.
   </td>
  </tr>
  <tr>
   <td><strong>FoV adjustment</strong>
   </td>
   <td>Changing the amount of the VR world you can see at once.
   </td>
   <td>Distinct from “field of view”; used in customization tips.
   </td>
  </tr>
  <tr>
   <td><strong>latency</strong>
   </td>
   <td>The time delay between your action and the system’s response.
   </td>
   <td>Common in performance discussions; explain in simple terms.
   </td>
  </tr>
  <tr>
   <td><strong>immersion</strong>
   </td>
   <td>The feeling of truly being inside the VR world.
   </td>
   <td>Avoid overuse or hype in product writing.
   </td>
  </tr>
  <tr>
   <td><strong>teleportation</strong>
   </td>
   <td>A way to move in VR by instantly jumping your view to another spot, without showing the travel in between.
   </td>
   <td>Clarifies it’s a navigation feature, not sci-fi teleportation.
   </td>
  </tr>
  <tr>
   <td><strong>3DoF / 6DoF</strong>
   </td>
   <td>“Degrees of Freedom” – 3DoF lets you look around; 6DoF also lets you move in any direction.
   </td>
   <td>Explains tracking types without heavy jargon.
   </td>
  </tr>
  <tr>
   <td><strong>frame rate</strong>
   </td>
   <td>How many images per second the VR display shows.
   </td>
   <td>Important for performance; include only when needed.
   </td>
  </tr>
  <tr>
   <td><strong>tracking</strong>
   </td>
   <td>How the system follows your head and hand movements.
   </td>
   <td>Applies to both headset and controller.
   </td>
  </tr>
  <tr>
   <td><strong>haptics</strong>
   </td>
   <td>Physical feedback you feel through the headset or controller, like vibration.
   </td>
   <td>Keeps the term clear for all audiences.
   </td>
  </tr>
  <tr>
   <td><strong>event</strong>
   </td>
   <td>A recorded moment in Chronologue Relay VR, such as an astronomical or story-based scene, that you can replay.
   </td>
   <td>Core content unit; appears in tutorials and API docs.
   </td>
  </tr>
  <tr>
   <td><strong>session</strong>
   </td>
   <td>The time from when you start using Chronologue Relay VR until you disconnect or log out.
   </td>
   <td>Used in API (<code>session_id</code>) and troubleshooting docs.
   </td>
  </tr>
  <tr>
   <td><strong>playback</strong>
   </td>
   <td>Watching or experiencing a recorded event again in VR.
   </td>
   <td>Appears in both user and developer docs.
   </td>
  </tr>
  <tr>
   <td><strong>synchronization</strong>
   </td>
   <td>Making sure playback or data matches across multiple devices or users.
   </td>
   <td>Important for collaboration features.
   </td>
  </tr>
  <tr>
   <td><strong>endpoint</strong>
   </td>
   <td>A specific web address in the API that does a task or returns data.
   </td>
   <td>Standard API term; needed for developer docs.
   </td>
  </tr>
  <tr>
   <td><strong>favorites</strong>
   </td>
   <td>A list of events you’ve saved to access quickly.
   </td>
   <td>Appears in feature lists and tutorials.
   </td>
  </tr>
  <tr>
   <td><strong>tag</strong>
   </td>
   <td>A short label you add to an event to help find it later.
   </td>
   <td>Used in search/filter instructions and API metadata.
   </td>
  </tr>
  <tr>
   <td><strong>metadata</strong>
   </td>
   <td>Extra details about an event, such as its title, creator, and time.
   </td>
   <td>Standard technical term; appears in API responses.
   </td>
  </tr>
  <tr>
   <td><strong>Relay Dashboard</strong>
   </td>
   <td>The main screen where you manage events, members, and settings.
   </td>
   <td>Appears in onboarding and navigation instructions.
   </td>
  </tr>
  <tr>
   <td><strong>member</strong>
   </td>
   <td>A person invited to join your Relay Dashboard and work with you.
   </td>
   <td>Used in collaboration features; clarify difference from “user.”
   </td>
  </tr>
  <tr>
   <td><strong>invite</strong>
   </td>
   <td>To send someone an access link or request so they can join your Relay Dashboard.
   </td>
   <td>Common in step-by-step instructions; avoid mixing with “share.”
   </td>
  </tr>
  <tr>
   <td><strong>scan</strong>
   </td>
   <td>Collecting data from an object or place in the VR environment.
   </td>
   <td>Appears in technical notes and <code>/scan/initiate</code> API endpoint.
   </td>
  </tr>
  <tr>
   <td><strong>lifeform detection</strong>
   </td>
   <td>A scan that looks for living things in a recorded event.
   </td>
   <td>Feature-specific term; appears in example API calls.
   </td>
  </tr>
  <tr>
   <td><strong>strategy module</strong>
   </td>
   <td>A VR workspace where you can test different outcomes or scenarios.
   </td>
   <td>Appears in tutorials and references.
   </td>
  </tr>
  <tr>
   <td><strong>simulation</strong>
   </td>
   <td>A replay mode where you can change settings to see what would happen differently.
   </td>
   <td>Appears in advanced tutorials and API docs.
   </td>
  </tr>
  <tr>
   <td><strong>alternate timeline</strong>
   </td>
   <td>A version of an event that plays out differently because of changed settings.
   </td>
   <td>Used in Strategy Module docs; avoid casual use.
   </td>
  </tr>
  <tr>
   <td><strong>API key</strong>
   </td>
   <td>A unique code that lets you use Chronologue Relay VR’s API.
   </td>
   <td>Important for developer onboarding and security.
   </td>
  </tr>
  <tr>
   <td><strong>metadata verification</strong>
   </td>
   <td>Checking event details to make sure they are correct before sharing or publishing.
   </td>
   <td>Appears in API responses and publishing steps.
   </td>
  </tr>
</table>


**Source**: Definitions for common VR terms are adapted from Oculus/Meta Quest Developer Documentation, SteamVR Developer Guide, IEEE VR/AR Glossary, and Unity VR Manual. All have been rewritten in plain language for Chronologue Relay VR.


## **Topic types and templates**

To help writers get started, we’ve adopted templates from The Good Docs Project. These provide helpful outlines for common documentation types to ensure consistency and let contributors focus on writing clear, useful content instead of worrying about formatting. 

**Templates for Chronologue Relay Documentation**


<table>
  <tr>
   <td><strong>Template Type</strong>
   </td>
   <td><strong>When to Use It</strong>
   </td>
  </tr>
  <tr>
   <td><strong>How-to Guide</strong>
   </td>
   <td>When explaining a task that users need to complete step by step, helpful for general audiences like educators or hobbyists.
   </td>
  </tr>
  <tr>
   <td><strong>Tutorial</strong>
   </td>
   <td>For walk-throughs designed to help users build or explore something hands-on. Great for introducing new users to Chronologue Relay VR.
   </td>
  </tr>
  <tr>
   <td><strong>Reference</strong>
   </td>
   <td>For factual content like API parameters, file formats, or commands. Most useful for developers and support engineers.
   </td>
  </tr>
  <tr>
   <td><strong>Concept</strong>
   </td>
   <td>To explain ideas or background topics, such as how time-stream simulation works or what the Chronologue API does.
   </td>
  </tr>
  <tr>
   <td><strong>Troubleshooting</strong>
   </td>
   <td>For helping users identify and solve known issues or common errors.
   </td>
  </tr>
</table>


We encourage contributors to use these templates when creating documentation. They’re designed to support both **general** and **technical** audiences.


### **General Writing Guidelines**

These guidelines apply across all Chronologue Relay documentation, for all audiences or content types. They’re grounded in widely accepted writing standards, including resources like *Write the Docs* and *A Sense of Style:* *The Thinking Person’s Guide to Writing in the 21st Century*, and shaped by the tone and values of the Chronologue Relay brand.


#### **Core Writing Principles**

These basics apply to all content:



* Use **plain language** and keep sentences short (under 25 words). 

* Write in **active voice**. 

* Avoid **jargon, idioms, and filler words**. 

* Use **inclusive, respectful language** (see the Inclusive Language and Accessibility sections). 

* Anticipate reader needs and **structure content for scanning** (headings, lists, short paragraphs). 



#### **Brand Voice**

Chronologue Relay’s brand voice is **awe-inspiring, educational, and exploratory**. Our writing should spark curiosity, make users feel empowered, and invite them to explore, not just instruct them. We aim to be clear, approachable, and just imaginative enough to reflect the wonder of the product without losing accuracy.


#### **Voice and Tone **Our **voice** is steady across all content: confident, curious, and encouraging. 
Our **tone** adapts to the context and the reader.

**Examples of Chronologye VR’s Brand Voice:**


<table>
  <tr>
   <td><strong>Voice Element</strong>
   </td>
   <td><strong>Use</strong>
   </td>
   <td><strong>Don’t Use</strong>
   </td>
   <td><strong>Reasoning</strong>
   </td>
  </tr>
  <tr>
   <td><strong>Awe-inspiring</strong>
   </td>
   <td><em>“Stand under the sky as it was 2,000 years ago, and watch history unfold above you.”</em>
   </td>
   <td><em>“Our VR tech delivers the ultimate 360° viewing experience.”</em>
   </td>
   <td>Focuses on the emotional impact, not the specs.
   </td>
  </tr>
  <tr>
   <td><strong>Educational</strong>
   </td>
   <td><em>“In this session, you’ll see how the moon’s orbit causes an eclipse.”</em>
   </td>
   <td><em>“This feature demonstrates eclipse mechanics.”</em>
   </td>
   <td>Connects learning to the experience in plain language.
   </td>
  </tr>
  <tr>
   <td><strong>Exploratory</strong>
   </td>
   <td><em>“Jump to any moment in the past and see the stars as they were on that night.”</em>
   </td>
   <td><em>“Access temporal datasets from our archive.”</em>
   </td>
   <td>Inspires curiosity and exploration without jargon.
   </td>
  </tr>
</table>



## **Tone by Document Type and Audience**

Our** tone** shifts to fit the document type and audience. For technical content, aim for precision and brevity, avoiding unnecessary complexity or pretentious language. For general content, focus on curiosity and imagination, while avoiding fluff or vagueness.

Use the matrix below to see how tone shifts between technical and general audiences across common document types.


### **Chronologue Relay Tone Matrix (with Examples)**


<table>
  <tr>
   <td><strong>Document Type</strong>
   </td>
   <td><strong>Technical Audience Example</strong>
   </td>
   <td><strong>General Audience Example</strong>
   </td>
  </tr>
  <tr>
   <td><strong>API Reference</strong>
   </td>
   <td>Use the <code>session_id</code> parameter to query current playback status.”
   </td>
   <td><em>(N/A – usually only for technical users)</em>
   </td>
  </tr>
  <tr>
   <td><strong>Tutorial</strong>
   </td>
   <td>“Call <code>/observe</code> with your token to initiate live session playback.”
   </td>
   <td>“Click ‘Start Watching’ to launch your live sky session.”
   </td>
  </tr>
  <tr>
   <td><strong>How-to Guide</strong>
   </td>
   <td>“To sync headset time manually, use the <code>PUT /sync</code> endpoint.”
   </td>
   <td>“To fix the timing, open the menu and select ‘Sync Time.’”
   </td>
  </tr>
  <tr>
   <td><strong>Conceptual Explanation</strong> 
   </td>
   <td>“The event stream is backed by a socket architecture using WebRTC.”
   </td>
   <td>“The Relay works like a digital telescope — connecting you to events from the sky’s past.”
   </td>
  </tr>
  <tr>
   <td><strong>Onboarding Guide</strong>
   </td>
   <td>“Register your device using its unique ID before accessing features.”
   </td>
   <td>“Let’s get started! Plug in your headset and follow the setup steps to begin your journey.”
   </td>
  </tr>
  <tr>
   <td><strong>Release Notes</strong>
   </td>
   <td>“v1.3.0 adds token refresh support and corrects desync on Chrome 117+.”
   </td>
   <td>“Now smoother on newer browsers – plus better session loading!”
   </td>
  </tr>
  <tr>
   <td><strong>Troubleshooting Guide</strong>
   </td>
   <td>“Check WebSocket status using dev tools (Network > WS tab).”
   </td>
   <td>“Still stuck? Restart the app and check your internet connection.”
   </td>
  </tr>
  <tr>
   <td><strong>FAQs / Common Issues</strong>
   </td>
   <td>“Why does the <code>/events</code> call return 401? → Check token validity.”
   </td>
   <td>“Why can’t I see anything? → You might be offline — reconnect to Wi-Fi and try again.”
   </td>
  </tr>
  <tr>
   <td><strong>Product Overview</strong>
   </td>
   <td>“Chronologue Relay integrates time-layered event data with WebXR systems.”
   </td>
   <td>“Chronologue Relay lets you explore celestial events — like eclipses and supernovas — in VR.”
   </td>
  </tr>
  <tr>
   <td><strong>Quickstart</strong>
   </td>
   <td>“Launch → Connect → Authenticate → Start session via <code>/observe</code>.”
   </td>
   <td>“Step 1: Open the app. Step 2: Plug in headset. Step 3: Click ‘Explore.’ Done!”
   </td>
  </tr>
  <tr>
   <td><strong>User Stories / Use Cases</strong>
   </td>
   <td>“STEM educators use the <code>/timeline</code> API to schedule live demos for students.”
   </td>
   <td>“A teacher in California recreated the 1919 eclipse — and showed students how Einstein was right!”
   </td>
  </tr>
</table>



---


## **Accessible writing**

We believe Chronologue Relay should be accessible to everyone, and that includes our documentation. We follow the accessibility guidelines in the[ Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/accessibility/accessibility-overview). These best practices cover inclusive language, readable formatting, and ways to make content work better with assistive technologies.



* **Use clear, simple language**: Avoid jargon, idioms, and overly long sentences that can confuse readers or screen readers. 

    *Example:* Instead of “Initialize the environment for session execution,” write “Set up your viewing session.”

* **Write descriptive link text**: Say “View simulation options,” not “Click here.”

    *Example:* “Explore past events” -  links to a timeline of recorded astronomical events.

* **Use heading levels consistently**: This helps users navigate the page and works better with screen readers.

    *Example:* Use H2 for “Setting Up Your Headset” and H3 for “Connecting to Chronologue Relay VR”

* **Avoid directional language**: Don’t use phrases like “see the section above” or “look to the right,” which can be confusing in different screen reader layouts.

    *Example:* Instead of “See the panel on the right for controls,” write “Open the ‘Controls’ panel in the main menu

* **Use alt text for visuals**: Every image should include meaningful alt text or be marked decorative when appropriate.

    *Example:* “Screenshot of the Event Timeline showing Halley’s Comet in 12 BCE.” 



For more details, refer to the[ Microsoft Accessibility Overview](https://learn.microsoft.com/en-us/style-guide/accessibility/accessibility-overview) or the[ Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/).


## **Inclusive and bias-free writing**

We aim to create welcoming content for the Chronologue Relay VR by being mindful of the words we choose to represent people. That means using language that is thoughtful, respectful, and free from assumptions. 

We follow the[ Microsoft Writing Style Guide’s inclusive language principles](https://learn.microsoft.com/en-us/style-guide/inclusive-language/inclusive-language-overview) to help us write in a way that reflects the diversity of our users. Here are a few things we keep in mind:



* **Use gender-neutral terms**: Say *"they," "people,"* or *"users"* instead of *"he or she."*

    *Example: “They* operated (*not manned)* the controls in the observation station.”

* **Be careful with cultural references**: Not everyone shares the same background, holidays, or traditions. Keep things broad and relatable to a global audience whenever possible.

    *Example:* “See the path of a comet that appeared on December 24, 2000 (*not Christmas Eve*).”

* **Let people define themselves**: Use current, respectful terms for identity and ability. When in doubt, look it up or ask.

    *Example (don’t):* “Our software is so easy, even a grandmother could use it.”


    *Example (do):* “Our software is designed for users of all experience levels.” \


* **Write with empathy**: Write like there’s a real person on the other end. Avoid finding fault in error message callouts; focus on the solution.

	*Example *(don’t): “You entered the wrong password.” \
	*Example* (do): “Your password didn’t match. Please try again.”


## **Text Formatting**

These formatting rules are based on the Good Docs Project templates for headings, structure, and basic inline styles. Good Docs Project templates provide the default hierarchy and accessibility guidelines; Chronologue Relay adds project-specific adaptations.

Chronologue-specific adaptations include:



* Use the same heading levels and text styles in every type of document \

* Use **Noto Emoji** icons for tips, warnings, and other notes \

* Keep links, tables, and callouts looking the same throughout the docs \

* Make code examples easy to copy \


These conventions make the docs easier to scan and help keep Chronologue Relay’s style consistent across all content.


## **Headings**



* **H1** → Page titles only \

* **H2** → Top-level sections \

* **H3** → Subsections \

* **H4+** → Use only when necessary \

* Don’t skip heading levels — this helps accessibility tools read the page correctly \



## **Inline Styles**



* **Bold** → Menu items, first-mention terms 

* *Italic* → Emphasis in explanations only 

* `Monospace` → Code, API parameters, file paths, CLI commands 

* Highlight sparingly for important terms or warnings 
 Example: `Use session_id to query playback status`


## **Links**

* Open external links in a new tab unless there’s a reason not to 

* Don’t paste full URLs inline – link a short phrase instead



## **Icons with Noto Emoji**

Chronologue Relay VR documentation uses **Noto Emoji** ([Apache 2.0 License](https://github.com/googlefonts/noto-emoji)) for callouts. Place the icon before the sentence or paragraph, followed by a colon.


<table>
  <tr>
   <td><strong>Icon</strong>
   </td>
   <td><strong>Meaning</strong>
   </td>
   <td><strong>Example from Chronologue Relay VR</strong>
   </td>
  </tr>
  <tr>
   <td>💡
   </td>
   <td>Tip - extra info or shortcut
   </td>
   <td>💡 You can save filters in the <em>Community Events</em> search so you don’t have to set them each time.
   </td>
  </tr>
  <tr>
   <td>⚠️
   </td>
   <td>Caution - avoid mistakes
   </td>
   <td>⚠️ Deleting an event from the Relay is permanent and cannot be undone.
   </td>
  </tr>
  <tr>
   <td>🛠️
   </td>
   <td>Technical Note - dev/config detail
   </td>
   <td>🛠️ The <code>/api/v1/events/{eventId}</code> endpoint returns metadata including timestamps, coordinates, and verification status.
   </td>
  </tr>
  <tr>
   <td>🧭
   </td>
   <td>Navigation - where to find things
   </td>
   <td>🧭 To invite another user, go to <strong>Relay Dashboard → Members Invite User</strong>.
   </td>
  </tr>
  <tr>
   <td>🗒️
   </td>
   <td>Example - sample usage/output
   </td>
   <td>🗒️ <code>POST /api/v1/scan/initiate</code> launches lifeform detection in the Alien Ecology Observation Module.
   </td>
  </tr>
  <tr>
   <td>📚
   </td>
   <td>Reference - related docs/resources
   </td>
   <td>📚 See <em>Simulating Alternate Timelines</em> in the Strategy Module guide for more details.
   </td>
  </tr>
</table>



## **Code and CLI Blocks**



* Use fenced code blocks (```) for multi-line code or CLI examples 

* Always specify the language for syntax highlighting (e.g., ```json, ```bash) 

* Make examples ready to copy and paste 

* Mark placeholders clearly (`&lt;user_id>`) 



## **Tables**



* Keep headers short and clear 

* Left-align text columns; right-align number columns 

* Split tables with more than 6 rows into smaller tables or lists 



## **Callouts**

Use a blockquote with the right icon for tips, cautions, and notes.


    💡 **Tip:** Adjust the field of view in Settings for a more immersive experience.


## **Using linters**

Linters are tools that help catch style and formatting issues as you write. To help keep our documentation clear, consistent, and on-brand, we recommend using the[ Vale](https://vale.sh) linter.

Vale is a tool that checks your writing against this style guide and the[ Microsoft Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/). It highlights issues with voice, tone, formatting, and terminology for each audience type. We organize terms into three lists:


<table>
  <tr>
   <td><strong>Terminology List</strong>
   </td>
   <td><strong>Use Case</strong>
   </td>
  </tr>
  <tr>
   <td><strong>BaseTerms</strong>
   </td>
   <td>Core terms and phrasing that apply to <em>all</em> content (e.g., product names, interface labels)
   </td>
  </tr>
  <tr>
   <td><strong>General Audience</strong>
   </td>
   <td>Terms to simplify or avoid in user-facing, non-technical docs
   </td>
  </tr>
  <tr>
   <td><strong>Technical Audience</strong>
   </td>
   <td>Preferred terms for developer and API documentation
   </td>
  </tr>
</table>


You can find these lists in our version-controlled `/tools/vale/terms/` directory

Here’s how Vale is set up in this project:

.Terminology Lists (for Vale)

├── BaseTerms.yml

│   └── Shared brand terms and interface phrasing used in all docs

├── GeneralAudience.yml

│   └── Recommends plain-language alternatives for general readers

└── TechnicalAudience.yml

    └── Preferred terms for technical content (e.g., developer guides, API docs)

While Vale isn’t required, we strongly encourage contributors to use it. To make things easy, we provide a **preconfigured version** that includes brand-specific rules tailored to Chronologue Relay’s voice and style.

You can run Vale from the command line or install it in your text editor (like[ VS Code](https://marketplace.visualstudio.com/items?itemName=errata-ai.vale-server)) to get real-time feedback.


## **How the style guide is updated**

The editorial team will review the Chronologue Style Guide in full every six months to ensure it stays current with product updates and the needs of our users. In between major reviews, we make minor adjustments as needed, especially when new features are released or when contributors flag unclear or outdated guidelines.

All updates are tracked in the style guide changelog, and we communicate changes directly to documentation contributors. If you spot something that needs clarification, or you have a suggestion for improving the guide, we’d love to hear from you!

**To suggest a change or provide feedback**, contact the editorial team at **styleguide@zaiusinc.com**


## **Revision history**

We record all major and minor updates in the Change Log. The most current changes and versions are listed at the top of the file ([changelog.md](http://changelog.md)). We use **Semantic Versioning **to track editions of the style guide:



* **0.x** for drafts before official release 

* **1.0** for the first published version 

* **1.1**, **1.2**, etc., for minor updates 

* **2.0**, **3.0**, etc., for major revisions


## **Decision log**

As the project evolves, so will the Chronologue Style Guide. The editorial team keeps a running [Decision Log ](https://docs.google.com/document/d/1YSQbkrMsRjII9cL1tcxP6Y0f3Egz6QPhmWcuBsvlJ44/edit)to document choices before implementing them. This helps us stay transparent and makes it easy to track why we made certain calls, like preferring one term over another, or deciding to make an exception to the Microsoft Style Guide.
