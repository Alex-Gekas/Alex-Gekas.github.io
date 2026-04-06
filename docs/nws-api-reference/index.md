---
title: "About This Documentation"
description: "Portfolio project overview and methodology"
---

## Introduction

The National Weather Service (NWS) API is a public REST API that provides forecast data, observation records, and geographic metadata for locations across the United States.

The official documentation covers more than 30 endpoints and is primarily written for NWS forecasters and weather scientists. This project rewrites and restructures the documentation for developers. It focuses on the core endpoints and concepts needed for application development.

The result is a streamlined guide that helps developers get started quickly with NWS weather data.

## Audience and goals

The primary audience is developers who want to add weather data to an application. Common use cases include:

- Showing a local forecast
- Tracking conditions at a weather station
- Converting coordinates into a forecast location

A secondary audience is developers who are new to the NWS API and need to understand how it works before building.

The documentation provides a clear starting point and a logical sequence of steps. It explains the NWS location model early, so developers understand it before using it. It also includes enough reference detail to support both initial setup and troubleshooting.

## Documentation architecture

The documentation is organized into four content types:

- Tutorials
- How-to guides
- Reference
- Concepts

Each document has a single purpose and supports a specific stage of the developer workflow.

Concepts appear before procedures. Each document also has a clear entry point, so developers can find what they need without reading everything in order.

## Key documentation decisions

### Separate content by type, not by endpoint

The original documentation mixed explanations, step-by-step instructions, and reference details on the same pages.

Separating content by type makes it easier to find information. Developers can quickly choose whether they need to learn a concept, complete a task, or look up a detail.

### Document the NWS spatial model as a standalone concept

The NWS API uses multiple overlapping location systems, including forecast offices, gridpoints, zones, and observation stations.

This model is not intuitive. Developers who do not understand it often encounter errors early.

A standalone concept document explains how these systems relate to each other. It uses diagrams and a step-by-step structure to build understanding before developers make requests.

### Clarify the `/points/{lat, lon}` workflow

Most NWS workflows begin with the `/points` endpoint. However, it does not return forecast data directly. Instead, it returns URLs for related resources.

A dedicated how-to guide walks through this workflow. It shows how coordinates resolve into a forecast grid, zones, and nearby stations.

### Centralize cross-cutting reference topics

Some topics apply across multiple endpoints, including:

- Status codes
- Units
- Caching
- Station metadata

These topics are grouped in a shared reference section instead of repeated on individual pages. This approach gives developers a single place to find common behaviors.

## Conclusion

The restructured documentation provides a clear path through a complex API. Each document has a defined purpose, and the content aligns with what developers need at each stage.

The Diátaxis framework guides the structure. It is not used as a strict formula, but as a way to keep each document focused on a single goal.  

[→ Read the NWS API reference](introduction.md)
