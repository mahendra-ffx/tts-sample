# Testing Guide for Custom CKEditor Shortcuts

This guide outlines the manual steps to test the `Ctrl+[` (Show Shortcuts) and `Ctrl+S` (Custom Save) functionality added by the `customShortcuts` plugin.

## Prerequisites

1.  Ensure you have a web browser.
2.  Serve the project files using a simple local web server. (e.g., using Python: `python -m http.server` or `python3 -m http.server` from the repository root, then navigate to `http://localhost:8000/demo.html`). Direct opening of `demo.html` via `file:///` protocol might cause issues with `customConfig` loading or AJAX requests if any were involved (though not in this specific plugin's current state).

## Test Cases

### Test Case 1: `Ctrl+S` - Custom Save Shortcut

1.  **Open `demo.html` in your web browser.**
2.  **Allow the CKEditor instance to load completely.** You should see the editor interface with some sample text.
3.  **Focus the editor**: Click inside the editing area.
4.  **Press `Ctrl+S`** (or `Cmd+S` on macOS).
5.  **Expected Result**:
    *   An alert box should appear with the message: "Demo: Ctrl+S detected and forceSaveDocument() called!".
    *   The browser's default "Save Page As..." dialog should NOT appear.
    *   A CKEditor notification should appear at the top-right of the editor (or as configured by the theme) with the message "Document saved!" and a success styling.
    *   The browser's developer console should show the log: "Demo: forceSaveDocument() called!".

### Test Case 2: `Ctrl+[` - Show Keyboard Shortcuts

1.  **Open `demo.html` in your web browser.**
2.  **Allow the CKEditor instance to load completely.**
3.  **Focus the editor**: Click inside the editing area.
4.  **Press `Ctrl+[`**.
5.  **Expected Result**:
    *   A CKEditor dialog window should appear with the title "Keyboard Shortcuts".
    *   The dialog should contain a list of available keyboard shortcuts and their corresponding commands (e.g., "Ctrl+S: customSaveCmd", "Ctrl+[: showKeyboardShortcutsCmd", "Ctrl+B: bold", etc.).
    *   The list should be reasonably formatted (e.g., as an unordered list).
    *   The dialog should have an "OK" button to close it.
    *   Verify that common shortcuts like `Ctrl+B` (bold), `Ctrl+I` (italic) are listed, along with our custom ones.

### Test Case 3: Plugin Loading and No Console Errors

1.  **Open `demo.html` in your web browser.**
2.  **Open your browser's developer console.**
3.  **Allow the CKEditor instance to load completely.**
4.  **Expected Result**:
    *   The console should display the message: "customShortcuts plugin initialized for editor: editor1".
    *   There should be no JavaScript errors related to CKEditor or the `customShortcuts` plugin in the console.

## Notes

*   If `forceSaveDocument()` were a real function in a CMS, `Ctrl+S` would trigger the actual save mechanism. The alert and console log are for demo purposes.
*   The list of shortcuts in the `Ctrl+[` dialog will depend on all plugins loaded and their registered keystrokes. The formatting helper in the plugin attempts to make this human-readable.
```
