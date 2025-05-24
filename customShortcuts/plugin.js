CKEDITOR.plugins.add('customShortcuts', {
    init: function(editor) {
        console.log('customShortcuts plugin initialized for editor:', editor.name);

        // Define the command to open the dialog
        editor.addCommand('showKeyboardShortcutsCmd', {
            exec: function(editor) {
                var keystrokes = editor.keystrokeHandler.keystrokes;
                var configKeystrokes = editor.config.keystrokes || {};
                var allKeystrokes = Object.assign({}, keystrokes, configKeystrokes);

                var shortcutsListHtml = '<ul>';
                var commandName;
                var keystrokeValue;

                // Helper to format keystroke numbers into human-readable strings
                function formatKeystroke(keystroke) {
                    var string = '';
                    if (keystroke & CKEDITOR.CTRL) string += 'Ctrl+';
                    if (keystroke & CKEDITOR.ALT) string += 'Alt+';
                    if (keystroke & CKEDITOR.SHIFT) string += 'Shift+';
                    
                    var baseKey = keystroke & 0xFFF; // Mask out modifier keys
                    var charCode = 0;
                    
                    // Attempt to map common keycodes to characters or names
                    // This is a simplified mapping and might need expansion
                    if (baseKey >= 48 && baseKey <= 90) { // 0-9, A-Z
                        string += String.fromCharCode(baseKey);
                    } else if (baseKey >= 112 && baseKey <= 123) { // F1-F12
                        string += 'F' + (baseKey - 111);
                    } else {
                        // Special key codes (add more as needed)
                        switch(baseKey) {
                            case 8: string += 'Backspace'; break;
                            case 9: string += 'Tab'; break;
                            case 13: string += 'Enter'; break;
                            case 27: string += 'Esc'; break;
                            case 32: string += 'Space'; break;
                            case 33: string += 'PageUp'; break;
                            case 34: string += 'PageDown'; break;
                            case 35: string += 'End'; break;
                            case 36: string += 'Home'; break;
                            case 37: string += 'Left Arrow'; break;
                            case 38: string += 'Up Arrow'; break;
                            case 39: string += 'Right Arrow'; break;
                            case 40: string += 'Down Arrow'; break;
                            case 46: string += 'Delete'; break;
                            case 219: string += '['; break;
                            case 221: string += ']'; break;
                            // Add other common key codes if necessary
                            default: string += 'Keycode ' + baseKey; break;
                        }
                    }
                    return string;
                }

                for (keystrokeValue in allKeystrokes) {
                    if (allKeystrokes.hasOwnProperty(keystrokeValue)) {
                        commandName = allKeystrokes[keystrokeValue];
                        if (commandName) { // Ensure commandName is not false or undefined
                             shortcutsListHtml += '<li><strong>' + formatKeystroke(parseInt(keystrokeValue, 10)) + ':</strong> ' + commandName + '</li>';
                        }
                    }
                }
                shortcutsListHtml += '</ul>';

                // Store this HTML to be accessible by the dialog definition
                editor._customShortcutsHtml = shortcutsListHtml;
                
                editor.openDialog('showShortcutsDialog');
            },
            canUndo: false // Important for commands that don't modify content
        });

        // --- Custom Save Command ---
        editor.addCommand('customSaveCmd', {
            exec: function(editor) {
                // Assume a global function forceSaveDocument() exists in the CMS
                if (typeof forceSaveDocument === 'function') {
                    forceSaveDocument();
                    editor.showNotification('Document saved!', 'success');
                } else {
                    editor.showNotification('Save function (forceSaveDocument) not found.', 'warning');
                    console.warn('customShortcuts: forceSaveDocument() function is not defined.');
                }
            },
            canUndo: false, // This command does not affect the editor's undo stack
            modes: { wysiwyg: 1, source: 1 } // Make it available in both modes
        });
        
        // Define the dialog for showing shortcuts
        CKEDITOR.dialog.add('showShortcutsDialog', function(editor) {
            return {
                title: 'Keyboard Shortcuts',
                minWidth: 400,
                minHeight: 300,
                contents: [
                    {
                        id: 'tab-list',
                        label: 'Shortcuts List',
                        elements: [
                            {
                                type: 'html',
                                id: 'shortcutsHtmlContent', // Add an ID for easier access
                                html: '<div>Loading shortcuts...</div>' 
                            }
                        ]
                    }
                ],
                buttons: [CKEDITOR.dialog.okButton],
                onShow: function() {
                    // Access the stored HTML and set it to the dialog's HTML element
                    var dialog = this;
                    if (editor._customShortcutsHtml) {
                        dialog.getContentElement('tab-list', 'shortcutsHtmlContent').getElement().setHtml(editor._customShortcutsHtml);
                    } else {
                        dialog.getContentElement('tab-list', 'shortcutsHtmlContent').getElement().setHtml('<div>Could not load shortcuts.</div>');
                    }
                }
            };
        });

        // Assign Ctrl+[ to the command
        // 219 is the keycode for '['
        editor.setKeystroke(CKEDITOR.CTRL + 219, 'showKeyboardShortcutsCmd');
        
        // Assign Ctrl+S to the custom save command
        // 83 is the keycode for 'S'
        editor.setKeystroke(CKEDITOR.CTRL + 83, 'customSaveCmd'); 
    }
});
