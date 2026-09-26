// Fallback trigger for Mermaid diagrams.
//
// Material for MkDocs ships CSS theme variables for Mermaid (see its
// bundle.*.js — search for "--md-mermaid-") and disables the mermaid
// library's own default auto-init (startOnLoad), expecting to trigger
// rendering itself via its `document$` observable. With the mermaid
// version this site loads from unpkg (mermaid@10, i.e. whatever the
// latest 10.x release is at build time), that automatic trigger doesn't
// fire reliably, leaving every ".mermaid" block empty with no console
// error. Calling mermaid.run() here is safe to "double up" on Material's
// own attempt if it does fire — mermaid skips elements already marked
// data-processed="true", so this never re-renders a diagram twice.
setTimeout(function () {
  if (window.mermaid && typeof mermaid.run === 'function') {
    // mermaid.run() rejects if it finds a stray already-processed/empty
    // node; harmless here since real diagrams still render, but left
    // uncaught it surfaces as a console error on every page.
    mermaid.run().catch(function () {});
  }
}, 50);
