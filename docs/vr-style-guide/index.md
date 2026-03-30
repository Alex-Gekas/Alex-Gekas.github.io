# Writing for two audiences: A style guide case study for Chronologue Relay VR

## Introduction

*Note: Zaius Inc. and Chronologue Relay VR are fictional products created for this case study,
written as a contribution to the [Good Docs Project](https://www.thegooddocsproject.dev/).*

Zaius Inc. is a commercial company building enthusiast VR products on top of the Chronologue API.
Their main product is the Chronologue Relay VR, which connects the Chronologue API to home VR
headsets, letting users view and navigate reconstructions of astronomical events. Zaius' customers
include hobbyists, STEM programs, museums, and educational institutions.

The product serves two different audiences — general consumers and developers. The style guide
outlines how to adapt voice, terminology, and tone to serve both. This case study examines the
decisions behind it.

## The documentation challenge

The guide had to solve three problems: serving two different audiences, writing accurately about
complex astronomical events, and maintaining consistent language across a third-party API with its
own terminology.

## Guide architecture

The guide uses the Google Developer Documentation Style Guide as the default reference. It
includes Zaius-specific rules layered on top to address Zaius-specific needs.

## Key documentation decisions

### Advice for writing about time and space

The Zaius-specific rules address the unique challenges encountered when writing about space and
time.

### Handling the dual-audience problem

The guide provides separate voice and tone guidance for general and technical readers. There are
also two terminology lists, one for each audience.

### Enforcing consistency through tooling

A Vale linter enforces each terminology list by the audience type for each document.

### Governance

A Decision Log records editorial choices and exceptions for future contributors. The style guide
also outlines a process for flagging inconsistencies and suggesting updates.

## Conclusion

The Zaius style guide's two-tiered approach — Google as a foundation, Zaius adaptations on top,
Vale for enforcement — creates a system that scales as the product and contributor base grow.