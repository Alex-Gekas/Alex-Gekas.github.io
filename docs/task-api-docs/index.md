# Case study: Documenting a lightweight REST API

## Introduction

The Task API is a lightweight REST API built on Node.js, Express, and SQLite for managing
personal task lists. I deployed the API on AWS, tested all endpoints with Postman, and produced
a full documentation suite designed to onboard developers to the API. The project is available on
[GitHub](https://github.com/Alex-Gekas/developer-task-api), where the repository includes the codebase alongside all seven
documents in the documentation suite.

## Audience and goals

The primary audience is developers building a to-do frontend or learning how REST APIs handle
authentication. A secondary audience is developers exploring JWT and bcrypt using Node.js.

The documentation aims to get developers to their first working request quickly. It explains
authentication in plain terms and serves as a useful reference for both beginners and experienced
developers.

## Documentation architecture

The suite is organized into seven documents. Each document covers a different phase of using the
API: setup, authentication, getting started, endpoint reference, architecture, and troubleshooting.
Documents are cross-linked so developers can navigate between them easily.

The structure divides the documents by goal. Each document has one job and builds on the concepts
of the one before it. This keeps the documentation incremental and easier to follow.

## Key documentation decisions

### Separating Setup from Getting Started

Setup covers server deployment — SSH, PM2, and environment variables. Getting Started covers the
API workflow. Keeping them separate allows developers to skip to the section they need.

### Authentication as a standalone document

Authentication gets its own document because it needs more than a quick explanation. A wristband
analogy explains how JWTs work. The guide also covers token expiry and security behavior.

### The System Architecture document

The System Architecture document is written for developers who want to understand or extend the
codebase. It explains the technical choices behind the API design and includes the folder
structure, data models, and two Mermaid diagrams.

### Troubleshooting grounded in real errors

Errors are organized by symptom, not error code. Every entry includes a cause and a fix.

## Conclusion

The documentation suite outlines a real developer workflow. Each document has a clear job, and the sequence moves naturally from one to the next. The [Diátaxis framework](https://diataxis.fr) was a useful reference throughout. It encourages clear thinking about what each document is trying to do and for whom.